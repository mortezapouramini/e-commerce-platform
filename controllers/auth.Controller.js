const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const xss = require("xss");
const envConfig = require("../config/env.config");
const {
  responseHandler,
} = require("../middlewares/responseHandler.middleware");
const tokenUtils = require("../utils/token.utils");
const generateOTP = require("../utils/generateOtp.utils");
const otpService = require("../services/otp.service");
const { createError, createResponse } = require("../utils/response.utils");

const register = async (req, res, next) => {
  const { email } = req.body;

  try {
    const isExist = await prisma.user.findFirst({
      where: { email },
    });
    if (isExist) return next(createError(409, "Email already exists"));

    const otp = generateOTP();
    try {
      await otpService.sendOTPEmail(email, otp);
    } catch (err) {
      return next(createError(502, "Service Unavailable"));
    }

    responseHandler(
      createResponse(200, "The OTP code has been sent to you"),
      res
    );
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  const otp = parseInt(req.body.otp);
  const { name, email, password } = req.body;

  try {
    const verified = otpService.verifyOTP(email, otp);
    if (!verified) {
      return next(createError(401, "Invalid OTP"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const safeData = {
      id: user.id,
      name: xss(user.name),
      email: email,
      address: user.address,
      postalCode: user.postalCode,
      phone: user.phone,
      createdAt: user.createdAt,
    };

    responseHandler(createResponse(201, safeData), res);
  } catch (err) {
    if (err.code === "P2002") {
      return next(
        createError(
          409,
          "An account has already been registered with this email."
        )
      );
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) return next(createError(401, "User not found"));

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return next(createError(401, "Password does not match"));
    }

    const accessToken = tokenUtils.generateAccessToken(user);
    let refreshToken;
    let hashedRefreshToken;
    let isUnique = false;

    while (!isUnique) {
      const token = tokenUtils.generateRefreshToken(user);
      hashedRefreshToken = await bcrypt.hash(token, 10);
      refreshToken = token;
      const existing = await prisma.token.findUnique({
        where: { hashedToken: hashedRefreshToken },
      });

      if (!existing) {
        isUnique = true;
      }
    }

    await prisma.token.create({
      data: {
        userId: user.id,
        hashedToken: hashedRefreshToken,
        expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: envConfig.nodeEnv === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: envConfig.nodeEnv === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });
    const safeData = {
      id: user.id,
      name: user.name,
      email: email,
      address: user.address,
      postalCode: user.postalCode,
      phone: user.phone,
      createdAt: user.createdAt,
    };

    responseHandler(createResponse(200, safeData), res);
  } catch (error) {
    next(error);
  }
};

const getAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) return next(createError(401, "Please login"));

  try {
    let decodedUser;
    try {
      decodedUser = jwt.verify(refreshToken, envConfig.refreshTokenSecret);
    } catch (err) {
      const hashedRefreshTokens = await prisma.token.findMany({
        where: { userId: decoded.id, isValid: true },
      });

      const userRefreshToken = hashedRefreshTokens.find((rt) => {
        const isMatchToken = bcrypt.compare(refreshToken, rt.hashedToken);
        if (isMatchToken) return rt;
      });

      await prisma.token.update({
        where: { id: userRefreshToken.id },
        data: { isValid: false },
      });

      return next(err);
    }

    const newAccessToken = tokenUtils.generateAccessToken(decodedUser);
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: envConfig.nodeEnv === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });
    responseHandler(createResponse(201, "New token sent"), res);
  } catch (err) {
    next(err);
  }
};

const verifyEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) return next(createError(404, "User not found"));

    const otp = generateOTP();
    try {
      await otpService.sendOTPEmail(email, otp);
    } catch (err) {
      return next(createError(502, "Service Unavailable"));
    }
    responseHandler(
      createResponse(200, "The OTP code has been sent to you"),
      res
    );
  } catch (err) {
    next(err);
  }
};

const forgetPassword = async (req, res, next) => {
  const { email, otp, password } = req.body;

  try {
    const verified = await otpService.verifyOTP(email, otp);
    if (!verified) return next(createError(401, "Invali otp"));

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    responseHandler(createResponse(200, "password changed successful"), res);
  } catch (err) {
    next(err);
  }
};

const getCsrf = (req, res, next) => {
  res.json({ csrfToken: req.csrfToken() });
};

module.exports = {
  register,
  login,
  verifyUser,
  getAccessToken,
  getCsrf,
  forgetPassword,
  verifyEmail,
};

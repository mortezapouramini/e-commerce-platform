const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const {responseHandler} = require("../middlewares/responseHandler.middleware");
const { createError, createResponse } = require("../utils/response.utils");
const  xss  = require("xss");

const updateUser = async (req, res, next) => {
  const userId = parseInt(req.params.userId);
  let { name, password, address, postalCode, phone } = req.body;

  name = xss(name)
  address = xss(address)
  postalCode = xss(postalCode)
  phone = xss(phone)

  if (userId !== req.user.id) {
    return next(createError(401, "Access denied"));
  }

  try {
    const updatingData = {};
    if (name) updatingData.name = name;
    if (password) updatingData.password = await bcrypt.hash(password, 10);
    if (address) updatingData.address = address;
    if (postalCode) updatingData.postalCode = postalCode;
    if (phone) updatingData.phone = phone;

    if (Object.keys(updatingData).length === 0) {
      return next(createError(400, "No valid fields to update"));
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatingData,
    });
    responseHandler(createResponse(200, updatedUser), res);
  } catch (error) {
    if (error.code === "P2025") {
      return next(createError(404, "User not found"));
    }
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  const userId = parseInt(req.params.userId);

  if(isNaN(userId) || !userId || userId < 1){
    return next(createError(400 , "Please send a valid userId"))
  }

  if (userId !== req.user.id) {
    return next(createError(401, "Access denied"));
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        postalCode: true,
        phone: true,
        createdAt: true,
      },
    });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    responseHandler(createResponse(200, user), res);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  if (isNaN(page) || page < 1) {
    page = 1;
  }

  try {
    const users = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    const totalUsers = await prisma.user.count();
    const details = {
      users,
      page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    };
    responseHandler(createResponse(200, details), res);
  } catch (error) {
    next(error);
  }
};

const searchUser = async (req, res, next) => {
  const { phone, email } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: email
        ? { email: { equals: email, mode: "insensitive" } }
        : { phone: { equals: phone } },
    });

    if (!user) return next(createError(404, "User not found"));
    responseHandler(createResponse(200, user), res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUser,
  getUserProfile,
  searchUser,
  getUsers,
};

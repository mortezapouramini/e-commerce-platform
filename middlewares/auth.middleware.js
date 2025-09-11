const jwt = require("jsonwebtoken");
const {createError} = require("../utils/response.utils");
const envConfig = require("../config/env.config");

const authAccessToken = (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) return next(createError(401, "Access denied"));

  try {
    const decoded = jwt.verify(accessToken, envConfig.accessTokenSecret);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(createError(401, "Access token expired"));
    }
    if (err.name === "JsonWebTokenError") {
      return next(createError(401, "Invalid access token"));
    }
    next(err);
  }
};


const authRole = (role) => {
  return (req, res, next) => {
    const accessToken = req.cookies?.accessToken;

    try {
      const decoded = jwt.verify(accessToken, envConfig.accessTokenSecret);
      if (decoded.role !== role) {
        return next(createError(401, "Access denied"));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { authAccessToken, authRole };

const jwt = require("jsonwebtoken");
const envConfig = require("../config/env.config");

const generateAccessToken = user => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    envConfig.accessTokenSecret,
    { expiresIn: "15m" }
  );
  return token;
};

const generateRefreshToken = user => {
  
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    envConfig.refreshTokenSecret,
    { expiresIn: "1d" }
  );
  return token;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken
};

module.exports = {
  port: process.env.PORT,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  nodeEnv: process.env.NODE_ENV,
  adminEmail: process.env.ADMIN_EMAIL,
  adminEmailPass: process.env.ADMIN_EMAIL_PASS,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
};

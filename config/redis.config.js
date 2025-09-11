const Redis = require("ioredis");
const envConfig = require("./env.config");


const redis = new Redis({
  host: envConfig.redisHost || "redis",
  port: envConfig.redisPort || 6379,
});

module.exports = { redis };

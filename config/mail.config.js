const nodemailer = require("nodemailer");
const envConfig = require("./env.config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: envConfig.adminEmail,
    pass: envConfig.adminEmailPass
  }
});

module.exports = transporter;

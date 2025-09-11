const envConfig = require("../config/env.config");
const transporter = require("../config/mail.config");
const { redis } = require("../config/redis.config");

const OTP_EXPIRATION = 5 * 60;

const sendOTPEmail = async (email, otp) => {
  try {
    await redis.set(`otp:${email}`, otp, "EX", OTP_EXPIRATION);

    await transporter.sendMail({
      from: `"Virtual shop" <${envConfig.adminEmail}>`,
      to: email,
      subject: "Sign in to Virtual shop",
      html: `<b>Your OTP code is: ${otp}</b>`,
    });
  } catch (err) {
    throw err;
  }
};

const verifyOTP = async (email, otp) => {
  try {
    const storedOtp = await redis.get(`otp:${email}`);

    if (storedOtp && storedOtp === otp) {
      await redis.del(`otp:${email}`);
      return true;
    }

    return false;
  } catch (err) {
    throw err;
  }
};

module.exports = { sendOTPEmail, verifyOTP };

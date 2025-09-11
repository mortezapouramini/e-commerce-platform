const express = require("express");
const authController = require("../controllers/auth.Controller");
const userValidation = require("../validations/user.validation");
const csrfProtection = require("../middlewares/csrf.middleware");
const validation = require("../middlewares/validation.middleware");
const router = express.Router();

router.post(
  "/register",
  csrfProtection,
  validation.validate(userValidation.registerSchema),
  authController.register
);
router.post(
  "/verify-otp",
  csrfProtection,
  validation.validate(userValidation.verifySchema),
  authController.verifyUser
);
router.post(
  "/login",
  csrfProtection,
  validation.validate(userValidation.loginSchema),
  authController.login
);
router.get("/refresh-token", csrfProtection, authController.getAccessToken);
router.post(
  "/verify-email",
  csrfProtection,
  validation.validate(userValidation.registerSchema),
  authController.verifyEmail
);
router.post(
  "/forget-password",
  csrfProtection,
  validation.validate(userValidation.forgetPasswordSchema),
  authController.forgetPassword
);
router.get("/csrf-token", csrfProtection, authController.getCsrf);

module.exports = router;

const Joi = require("joi");

const baseSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .error(new Error("Name length must be at least 3 characters long")),
  email: Joi.string().email().error(new Error("Email must be a valid email")),
  password: Joi.string()
    .min(8)
    .max(16)
    .error(new Error("Password length must be at least 8 characters long")),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .error(new Error("Confirm password does not match with password")),
  address: Joi.string().error(new Error("Please enter a valid address")),
  postalCode: Joi.string()
    .min(10)
    .error(new Error("Please enter a valid postal code")),
  phone: Joi.string()
    .min(8)
    .max(15)
    .error(new Error("Please enter a valid phone number")),
  otp: Joi.string().min(5).error(new Error("Please enter your otp code")),
});

const registerSchema = baseSchema.fork(["email"], (field) => field.required());
const verifySchema = baseSchema.fork(
  ["name", "email", "password", "confirmPassword", "otp"],
  (field) => field.required()
);

const loginSchema = baseSchema.fork(["email", "password"], (field) =>
  field.required()
);

const updateSchema = baseSchema
  .fork(["name", "password", "address", "postalCode", "phone"], (field) =>
    field.optional()
  )
  .or("name", "password", "address", "postalCode", "phone");

const searchUserSchema = baseSchema
  .fork(["email", "phone"], (field) => field.optional())
  .or("email", "phone");

const forgetPasswordSchema = baseSchema.fork(
  ["email", "password", "confirmPassword", "otp"],
  (field) => field.required()
);

module.exports = {
  registerSchema,
  loginSchema,
  updateSchema,
  searchUserSchema,
  verifySchema,
  forgetPasswordSchema,
};

const { createError } = require("../utils/response.utils");
const fs = require("fs");
const path = require("path");

const validate = (schema) => {
  return async (req, res, next) => {
    const { error } = await schema.validate(req.body);
    if (error) next(createError(400, error.message));
    next();
  };
};

const productValidate = (schema) => {
  return async (req, res, next) => {
    if (req.method.toLowerCase() !== "patch") {
      if (!req.files || req.files.length === 0) {
        return next(createError(400, "Please upload an image"));
      }
    }

    const { error, value } = await schema.validate(req.body, { convert: true });
    if (error) {
      if (req.files) {
        req.files.forEach((file) => {
          fs.unlinkSync(path.join(file.path));
        });
        return next(createError(400, error.message));
      }
      return next(createError(401, error.message));
    }
    req.body = value;
    next();
  };
};

module.exports = { validate, productValidate };

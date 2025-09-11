const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  price: Joi.number().max(10000).positive(),
  brand: Joi.string().min(2).max(50),
  category: Joi.string().valid("laptop", "mobile", "tablet", "headphone"),
  releaseDate: Joi.number().integer().min(2000).max(new Date().getFullYear()),
  count: Joi.number().integer(),
  ram: Joi.when("category", {
    is: Joi.valid("laptop", "mobile", "tablet"),
    then: Joi.number().integer().positive(),
    otherwise: Joi.forbidden(),
  }),
  processor: Joi.when("category", {
    is: Joi.valid("laptop", "mobile", "tablet"),
    then: Joi.string(),
    otherwise: Joi.forbidden(),
  }),
  storage: Joi.when("category", {
    is: Joi.valid("laptop", "mobile", "tablet"),
    then: Joi.number().integer().positive(),
    otherwise: Joi.forbidden(),
  }),
  screenSize: Joi.when("category", {
    is: Joi.valid("laptop", "tablet", "mobile"),
    then: Joi.number().positive(),
    otherwise: Joi.forbidden(),
  }),
  gpu: Joi.when("category", {
    is: "laptop",
    then: Joi.string(),
    otherwise: Joi.forbidden(),
  }),

  camera: Joi.when("category", {
    is: "mobile",
    then: Joi.number().integer().positive(),
    otherwise: Joi.forbidden(),
  }),
  batteryCapacity: Joi.when("category", {
    is: "mobile",
    then: Joi.number().integer().positive(),
    otherwise: Joi.forbidden(),
  }),

  connectionType: Joi.when("category", {
    is: "headphone",
    then: Joi.string().valid("wired", "wireless"),
    otherwise: Joi.forbidden(),
  }),
  batteryLife: Joi.when("category", {
    is: Joi.valid("headphone", "tablet"),
    then: Joi.number().positive(),
    otherwise: Joi.forbidden(),
  }),
  noiseCancelling: Joi.when("category", {
    is: "headphone",
    then: Joi.boolean(),
    otherwise: Joi.forbidden(),
  }),
});

const addProductSchema = productSchema.fork(
  Object.keys(productSchema.describe().keys),
  (field) => field.required()
);

const updateProductSchema = productSchema.fork(
  Object.keys(productSchema.describe().keys),
  (field) => field.optional()
);

const delProductImgSchema = Joi.object({
  imgUrl: Joi.string().required(),
});

module.exports = { addProductSchema, updateProductSchema, delProductImgSchema };

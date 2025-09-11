const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.Controller");
const upload = require("../config/multer.config");
const productValidation = require("../validations/product.validation");
const validation = require("../middlewares/validation.middleware");
const auth = require('../middlewares/auth.middleware')

router.post(
  "/",
  auth.authRole("admin"),
  upload.array("images", 4),
  validation.productValidate(productValidation.addProductSchema),
  productController.addProduct
);

router.get("/", productController.getProducts);

router.get("/:productId", productController.getProductInfo);

router.patch(
  "/:productId",
  auth.authRole("admin"),
  validation.validate(productValidation.delProductImgSchema),
  productController.delProductImg
);

router.patch(
  "/:category/:productId",
  auth.authRole("admin"),
  validation.validate(productValidation.updateProductSchema),
  productController.updateProduct
);

module.exports = router;

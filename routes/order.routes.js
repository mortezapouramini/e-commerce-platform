const express = require("express");
const router = express.Router();
const orderController = require('../controllers/order.Controller')
const csrfProtection = require("../middlewares/csrf.middleware");
const auth = require('../middlewares/auth.middleware')

router.post("/:productId", csrfProtection,  auth.authAccessToken, orderController.addToCart);
router.delete("/:itemId", csrfProtection, auth.authAccessToken, orderController.delFromCart);
router.get("/", auth.authAccessToken, orderController.getUserCart);
router.get("/admin", auth.authRole("admin"), orderController.getAllOrders);

module.exports = router;

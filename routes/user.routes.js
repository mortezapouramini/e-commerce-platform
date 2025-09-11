const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.Controller')
const csrfProtection = require("../middlewares/csrf.middleware");
const auth = require('../middlewares/auth.middleware')
const validation = require('../middlewares/validation.middleware')
const userValidation = require('../validations/user.validation')

router.get("/:userId", auth.authAccessToken, userController.getUserProfile);
router.patch("/:userId", auth.authAccessToken, csrfProtection , validation.validate(userValidation.updateSchema), userController.updateUser);
router.get("/", auth.authRole("admin"), userController.getUsers);
router.post("/search",  auth.authRole("admin"), validation.validate(userValidation.searchUserSchema), userController.searchUser);

router.get("/check", (req, res) => {
  console.log(req.cookies);
  
});



module.exports = router;

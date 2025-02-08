const express = require("express");
const { authMiddleWare } = require("../../../middlewares");
const { UserController } = require("../../../controllers");

const router = express.Router();

router.post("/signup", UserController.signupController);
router.post("/login", UserController.loginController);
router.post("/role", authMiddleWare, UserController.changeRoleController);
router.get("/details", authMiddleWare, UserController.getDetailsController);

module.exports = router;

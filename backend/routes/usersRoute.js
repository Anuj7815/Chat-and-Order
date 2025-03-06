const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// const { signup, login } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/users", authMiddleware, userController);

module.exports = router;

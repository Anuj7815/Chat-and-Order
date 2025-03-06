const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
// const { signup, login } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/products", authMiddleware, productController);

module.exports = router;

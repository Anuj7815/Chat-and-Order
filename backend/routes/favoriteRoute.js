const express = require("express");
const router = express.Router();
const {
    getFavoriteController,
    toggleFavoriteController,
} = require("../controllers/favoriteController");
// const { signup, login } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

// fetch favorites from user
router.get("/:email", authMiddleware, getFavoriteController);
router.post("/", authMiddleware, toggleFavoriteController);

module.exports = router;

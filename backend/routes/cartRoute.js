const express = require("express");
const router = express.Router();
const {
    getCartItemsController,
    postCartItemsController,
    // updateItemsController,
} = require("../controllers/cartController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/:email", authMiddleware, getCartItemsController);
router.post("/", authMiddleware, postCartItemsController);
// router.post("/:quantity", updateItemsController);

module.exports = router;

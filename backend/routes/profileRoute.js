const express = require("express");
const router = express();
const {
    getUserInfoController,
    postUserInfoController,
} = require("../controllers/profileController");

const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, getUserInfoController);
router.patch("/profile", authMiddleware, postUserInfoController);

module.exports = router;

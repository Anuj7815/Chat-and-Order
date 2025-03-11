const express = require("express");
const router = express.Router();

router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
    });

    res.json({ message: "Logged out successfully" });
});

module.exports = router;

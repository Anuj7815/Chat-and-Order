const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/check-auth", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ authenticated: false });
    }

    console.log(token);

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.json({ authenticated: true });
    } catch (error) {
        res.json({ authenticated: false });
    }
});

module.exports = router;

const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token; //Read JWT from cookies
    // console.log(token);
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access Denied, Unauthorized Access" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded Values: ", decoded);
        req.user = decoded; //attach the user data to the req
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = { authMiddleware };

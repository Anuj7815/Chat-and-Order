const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authUtil = async (user, password, type) => {
    try {
        if (type === "signup") {
            // Hash the password before storing
            const hashPassword = await bcrypt.hash(password, 10);
            return { success: true, hashPassword };
        } else {
            // Compare entered password with stored hash
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return {
                    success: false,
                    message: "Invalid Email address or password.",
                };
            }
            return { success: true };
        }
    } catch (error) {
        return { success: false, message: "Authentication error." };
    }
};

module.exports = authUtil;

const User = require("../models/UserModel");

const userController = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

module.exports = userController;

const User = require("../models/UserModel");
const handleSuccess = (res, data, statusCode = 200) => {
    return res.status(statusCode).json(data);
};

const handleError = (
    res,
    error,
    message = "Server Error",
    statusCode = 500
) => {
    // console.error("Error:", error || message);
    return res.status(statusCode).json({ message });
};

const handleController = (callback) => async (req, res) => {
    try {
        await callback(req, res); //it executes the actual controller logic
    } catch (error) {
        handleError(res, error);
    }
};

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

// module.exports = { findUserByEmail };

module.exports = {
    handleSuccess,
    handleError,
    handleController,
    findUserByEmail,
};

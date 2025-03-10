const User = require("../models/UserModel");
const {
    handleSuccess,
    handleError,
    handleController,
} = require("../util/responseHandlerUtil");

const userController = handleController(async (req, res) => {
    const users = await User.find();

    if (!users.length) {
        return handleError(res, null, "No users found", 404);
    }

    return handleSuccess(res, users);
});

module.exports = userController;

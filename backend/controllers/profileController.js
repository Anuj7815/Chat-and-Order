const User = require("../models/UserModel");
const cloudinary = require("../config/cloudinary");
const {
    handleSuccess,
    handleError,
    handleController,
    findUserByEmail,
} = require("../util/responseHandlerUtil");

const getUserInfoController = handleController(async (req, res) => {
    const { email } = req.query;
    const user = await User.findOne({ email });

    if (!user) {
        return handleError(
            res,
            "User not found",
            "User does not exist in the database",
            404
        );
    }

    handleSuccess(res, user);
});

const postUserInfoController = handleController(async (req, res) => {
    const { name, email, contactNumber, address, age } = req.body;
    let profilePictureUrl = null;

    if (req.files?.profilePicture) {
        const file = req.files.profilePicture;
        const uploadResult = await cloudinary.uploader.upload(
            file.tempFilePath,
            {
                folder: "profile_pictures",
            }
        );
        profilePictureUrl = uploadResult.secure_url;
    }

    const updatedUser = await User.findOneAndUpdate(
        { email },
        {
            name,
            contactNumber,
            address,
            age,
            ...(profilePictureUrl && { profilePicture: profilePictureUrl }),
        },
        { new: true, runValidators: true }
    );

    if (!updatedUser) {
        return handleError(
            res,
            "User not found",
            "User not found in the database",
            404
        );
    }

    handleSuccess(res, updatedUser);
});

module.exports = { getUserInfoController, postUserInfoController };

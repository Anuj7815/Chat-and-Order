const User = require("../models/UserModel");
const cloudinary = require("../config/cloudinary");

const getUserInfoController = async (req, res) => {
    try {
        const { email } = req.query;
        // console.log(req.body);
        const user = await User.findOne({ email });
        // console.log(user);

        if (!user) {
            return res
                .status(404)
                .json({ message: "User does not exists in the database" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(`Error occured while fetching the data:`);
        return res.status(404).json({ message: "Server Error" });
    }
};

const postUserInfoController = async (req, res) => {
    try {
        const { name, email, contactNumber, address, age } = req.body;
        console.log(req.body);

        let profilePictureUrl = null;

        if (req.files && req.files.profilePicture) {
            const file = req.files.profilePicture;
            // console.log(file);
            const uploadResult = await cloudinary.uploader.upload(
                file.tempFilePath,
                {
                    folder: "profile_pictures",
                }
            );
            // console.log(uploadResult);
            profilePictureUrl = uploadResult.secure_url;
            // console.log(profilePictureUrl);
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: email },
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
            return res
                .status(404)
                .json({ message: "User not found in the database" });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error while updating the user information");
        return res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getUserInfoController, postUserInfoController };

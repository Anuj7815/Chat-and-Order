const authUtil = require("../util/authUtil");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const {
    handleSuccess,
    handleError,
    handleController,
} = require("../util/responseHandlerUtil");

const generateTokenAndSetCookies = (res, userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "10h",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 10 * 60 * 60 * 1000,
    });

    return token;
};

const signup = handleController(async (req, res) => {
    const { name, email, password, contactNumber } = req.body;

    let user = await User.findOne({ email });
    if (user) {
        // 409- conflict user email already exists
        return handleError(res, null, "User Email already exists", 409);
    }

    const result = await authUtil(null, password, "signup");
    if (!result.success) {
        //  400- bad request
        return handleError(res, null, result.message, 400);
    }

    user = new User({
        name,
        email,
        password: result.hashPassword,
        contactNumber,
    });

    await user.save();
    const token = generateTokenAndSetCookies(res, user._id);

    return handleSuccess(
        // 201 - user created successfully
        res,
        {
            status: true,
            message: "User Registered Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                contactNumber: user.contactNumber,
            },
        },
        201
    );
});

const login = handleController(async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password);

    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
        // 401- unauthorized User
        return handleError(
            res,
            "Unauthorized User",
            "Invalid Email address or password",
            401
        );
    }

    const result = await authUtil(user, password, "login");
    if (!result.success) {
        // 400- bad request
        return handleError(res, "Bad Request", result.message, 400);
    }

    const token = generateTokenAndSetCookies(res, user._id);

    return handleSuccess(res, {
        success: true,
        message: "Login Success",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            contactNumber: user.contactNumber,
        },
    });
});

module.exports = { signup, login };

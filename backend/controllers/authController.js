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
    console.log(email, password);

    const user = await User.findOne({ email });
    console.log(user);
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

// 100-199 -> informational responses

// 200-299 -> Successfullt responses
// 200-> the request succeeded
// 201-> the request succeeded and the new resource was created as a result.

// 300-399 -> redirectional messages
// 300-> multiple choices
// 301-> the url of the requested resource has been changed permanently. The new url is given to the response.

// 400-499 -> client error responses
// 400-> bad request (the server cannot or will not process the request due to something that is perceived to be the client error)
//  401-> unauthorized /unauthenticated
// 403-> forbidden (the client does not have access rights to the content that is, it is unauthorized, so the server is refusing to give the requested resource.)
// Note: unlike 401 unauthrized , in 403 the client's identity is known to the server
// 404- not found-> the server cannot find the requested resource
// 408-> request timeout
// 409-> conflict -> this response is sent when a request conflicts with the current state of the server.

// 500-509 -> server error responses
// 500-> internal server error-> the server has encountered a situation and it does not know how to handle it
// 501-> not implemented -> the request method is not supported by the server and cannot be handled.
// 502-> bad gateway-> while working as a gateway to get a response needed to handle the request, got an invalid response.

const authUtil = require("../util/authUtil");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const generateTokenAndSetCookies = (res, userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "10h",
    });

    // console.log(token);
    // store token in http-only cookies
    res.cookie("token", token, {
        httpOnly: false,
        secure: false,
        maxAge: 10 * 60 * 60 * 1000,
    });

    return token;
};

const signup = async (req, res) => {
    try {
        const { name, email, password, contactNumber } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ message: "User Email already exists" });
        }

        const result = await authUtil(null, password, "signup");
        // console.log(result);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }
        user = new User({
            name,
            email,
            password: result.hashPassword,
            contactNumber,
        });

        await user.save();
        // console.log(user);

        console.log(user._id);
        const token = generateTokenAndSetCookies(res, user._id);
        // console.log(token);

        res.status(200).json({
            status: true,
            message: "User Registered Successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                contactNumber: user.contactNumber,
            },
        });
        console.log("Signup Success✔️✔️✔️✔️✔️✔️✔️");
    } catch (error) {
        return res.status(400).json({
            message:
                "User is Unable to Signup due to wrong data or server error",
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid Email address or password" });
        }

        const result = await authUtil(user, password, "login");

        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        const token = generateTokenAndSetCookies(res, user._id);

        res.json({
            success: true,
            message: "Login Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                contactNumber: user.contactNumber,
            },
        });
        console.log("Login Success✔️✔️✔️✔️✔️✔️✔️");
    } catch (error) {
        return res
            .status(401)
            .json({ message: "User is unauthorized to login" });
    }
};

module.exports = { signup, login };

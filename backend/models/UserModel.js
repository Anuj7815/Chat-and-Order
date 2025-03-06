const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowerCase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        contactNumber: {
            type: String,
            required: true,
            // match: [/^\d{10}$/, "Please enter a valid 10-digit contact number"],
        },
        address: {
            type: String,
            // required: true,
        },
        age: {
            type: Number,
            // required: true,
        },
        profilePicture: {
            type: String,
        },
        favorites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        cartItems: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: {
                    type: Number,
                    Default: 1,
                },
                _id: false,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

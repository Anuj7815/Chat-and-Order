const User = require("../models/UserModel");

const getCartItemsController = async (req, res) => {
    try {
        const userEmail = req.params.email;
        // console.log(userEmail);

        const items = await User.findOne({ email: userEmail }).populate(
            "cartItems"
        );

        // console.log(items);

        if (!items) {
            res.status(404).json({ message: "Cart Items does not found" });
        }
        return res.json({
            cartItems: items
                ? items.cartItems.map((productId) => productId)
                : [],
        });
    } catch (error) {
        res.json(500).json({ message: "Unknown Error Occured" });
    }
};

const postCartItemsController = async (req, res) => {
    try {
        const { email, productId, quantity = 1 } = req.body;
        // console.log(productId);
        // console.log(email);
        // console.log(quantity);

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User Does not exists" });
        }

        // console.log(user);

        const inCartIndex = user.cartItems.findIndex(
            (item) => item.productId.toString() === productId
        );

        // console.log(inCartIndex);

        if (inCartIndex > -1) {
            if (quantity <= 0) {
                user.cartItems.splice(inCartIndex, 1);
            } else if (quantity > user.cartItems[inCartIndex].quantity) {
                user.cartItems[inCartIndex].quantity =
                    (user.cartItems[inCartIndex].quantity || 0) + 1;
            } else {
                user.cartItems[inCartIndex].quantity =
                    user.cartItems[inCartIndex].quantity - 1;
            }
        } else {
            user.cartItems.push({ productId, quantity });
        }

        await user.save();
        // console.log(user);
        res.json({ cartItems: user.cartItems });
    } catch (error) {
        console.log(`Unable to insert into the cart items`);
    }
};

module.exports = { getCartItemsController, postCartItemsController };

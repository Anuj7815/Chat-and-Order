const User = require("../models/UserModel");
const {
    handleSuccess,
    handleError,
    handleController,
} = require("../util/responseHandlerUtil");

const getCartItemsController = handleController(async (req, res) => {
    const userEmail = req.params.email;

    const user = await User.findOne({ email: userEmail }).populate("cartItems");

    if (!user) {
        return handleError(res, null, "Cart Items not found", 404);
    }

    return handleSuccess(res, {
        cartItems: user.cartItems || [],
    });
});

const postCartItemsController = handleController(async (req, res) => {
    const { email, productId, quantity = 1 } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return handleError(res, null, "User does not exist", 404);
    }

    const inCartIndex = user.cartItems.findIndex(
        (item) => item.productId.toString() === productId
    );

    if (inCartIndex > -1) {
        if (quantity <= 0) {
            user.cartItems.splice(inCartIndex, 1);
        } else if (quantity > user.cartItems[inCartIndex].quantity) {
            user.cartItems[inCartIndex].quantity += 1;
        } else {
            user.cartItems[inCartIndex].quantity -= 1;
        }
    } else {
        user.cartItems.push({ productId, quantity });
    }

    await user.save();
    return handleSuccess(res, { cartItems: user.cartItems });
});

module.exports = { getCartItemsController, postCartItemsController };

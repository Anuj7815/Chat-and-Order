const User = require("../models/UserModel");
const {
    handleSuccess,
    handleError,
    handleController,
} = require("../util/responseHandlerUtil");

// Get favorite items for a user
const getFavoriteController = handleController(async (req, res) => {
    const userEmail = req.params.email;

    const favorite = await User.findOne({ email: userEmail }).populate(
        "favorites"
    );

    if (!favorite) {
        return handleError(res, "User not found", "User does not exist.", 404);
    }

    handleSuccess(res, {
        favorites: favorite.favorites
            ? favorite.favorites.map((prod) => prod._id)
            : [],
    });
});

// Toggle favorite (add/remove) for a user
const toggleFavoriteController = handleController(async (req, res) => {
    const { email, productId } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return handleError(res, "User not found", "User does not exist.", 404);
    }

    const isFavorite = user.favorites.includes(productId);

    if (isFavorite) {
        user.favorites = user.favorites.filter(
            (id) => id.toString() !== productId
        );
    } else {
        user.favorites.push(productId);
    }

    await user.save();
    handleSuccess(res, { favorites: user.favorites });
});

module.exports = { getFavoriteController, toggleFavoriteController };

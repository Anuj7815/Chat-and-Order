const User = require("../models/UserModel");

// returns cart items to the frontend

const getFavoriteController = async (req, res) => {
    try {
        const userEmail = req.params.email;
        // console.log(userEmail);
        const favorite = await User.findOne({ email: userEmail }).populate(
            "favorites"
        );
        // console.log(favorite);
        if (!favorite) {
            return res.status(404).json({ message: "User does not Found." });
        }
        // console.log(favorite.favorites);
        res.json({
            favorites: favorite
                ? favorite.favorites.map((prod) => prod._id)
                : [],
        });
    } catch (error) {
        res.status(500).json({ message: "Unknown error Occured" });
    }
};

// saves the items into the cart items/favorites

const toggleFavoriteController = async (req, res) => {
    try {
        const { email, productId } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isFavorite = user.favorites.includes(productId);
        // console.log(isFavorite);
        if (isFavorite) {
            user.favorites = user.favorites.filter(
                (id) => id.toString() !== productId
            );
        } else {
            user.favorites.push(productId);
        }
        await user.save();
        res.json({ favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

module.exports = { getFavoriteController, toggleFavoriteController };

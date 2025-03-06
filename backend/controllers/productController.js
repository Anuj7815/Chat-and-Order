const Product = require("../models/ProductModel");

const productController = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

module.exports = productController;

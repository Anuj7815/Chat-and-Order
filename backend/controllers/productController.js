const Product = require("../models/ProductModel");
const {
    handleSuccess,
    handleError,
    handleController,
} = require("../util/responseHandlerUtil");

const productController = handleController(async (req, res) => {
    const products = await Product.find();
    return handleSuccess(res, products);
});

module.exports = productController;

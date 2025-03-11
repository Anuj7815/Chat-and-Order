import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, fetchProducts } from "../api/apiUtil";
import { toggleFavorite, addToCart, fetchFavorites } from "../api/apiUtil";
import { fetchProductsSuccess } from "../features/productSlice";
import { setCartItems, setFavorites } from "../features/cartSlice";
import { toast } from "react-toastify";

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);
    const { favorites = [], cartItems = [] } = useSelector(
        (state) => state.cart
    );

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const loggedInuserEmail = loggedInUser?.email;

    useEffect(() => {
        const productPage = async () => {
            const productData = await fetchProducts();
            dispatch(fetchProductsSuccess(productData));

            const favoriteDataProduct = await fetchFavorites({
                email: loggedInuserEmail,
            });
            // console.log(favoriteDataProduct.favorites);
            dispatch(setFavorites(favoriteDataProduct.favorites));
        };
        productPage();
    }, [dispatch, loggedInuserEmail]);

    const handleFavoriteClick = async (prod) => {
        const favoritesData = await toggleFavorite({
            email: loggedInuserEmail,
            productId: prod._id,
        });
        // console.log(favoritesData);
        // console.log("Favorites at products", favoritesData);
        toast.success("Item added to favorites", {
            position: "top-center",
            autoClose: 1000,
        });
        dispatch(setFavorites(favoritesData.favorites));
    };

    const handleBuyNowClick = async (prod) => {
        const cartArray = Object.values(cartItems);
        // console.log(cartArray);

        const uniqueCartItems = cartArray.flat().map((cartItem) => {
            const productDetails = products.find(
                (product) => product._id === cartItem.productId
            );
            return {
                ...cartItem,
                ...productDetails,
            };
        });
        // console.log(uniqueCartItems);

        // Find the product inside uniqueCartItems
        const selectedCartItem = uniqueCartItems.find(
            (item) => item.productId === prod._id
        );
        const quantity = selectedCartItem ? selectedCartItem.quantity + 1 : 1;

        const response = await addToCart(loggedInuserEmail, prod._id, quantity);
        // console.log(response);
        if (response) {
            const updateCartItems = await fetchCartItems({
                email: loggedInuserEmail,
            });
            toast.success("Item added to the Cart", {
                position: "top-center",
                autoClose: 1000,
            });
            dispatch(setCartItems(updateCartItems));
        }
    };

    // console.log(products);

    return (
        <div className="flex justify-center items-center min-h-screen p-10 bg-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mx-auto">
                {products.map((prod, index) => (
                    <div
                        key={index}
                        // ref={index === products.length - 1 ? observerRef : null}
                        className="card card-compact bg-white w-80 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 relative"
                    >
                        <button
                            className="absolute top-4 right-4 text-xl cursor-pointer"
                            onClick={() => handleFavoriteClick(prod)}
                        >
                            {Array.isArray(favorites) &&
                            favorites.includes(prod._id)
                                ? "❤️"
                                : "🤍"}
                        </button>
                        <figure className="overflow-hidden rounded-t-2xl">
                            <img
                                src={prod.image}
                                alt={prod.title}
                                className="object-cover w-full h-48"
                                loading="lazy"
                            />
                        </figure>
                        <div className="card-body p-5 flex flex-col space-y-1">
                            <h2 className="card-title text-xl font-semibold text-gray-800">
                                {prod.title}
                            </h2>
                            <p className="text-gray-600">{prod.description}</p>
                            <div className="card-actions mt-2 flex justify-end">
                                <button
                                    className="btn bg-gray-900 px-4 py-3 rounded-full text-white cursor-pointer hover:bg-gray-700"
                                    onClick={() => handleBuyNowClick(prod)}
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {loading && (
                <p className="text-gray-600 text-center mt-5">Loading...</p>
            )}
        </div>
    );
};
export default Products;

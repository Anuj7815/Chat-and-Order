import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchProducts,
    toggleFavorite,
    addToCart,
    fetchFavorites,
    fetchCartItems,
} from "../api/apiUtil";
import { setCartItems } from "../features/cartSlice";
import { setFavorites } from "../features/cartSlice";
import { toast } from "react-toastify";
import { fetchProductsSuccess } from "../features/productSlice";

const Carts = () => {
    const dispatch = useDispatch();
    const { favorites = [], cartItems = [] } = useSelector(
        (state) => state.cart
    );
    const { products } = useSelector((state) => state.products);
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const loggedInUserEmail = loggedInUser?.email;

    useEffect(() => {
        const fun = async () => {
            const productData = await fetchProducts();
            const cartData = await fetchCartItems({ email: loggedInUserEmail });
            const favoriteData = await fetchFavorites({
                email: loggedInUserEmail,
            });

            if (productData && cartData && favoriteData) {
                dispatch(fetchProductsSuccess(productData));
                dispatch(setCartItems(cartData));
                dispatch(setFavorites(favoriteData.favorites));
            }
        };
        fun();
    }, [dispatch, loggedInUserEmail]);

    const handleFavoriteClick = async (prod) => {
        const favoritesData = await toggleFavorite({
            email: loggedInUserEmail,
            productId: prod._id,
        });
        // console.log(favoritesData.favorites);
        dispatch(setFavorites(favoritesData.favorites));
        toast.success("Items added to favorites", {
            position: "top-center",
            autoClose: 1000,
        });
    };

    const handleQuantityChange = async (item, type) => {
        let message = "";
        if (type === "increase") {
            item.quantity = item.quantity + 1;
            message = "Item Quantity Increased";
        } else {
            item.quantity = item.quantity - 1;
            if (item.quantity === 0) message = "Item removed from the cart";
            else message = "Item Quantity Decreased";
        }
        const response = await addToCart(
            loggedInUserEmail,
            item._id,
            item.quantity
        );
        // console.log(response);
        toast.success(message, {
            position: "top-center",
            autoClose: 1000,
        });
        dispatch(setCartItems(response));
    };

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

    return (
        <div className="flex flex-col md:justify-center p-10 bg-white mt-5 rounded-lg shadow-2xl max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Cart Items
            </h2>
            {uniqueCartItems.length === 0 ? (
                <p className="text-gray-500 text-center">No Items</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto">
                    {uniqueCartItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white w-80 rounded-2xl shadow-lg relative p-4"
                        >
                            <button
                                className="absolute top-4 right-4 text-xl cursor-pointer"
                                onClick={() => handleFavoriteClick(item)}
                            >
                                {favorites.includes(item._id) ? "❤️" : "🤍"}
                            </button>
                            <figure className="overflow-hidden rounded-t-2xl">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="object-cover w-full h-48"
                                />
                            </figure>
                            <div className="p-5 flex flex-col space-y-2">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {item.title}
                                </h2>
                                <p className="text-gray-600">
                                    {item.description}
                                </p>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-lg font-bold text-gray-900">
                                        ${item.price}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="bg-gray-300 px-3 py-1 rounded-full text-lg"
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item,
                                                    "decrease"
                                                )
                                            }
                                        >
                                            -
                                        </button>
                                        <span className="text-lg font-bold text-gray-800">
                                            {uniqueCartItems.find(
                                                (cartItem) =>
                                                    cartItem._id === item._id
                                            )?.quantity || 1}
                                        </span>
                                        <button
                                            className="bg-gray-300 px-3 py-1 rounded-full text-lg"
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item,
                                                    "increase"
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Carts;

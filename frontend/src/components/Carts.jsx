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

const Carts = () => {
    const dispatch = useDispatch();
    const { favorites = [], cartItems = [] } = useSelector(
        (state) => state.cart
    );
    const { products } = useSelector((state) => state.products);
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const loggedInUserEmail = loggedInUser?.email;

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCartItems({ email: loggedInUserEmail }));
    }, [loggedInUserEmail]);

    const handleFavoriteClick = (prod) => {
        // dispatch();
        dispatch(
            toggleFavorite({ email: loggedInUserEmail, productId: prod._id })
        );
    };

    const handleQuantityChange = (item, type) => {
        console.log("funciton check:::: ", item, type);
        if (type === "increase") {
            dispatch(
                addToCart({
                    email: loggedInUserEmail,
                    productId: item.productId,
                    quantity: item.quantity + 1,
                })
            );
        } else if (type === "decrease") {
            if (item.quantity > 1) {
                dispatch(
                    addToCart({
                        email: loggedInUserEmail,
                        productId: item.productId,
                        quantity: item.quantity - 1,
                    })
                );
            } else {
                console.log("Items should be removed: ", item.productId);
                dispatch(
                    addToCart({
                        email: loggedInUserEmail,
                        productId: item.productId,
                        quantity: item.quantity - 1,
                    })
                );
            }
        }
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

    // console.log("Merged Cart Items:", uniqueCartItems);

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

import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../features/productSlice";
import { fetchProducts } from "../api/apiUtil";
import {
    // toggleFavorite,
    fetchFavorites,
    addToCart,
} from "../features/cartSlice";
import { toggleFavorite } from "../api/apiUtil";

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);
    const { favorites = [], cartItems = [] } = useSelector(
        (state) => state.cart
    );
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const loggedInUserEmail = loggedInUser?.email || "";
    // const [counter, setCounter] = useState(0);
    console.log(cartItems);

    useEffect(() => {
        if (loggedInUserEmail) {
            dispatch(fetchProducts());
            dispatch(fetchFavorites({ email: loggedInUserEmail }));
        }
    }, [dispatch, loggedInUserEmail]);

    const handleFavoriteClick = (prod) => {
        dispatch(
            toggleFavorite({ email: loggedInUserEmail, productId: prod._id })
        );
    };

    const handleBuyNowClick = (prod) => {
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

        console.log(uniqueCartItems);

        // Find the product inside uniqueCartItems
        const selectedCartItem = uniqueCartItems.find(
            (item) => item.productId === prod._id
        );

        const quantity = selectedCartItem ? selectedCartItem.quantity + 1 : 1; // Increment if exists, else start from 1

        dispatch(
            addToCart({
                email: loggedInUserEmail,
                productId: prod._id,
                quantity,
            })
        );
    };

    console.log(products);

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

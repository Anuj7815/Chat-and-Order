import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, toggleFavorite, fetchFavorites } from "../api/apiUtil";
import { setFavorites } from "../features/cartSlice";

const Favorites = () => {
    const dispatch = useDispatch();
    const { favorites = [] } = useSelector((state) => state.cart);
    const { products } = useSelector((state) => state.products);
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const loggedInUserEmail = loggedInUser?.email;

    // working fine until last modified
    useEffect(() => {
        if (loggedInUserEmail) {
            dispatch(fetchProducts());
            dispatch(fetchFavorites({ email: loggedInUserEmail }));
        }
    }, [dispatch, loggedInUserEmail]);

    // useEffect(() => {
    //     const getFavorites = async () => {
    //         try {
    //             const response = await fetchFavorites({
    //                 email: loggedInUserEmail,
    //             });
    //             console.log(response);
    //             dispatch(setFavorites(response));
    //         } catch (error) {
    //             console.log("Unable to fetch favorites");
    //         }
    //     };
    //     getFavorites();
    // }, [dispatch, loggedInUserEmail]);

    const handleFavoriteClick = async (prod) => {
        dispatch(
            toggleFavorite({ email: loggedInUserEmail, productId: prod._id })
        );

        // const updatedFavorites = await toggleFavorite({
        //     email: loggedInUserEmail,
        //     productId: prod._id,
        // });
        // dispatch(setFavorites(updatedFavorites));
    };

    const cartItems = products.filter((prod) => favorites.includes(prod._id));

    return (
        <div className=" flex flex-col md:justify-center p-10 bg-white mt-5 rounded-lg shadow-2xl max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 md:justify-center">
                Your Favorite Items
            </h2>
            {cartItems.length === 0 ? (
                <p className="text-gray-500">No Favorites</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mx-auto md:justify-center">
                    {cartItems.map((item, index) => (
                        <div
                            key={index}
                            className="card bg-white w-80 rounded-2xl shadow-lg relative"
                        >
                            <button
                                className="absolute top-4 right-4 text-xl cursor-pointer"
                                onClick={() => handleFavoriteClick(item)}
                            >
                                {Array.isArray(favorites) &&
                                favorites.includes(item._id)
                                    ? "❤️"
                                    : "🤍"}
                            </button>
                            <figure className="overflow-hidden rounded-t-2xl">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="object-cover w-full h-48"
                                />
                            </figure>
                            <div className="card-body p-5 flex flex-col space-y-1">
                                <h2 className="card-title text-xl font-semibold text-gray-800">
                                    {item.title}
                                </h2>
                                <p className="text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;

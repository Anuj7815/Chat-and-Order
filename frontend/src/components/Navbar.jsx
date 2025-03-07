import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import viteLogo from "/vite.svg";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, fetchCartItems } from "../api/apiUtil";
import { CgProfile } from "react-icons/cg";
import { GrFavorite } from "react-icons/gr";
import { loginSuccess } from "../features/authSlice";

const Navbar = ({ handleLogout }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.cart.favorites || []);
    const [favoriteCount, setFavoriteCount] = useState(favorites.length);
    const cart = useSelector((state) => state.cart.cartItems);
    const cartCount = Object.values(cart).flat();
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const loggedInUserEmail = loggedInUser?.email || "";

    useEffect(() => {
        if (loggedInUserEmail) {
            dispatch(loginSuccess());
            dispatch(fetchFavorites({ email: loggedInUserEmail }));
            dispatch(fetchCartItems({ email: loggedInUserEmail }));
        }
    }, [dispatch, loggedInUserEmail]);

    useEffect(() => {
        setFavoriteCount(favorites.length);
    }, [favorites, cart]);

    return (
        <nav className="bg-gray-900 shadow-md py-3 px-6 flex justify-between items-center">
            {/* Left Side - Logo */}
            <div className="flex items-center space-x-2">
                <img src={viteLogo} alt="Vite Logo" className="w-8 h-8" />
                <span className="text-xl font-bold text-white">Vite App</span>
            </div>

            {/* Center - Navigation Links */}
            <div className="hidden md:flex space-x-6">
                <Link
                    to="/"
                    className="text-white hover:text-blue-600 transition"
                >
                    Home
                </Link>
                <Link
                    to="/users"
                    className="text-white hover:text-blue-600 transition"
                >
                    Users
                </Link>
                <Link
                    to="/products"
                    className="text-white hover:text-blue-600 transition"
                >
                    Products
                </Link>
                <Link
                    to="/services"
                    className="text-white hover:text-blue-600 transition"
                >
                    Services
                </Link>
            </div>

            {/* Right Side - Login/Logout Button */}
            <div className="flex items-center space-x-4">
                <a
                    onClick={() => navigate("/cart")}
                    className="relative flex items-center text-sm font-semibold text-gray-900 dark:text-white cursor-pointer"
                >
                    <span className="absolute -top-3 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full">
                        {cartCount.length > 0 ? cartCount.length : 0}
                    </span>
                    <FaShoppingCart className="text-lg" size={20} />
                </a>

                <a
                    onClick={() => navigate("/favorites")}
                    className="relative flex items-center text-sm font-semibold text-gray-900 dark:text-white cursor-pointer"
                >
                    <span className="absolute -top-3 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full">
                        {favoriteCount > 0 ? favoriteCount : 0}
                    </span>
                    {/* <BookmarksIcon
                        className="text-white"
                        onClick={() => navigate("/favorites")}
                    /> */}
                    <GrFavorite
                        className="text-white"
                        onClick={() => navigate("/favorites")}
                        size={20}
                    />
                </a>

                <button
                    onClick={handleLogout}
                    className="bg-blue-500 text-white px-5 py-3 rounded-full hover:bg-blue-600 transition cursor-pointer"
                >
                    Logout
                </button>

                <div className="w-8 h-8 rounded-full flex justify-center items-center">
                    <a
                        onClick={() => navigate("/profile")}
                        className=" text-gray-900 dark:text-white cursor-pointer text-2xl"
                    >
                        <CgProfile />
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

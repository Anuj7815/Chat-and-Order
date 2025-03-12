import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import viteLogo from "/vite.svg";
import Shopy from "/Shopy.png";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, fetchCartItems } from "../api/apiUtil";
import { CgProfile } from "react-icons/cg";
import { GrFavorite } from "react-icons/gr";
import { logoutSuccess } from "../features/authSlice";
import { setCartItems, setFavorites } from "../features/cartSlice";
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);

    const favorites = useSelector((state) => state.cart.favorites || []);
    const favoriteCount = favorites.length;
    const cart = useSelector((state) => state.cart.cartItems);
    const cartCount = Object.values(cart).flat().length;

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const loggedInUserEmail = loggedInUser?.email || "";

    const handleLogout = () => {
        dispatch(logoutSuccess());
        toast.success("Logout Success!", {
            position: "top-center",
            autoClose: 3000,
        });
        navigate("/login");
    };

    useEffect(() => {
        const navbarPage = async () => {
            const cartDataNavbar = await fetchCartItems({
                email: loggedInUserEmail,
            });

            dispatch(setCartItems(cartDataNavbar));
            const favoriteDataNavbar = await fetchFavorites({
                email: loggedInUserEmail,
            });
            dispatch(setFavorites(favoriteDataNavbar.favorites));
        };
        navbarPage();
    }, [dispatch, loggedInUserEmail]);

    return (
        <nav className="bg-gray-900 shadow-md py-3 px-6">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img src={Shopy} alt="Vite Logo" className="w-8 h-8" />
                    <span className="text-xl font-bold text-white">
                        ShopyChat
                    </span>
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white text-2xl focus:outline-none"
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Navigation Links (Desktop) */}
                <div className="hidden md:flex space-x-6">
                    <Link
                        to="/"
                        className="text-white hover:text-blue-400 transition"
                    >
                        Home
                    </Link>
                    <Link
                        to="/users"
                        className="text-white hover:text-blue-400 transition"
                    >
                        Users
                    </Link>
                    <Link
                        to="/products"
                        className="text-white hover:text-blue-400 transition"
                    >
                        Products
                    </Link>
                    <Link
                        to="/services"
                        className="text-white hover:text-blue-400 transition"
                    >
                        Services
                    </Link>
                </div>

                {/* Right Side - Cart, Favorites, Profile, Logout */}
                <div className="hidden md:flex items-center space-x-6">
                    {/* Cart */}
                    <button
                        onClick={() => navigate("/cart")}
                        className="relative text-white"
                    >
                        <FaShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Favorites */}
                    <button
                        onClick={() => navigate("/favorites")}
                        className="relative text-white"
                    >
                        <GrFavorite size={20} />
                        {favoriteCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full">
                                {favoriteCount}
                            </span>
                        )}
                    </button>

                    {/* Profile */}
                    <button
                        onClick={() => navigate("/profile")}
                        className="text-white text-2xl"
                    >
                        <CgProfile />
                    </button>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden flex flex-col items-center mt-4 space-y-4">
                    {/* Centered Links */}
                    <div className="flex flex-col items-center space-y-3">
                        <Link
                            to="/"
                            className="text-white hover:text-blue-400 transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/users"
                            className="text-white hover:text-blue-400 transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            Users
                        </Link>
                        <Link
                            to="/products"
                            className="text-white hover:text-blue-400 transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            Products
                        </Link>
                        <Link
                            to="/services"
                            className="text-white hover:text-blue-400 transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            Services
                        </Link>
                    </div>

                    {/* Icons in a Single Row with Equal Space */}
                    <div className="flex justify-center space-x-6">
                        <button
                            onClick={() => {
                                navigate("/cart");
                                setMenuOpen(false);
                            }}
                            className="relative text-white"
                        >
                            <FaShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => {
                                navigate("/favorites");
                                setMenuOpen(false);
                            }}
                            className="relative text-white"
                        >
                            <GrFavorite size={20} />
                            {favoriteCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full">
                                    {favoriteCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => {
                                navigate("/profile");
                                setMenuOpen(false);
                            }}
                            className="text-white text-2xl"
                        >
                            <CgProfile />
                        </button>

                        <button
                            onClick={handleLogout}
                            className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

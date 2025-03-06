import React from "react";
import {
    FaShoppingCart,
    FaComments,
    FaUserShield,
    FaListAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <div className="bg-gray-800 text-white text-center py-20 px-4">
                <motion.h1
                    className="text-5xl font-bold mb-4"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Shop, Chat & Connect – All in One Place!
                </motion.h1>
                <p className="text-lg mb-6">
                    Browse products, chat with users, and manage your cart with
                    ease.
                </p>
                <motion.button
                    className="bg-white text-gray-800 cursor-pointer px-6 py-3 rounded-lg hover:bg-blue-500 hover:text-white font-semibold shadow-md transition duration-300 ease-in"
                    whileHover={{ scale: 1.05 }}
                >
                    Explore Now
                </motion.button>
            </div>

            {/* Features Section */}
            <div className="container mx-auto py-16 px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.2 }}
                    >
                        <feature.icon className="text-blue-600 text-5xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </motion.div>
                ))}
            </div>

            {/* How It Works */}
            <div className="text-center py-16 bg-gray-200 px-6">
                <h2 className="text-4xl font-bold mb-6">How It Works</h2>
                <div className="max-w-3xl mx-auto grid gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-md flex items-center"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <span className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mr-4">
                                {index + 1}
                            </span>
                            <p className="text-gray-700 text-lg">{step}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center py-6 mt-10">
                <p>&copy; 2025 YourApp. All rights reserved.</p>
            </footer>
        </div>
    );
};

const features = [
    {
        title: "Product Listing",
        description: "Explore a variety of products in different categories.",
        icon: FaListAlt,
    },
    {
        title: "Chat with Users",
        description: "Connect with other users and discuss products.",
        icon: FaComments,
    },
    {
        title: "Add to Cart",
        description: "Easily add or remove products from your cart.",
        icon: FaShoppingCart,
    },
    {
        title: "Secure Profile",
        description: "Update your profile and manage your details securely.",
        icon: FaUserShield,
    },
];

const steps = [
    "Sign up or log in to get started.",
    "Browse and add products to your cart.",
    "Chat with users and explore deals.",
    "Checkout and enjoy your shopping experience!",
];

export default Home;

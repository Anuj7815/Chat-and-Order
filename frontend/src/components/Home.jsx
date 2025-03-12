import React from "react";
import {
    FaShoppingCart,
    FaComments,
    FaUserShield,
    FaListAlt,
    FaStar,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Data for trending products
const trendingProducts = [
    {
        name: "Red Lipstick",
        price: "$19.99",
        image:
            "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png",
    },
    {
        name: "Essence Mascara",
        price: "$14.99",
        image:
            "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
    },
    {
        name: "Powder Canister",
        price: "$9.99",
        image:
            "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png",
    },
    {
        name: "Red Lipstick",
        price: "$19.99",
        image:
            "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png",
    },
    {
        name: "Red Nail Polish",
        price: "$12.99",
        image:
            "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/1.png",
    },
];

const Home = () => {
    // Slider settings for trending products
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section */}
            {/* <div className="relative text-white text-center py-20 px-4 overflow-hidden">
              
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 opacity-80"></div>

                <motion.div
                    className="absolute top-10 left-10 w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center shadow-lg"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <span className="text-2xl">🛒</span>
                </motion.div>
                <motion.div
                    className="absolute bottom-10 right-16 w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center shadow-lg"
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <span className="text-2xl">💬</span>
                </motion.div>

         
                <motion.h1
                    className="text-5xl font-bold mb-4 relative z-10"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Shop, Chat & Connect – All in One Place!
                </motion.h1>
                <p className="text-lg mb-6 relative z-10">
                    Browse products, chat with users, and manage your cart with
                    ease.
                </p>
                <motion.button
                    className="bg-white text-gray-800 cursor-pointer px-6 py-3 rounded-lg hover:bg-blue-500 hover:text-white font-semibold shadow-md transition duration-300 ease-in relative z-10"
                    whileHover={{ scale: 1.05 }}
                >
                    Explore Now
                </motion.button>
            </div> */}
            <div className="relative text-white text-center py-20 px-4 overflow-hidden bg-gray-900">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-80"></div>

                {/* Floating Interactive Elements */}
                <motion.div
                    className="absolute top-12 left-10 w-16 h-16 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center shadow-lg"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <span className="text-2xl text-blue-400">🛒</span>
                </motion.div>
                <motion.div
                    className="absolute bottom-12 right-16 w-16 h-16 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center shadow-lg"
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <span className="text-2xl text-green-400">💬</span>
                </motion.div>

                {/* Glassmorphic Content Box */}
                <div className="relative bg-white/10 backdrop-blur-md p-10 rounded-xl shadow-lg max-w-2xl mx-auto">
                    <motion.h1
                        className="text-5xl font-bold mb-4"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Shop, Chat & Connect – All in One Place!
                    </motion.h1>
                    <p className="text-lg mb-6 text-gray-300">
                        Browse products, chat with users, and manage your cart
                        with ease.
                    </p>
                    <motion.button
                        className="bg-blue-500 text-white cursor-pointer px-6 py-3 rounded-lg hover:bg-blue-600 font-semibold shadow-md transition duration-300 ease-in"
                        whileHover={{ scale: 1.05 }}
                    >
                        Explore Now
                    </motion.button>
                </div>
            </div>
            {/* Trending Products Section */}
            <div className="container mx-auto py-16 px-6">
                <h2 className="text-4xl font-bold text-center mb-8">
                    🔥 Trending Products
                </h2>
                <Slider {...sliderSettings}>
                    {trendingProducts.map((product, index) => (
                        <motion.div
                            key={index}
                            className="p-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.2 }}
                        >
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="mx-auto h-40 object-cover mb-4"
                                />
                                <h3 className="text-xl font-semibold">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600">{product.price}</p>
                            </div>
                        </motion.div>
                    ))}
                </Slider>
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
                <h2 className="text-4xl font-bold mb-6">🛠️ How It Works</h2>
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
            {/* Testimonials */}
            {/* <div className="container mx-auto py-16 px-6 text-center">
                <h2 className="text-4xl font-bold mb-8">
                    ⭐ Customer Testimonials
                </h2>
                <p className="text-lg italic text-gray-700">
                    "This platform changed my shopping experience! Easy, secure,
                    and fun!"
                </p>
                <p className="font-semibold mt-4">- Jane Doe</p>
            </div> */}
            // {/* Testimonials Section */}
            <div className="bg-blue-600 text-white py-16 px-6 text-center">
                <h2 className="text-4xl font-bold mb-6">What Our Users Say</h2>
                <div className="max-w-3xl mx-auto grid gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="bg-white text-gray-800 p-6 rounded-lg shadow-md"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.2 }}
                        >
                            <p className="italic">"{testimonial.review}"</p>
                            <div className="flex items-center justify-center mt-4">
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                            </div>
                            <p className="font-semibold mt-2">
                                {testimonial.user}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            {/* Newsletter Section */}
            <div className="text-center py-16 bg-gray-200 px-6">
                <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
                <p className="text-lg text-gray-700 mb-6">
                    Subscribe to our newsletter for the latest deals and
                    updates.
                </p>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition">
                    Subscribe
                </button>
            </div>
            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center py-6 mt-10">
                <p>&copy; 2025 YourApp. All rights reserved.</p>
            </footer>
        </div>
    );
};

// // Testimonials Data
const testimonials = [
    { user: "Alice W.", review: "Amazing shopping experience!" },
    { user: "John D.", review: "Great deals and smooth checkout." },
    { user: "Emma P.", review: "Customer support was very helpful." },
];

// Features Data
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
        title: "Update Profile",
        description: "Update your profile and manage your details securely.",
        icon: FaUserShield,
    },
];

// Steps Data
const steps = [
    "Sign up or log in to get started.",
    "Browse and add products to your cart.",
    "Chat with users and explore deals.",
    "Checkout and enjoy your shopping experience!",
];

export default Home;

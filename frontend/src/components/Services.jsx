// import React from "react";
// import {
//     FaShoppingCart,
//     FaComments,
//     FaUserShield,
//     FaListAlt,
//     FaClipboardCheck,
// } from "react-icons/fa";
// import { motion } from "framer-motion";

// const Services = () => {
//     return (
//         <div className="bg-gray-100 min-h-screen">
//             {/* Hero Section */}
//             <div className="bg-gray-800 text-white text-center py-20 px-4">
//                 <motion.h1
//                     className="text-5xl font-bold mb-4"
//                     initial={{ opacity: 0, y: -50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     Discover Our Amazing Services
//                 </motion.h1>
//                 <p className="text-lg mb-6">
//                     We provide seamless shopping, chatting, and user-friendly
//                     features to enhance your experience.
//                 </p>
//                 <motion.button
//                     className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
//                     whileHover={{ scale: 1.05 }}
//                 >
//                     Get Started
//                 </motion.button>
//             </div>

//             {/* Services Section */}
//             <div className="container mx-auto py-16 px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
//                 {services.map((service, index) => (
//                     <motion.div
//                         key={index}
//                         className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition"
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.4, delay: index * 0.2 }}
//                     >
//                         <service.icon className="text-blue-500 text-5xl mx-auto mb-4" />
//                         <h3 className="text-2xl font-semibold mb-2">
//                             {service.title}
//                         </h3>
//                         <p className="text-gray-600">{service.description}</p>
//                     </motion.div>
//                 ))}
//             </div>

//             {/* Call to Action */}
//             <div className="text-center py-16 bg-gray-200 px-6">
//                 <h2 className="text-4xl font-bold mb-6">
//                     Experience the Best Services
//                 </h2>
//                 <p className="text-lg mb-6">
//                     Join our platform today and explore a seamless online
//                     shopping experience.
//                 </p>
//                 <motion.button
//                     className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
//                     whileHover={{ scale: 1.05 }}
//                 >
//                     Start Now
//                 </motion.button>
//             </div>

//             {/* Footer */}
//             <footer className="bg-gray-900 text-white text-center py-6 mt-10">
//                 <p>&copy; 2025 YourApp. All rights reserved.</p>
//             </footer>
//         </div>
//     );
// };

// const services = [
//     {
//         title: "Product Listing",
//         description: "Explore a variety of products in different categories.",
//         icon: FaListAlt,
//     },
//     {
//         title: "Chat with Users",
//         description:
//             "Connect with other users and discuss products in real time.",
//         icon: FaComments,
//     },
//     {
//         title: "Secure Profile Management",
//         description: "Easily update and manage your personal profile settings.",
//         icon: FaUserShield,
//     },
//     {
//         title: "Cart Management",
//         description: "Add or remove products from your cart effortlessly.",
//         icon: FaShoppingCart,
//     },
//     {
//         title: "Order Tracking",
//         description:
//             "Stay updated with real-time order tracking and notifications.",
//         icon: FaClipboardCheck,
//     },
//     {
//         title: "Secure Payments",
//         description: "Enjoy hassle-free and secure payment transactions.",
//         icon: FaUserShield,
//     },
// ];

// export default Services;

import React from "react";
import {
    FaShoppingCart,
    FaComments,
    FaUserShield,
    FaListAlt,
    FaCogs,
    FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Services = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <div className="bg-gray-900 text-white text-center py-20 px-4">
                <motion.h1
                    className="text-5xl font-bold mb-4"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Our Services – Everything You Need in One Place!
                </motion.h1>
                <p className="text-lg mb-6">
                    From shopping to chatting, experience the ultimate platform.
                </p>
            </div>

            {/* E-Commerce Features */}
            <div className="container mx-auto py-16 px-6">
                <h2 className="text-4xl font-bold text-center mb-8">
                    E-Commerce Features
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                    {ecommerceFeatures.map((feature, index) => (
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
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
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

            {/* Why Choose Us? */}
            <div className="container mx-auto py-16 px-6">
                <h2 className="text-4xl font-bold text-center mb-8">
                    Why Choose Us?
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.2 }}
                        >
                            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                {benefit}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center py-16 bg-gray-200 px-6">
                <h2 className="text-4xl font-bold mb-6">
                    Experience the Best Services
                </h2>
                <p className="text-lg mb-6">
                    Join our platform today and explore a seamless online
                    shopping experience.
                </p>
                <motion.button
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                >
                    Start Now
                </motion.button>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center py-6 mt-10">
                <p>&copy; 2025 YourApp. All rights reserved.</p>
            </footer>
        </div>
    );
};

const ecommerceFeatures = [
    {
        title: "Product Listing",
        description: "Browse and discover amazing products.",
        icon: FaListAlt,
    },
    {
        title: "Add to Cart",
        description: "Seamlessly add/remove products from your cart.",
        icon: FaShoppingCart,
    },
    {
        title: "Secure Checkout",
        description: "Enjoy a hassle-free and secure checkout process.",
        icon: FaUserShield,
    },
    {
        title: "Real-Time Chat",
        description: "Interact with other users in real-time.",
        icon: FaComments,
    },
    {
        title: "User Profiles",
        description: "Update your profile and manage your account easily.",
        icon: FaCogs,
    },
];

const steps = [
    "Sign up or log in to get started.",
    "Browse and add products to your cart.",
    "Chat with users and explore deals.",
    "Checkout and enjoy your shopping experience!",
];

const benefits = [
    "User-Friendly Interface",
    "Secure Transactions",
    "Real-Time Chat Support",
    "Easy Cart & Checkout",
    "24/7 Customer Assistance",
    "Regular Updates & New Features",
];

export default Services;

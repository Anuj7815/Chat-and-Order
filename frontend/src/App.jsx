import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import Products from "./components/Products";
import Services from "./components/Services";
import ChatPage from "./components/ChatPage";
import Carts from "./components/Carts";
import Profile from "./components/Profile";
import Favorites from "./components/Favorites";
import { Navigate } from "react-router-dom";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuth") ? true : false
    );
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Checking authentication: ", isAuthenticated);
    });

    const handleLogout = async () => {
        await fetch("http://localhost:5000/logout", {
            method: "POST",
            credentials: "include",
        });

        localStorage.removeItem("user");
        localStorage.removeItem("isAuth");
        setIsAuthenticated(false);
        alert("Logout Success");
        navigate("/login");
    };

    return (
        <>
            {isAuthenticated && <Navbar handleLogout={handleLogout} />}

            <Routes>
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/" />
                        ) : (
                            <Login setIsAuthenticated={setIsAuthenticated} />
                        )
                    }
                />
                <Route
                    path="/signup"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/" />
                        ) : (
                            <Signup setIsAuthenticated={setIsAuthenticated} />
                        )
                    }
                />

                {isAuthenticated ? (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/services" element={<Services />} />
                        <Route
                            path="/chats/:email/:name"
                            element={<ChatPage />}
                        />
                        <Route path="/cart" element={<Carts />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </>
    );
};

export default App;

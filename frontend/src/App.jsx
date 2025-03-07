import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
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
import { useSelector } from "react-redux";
import { handleLogout } from "./api/apiUtil";

const App = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        console.log("Checking authentication", isAuthenticated);
    }, [isAuthenticated]);

    return (
        <>
            {isAuthenticated && <Navbar handleLogout={handleLogout} />}

            <Routes>
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/signup"
                    element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
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

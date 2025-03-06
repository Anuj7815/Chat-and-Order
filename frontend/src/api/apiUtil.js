const URL = "http://localhost:5000";
import { Navigate } from "react-router-dom";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

// handles login logic and API
export const loginApi = async (formData, setIsAuthenticated) => {
    try {
        // console.log(formData);
        const response = await fetch(`${URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
        });
        // console.log(response);
        const data = await response.json();
        // console.log(data);

        if (response.ok) {
            setIsAuthenticated(true);
            localStorage.setItem("isAuth", true);
            localStorage.setItem("user", JSON.stringify(data.user));
            alert("Login Successfull");
            return "Success";
        } else {
            return "Failed";
        }
    } catch (error) {
        console.log(`Unable to login the user: `, error.message);
    }
};

// handles signup API and logic
export const signupApi = async (formData, setIsAuthenticated) => {
    try {
        const response = await fetch(`${URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
        });

        console.log(response);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            setIsAuthenticated(true);
            localStorage.setItem("isAuth", true);
            localStorage.setItem("user", JSON.stringify(data.user));
            alert("User Registered Successfully");
            return "Success";
        } else {
            return "Failed";
        }
    } catch (error) {
        console.log(`Unknown Error Occured while Signup:`, error.message);
    }
};

// handles logout API
export const handleLogout = async () => {
    await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
    });

    localStorage.removeItem("user");
    localStorage.removeItem("isAuth");
    alert("Logout Success");
    Navigate("/login");
};

// handles users API
export const usersApi = async (setUsers) => {
    try {
        const response = await fetch(`${URL}/users`, {
            credentials: "include",
        });
        console.log(response);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            setUsers(data);
        } else {
            alert("Unable to fetch the users data. Please login again.");
            handleLogout();
        }
    } catch (error) {
        console.log(
            "Unknown Error Occurred while fetching Users data.",
            error.message
        );
    }
};

// fetching all products
export const fetchProducts = createAsyncThunk(
    "c/5e06-e209-449f-a485/",
    async (page, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/products", {
                credentials: "include",
            });
            const data = await response.json();
            // console.log(data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// toggling favorites
export const toggleFavorite = createAsyncThunk(
    "/favorites/toggleFavorites",
    async ({ email, productId }) => {
        const response = await fetch(`${API}/favorites`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, productId }),
        });
        // console.log(response);
        const data = await response.json();
        // console.log(data.favorites);
        return data.favorites;
    }
);

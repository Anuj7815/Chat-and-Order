const URL = "http://localhost:5000";
import { Navigate } from "react-router-dom";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logoutSuccess } from "../features/authSlice";
// import { loginSuccess } from "../features/authSlice";

// handles login logic and API
export const loginApi = async (formData) => {
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
        // console.log(response.status === 200);
        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
            return data;
        } else if (response.status === 400) {
            console.log("Bad Request! Please login again");
            return null;
        } else if (response.status === 401) {
            console.log("Invalid Email address or password!");
            return null;
        } else {
            return null;
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

        if (response.status === 409) {
            console.log("User email already exists");
            alert("User email already exists");
            return null;
        } else if (response.status === 400) {
            console.log("Bad Request");
            return null;
        } else if (response.status === 201) {
            console.log("User created Successfully");
            return data;
        } else {
            console.log("Internal Server Error");
            return null;
        }
    } catch (error) {
        console.log(`Unknown Error Occured while Signup:`, error.message);
    }
};

// handles logout API
export const handleLogout = async () => {
    try {
        const response = await fetch(`${URL}/logout`, {
            method: "POST",
            credentials: "include",
        });
        console.log(response);
        if (response.status === 200) {
            localStorage.removeItem("user");
            localStorage.removeItem("isAuth");
            alert("Logout Success");
        }
    } catch (error) {
        console.log("Unknown Error Occurred while logout: ", error.message);
    }
};

// handles users API
export const usersApi = async (setUsers) => {
    try {
        const response = await fetch(`${URL}/users`, {
            credentials: "include",
        });
        console.log(response);

        if (response.status === 404) {
            console.log("User does not found");
            return;
        } else if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            setUsers(data);
        } else {
            console.log("Internal Server Error. Please login again!");
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
        console.log("inside fetchProducts api:");
        try {
            const response = await fetch(`${URL}/products`, {
                credentials: "include",
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                return data;
            } else {
                console.log("Internal Server Error");
                return;
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// toggling favorites
export const toggleFavorite = createAsyncThunk(
    "/favorites/toggleFavorites",
    async ({ email, productId }) => {
        console.log(email);
        console.log(productId);
        const response = await fetch(`${URL}/favorites`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, productId }),
        });
        console.log(response);
        if (response.status === 404) {
            console.log("User does not exists");
        } else if (response.status === 200) {
            const data = await response.json();
            // console.log(data.favorites);
            return data.favorites;
        } else {
            console.log("Internal Server Error");
        }
    }
);

// export const toggleFavorite = async ({ email, productId }) => {
//     try {
//         const response = await fetch(`${URL}/favorites`, {
//             method: "POST",
//             credentials: "include",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email, productId }),
//         });
//         console.log(response);
//         const data = await response.json();
//         console.log(data);
//         if (response.ok === 200) {
//             return data.favorites;
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.log(
//             "Error Occurred while toggling the favorite items.",
//             error.message
//         );
//     }
// };

// add to cart items
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ email, productId, quantity }) => {
        console.log(email);
        console.log(productId);
        console.log(quantity);
        const response = await fetch(`${URL}/cart`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, productId, quantity }),
        });

        console.log(response);
        if (response.status === 404) {
            console.log(
                "User does not exist. Unable to enter the items into the cart"
            );
        } else if (response.status === 200) {
            const data = await response.json();
            console.log(data.cartItems);
            return data.cartItems;
        } else {
            console.log("Internal Server Error");
        }
    }
);

export const fetchFavorites = createAsyncThunk(
    "/favorites/fetchFavorites",
    async ({ email }) => {
        console.log("Inside favorites api:");
        if (!email) {
            throw new Error(`Email is required to fetch favorites`);
        }

        // console.log(email);
        const response = await fetch(`${URL}/favorites/${email}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(response);
        if (response.status === 404) {
            console.log("favorite items does not found");
        } else if (response.status === 200) {
            const data = await response.json();
            console.log(data.favorites);
            // console.log(data.data.favorites);
            return data.favorites;
        } else {
            console.log("Internal Server Error");
        }
    }
);

export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async ({ email }) => {
        console.log("Inside fetch cart items:", email);
        const response = await fetch(`${URL}/cart/${email}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });

        console.log(response);

        if (response.status === 404) {
            console.log("Cart Items not found");
            return null;
        } else if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            console.log("Internal Server Error");
        }
    }
);

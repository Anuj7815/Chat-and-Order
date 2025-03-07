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
            // dispactch(loginSuccess());
            return data;
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
    await fetch(`${URL}/logout`, {
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
        console.log("inside fetchProducts api:");
        try {
            const response = await fetch(`${URL}/products`, {
                credentials: "include",
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// export const fetchProducts = async () => {
//     try {
//         const response = await fetch(`${URL}/products`, {
//             credentials: "include",
//         });
//         console.log(response);
//         const data = await response.json();
//         console.log(data);

//         if (response.status === 200) {
//             return data;
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.log("Unable to fetch the Products data: ", error.message);
//     }
// };

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
        const data = await response.json();
        // console.log(data.favorites);
        return data.favorites;
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
        const data = await response.json();
        console.log(data.cartItems);
        return data.cartItems;
    }
);

// export const addToCart = async ({ email, productId, quantity }) => {
//     console.log(email);
//     console.log(productId);
//     console.log(quantity);

//     try {
//         const response = await fetch(`${URL}/cart`, {
//             method: "POST",
//             credentials: "include",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email, productId, quantity }),
//         });
//         console.log("Add To cart response: ", response);
//         const data = await response.json();
//         console.log("Add to cart Data: ", data.cartItems);
//         if (response.status === 200) {
//             return data.cartItems;
//         } else return null;
//     } catch (error) {
//         console.log("Unable to add the items into the cart");
//     }
// };

export const fetchFavorites = createAsyncThunk(
    "/favorites/fetchFavorites",
    async ({ email }) => {
        console.log("inside favorites api:");
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

        if (!response.ok) {
            throw new Error(
                `Error whil fetching favorites: ${response.status}`
            );
        }
        // console.log(response);
        const data = await response.json();
        // console.log(data.favorites);
        return data.favorites;
    }
);

// export const fetchFavorites = async ({ email }) => {
//     try {
//         const response = await fetch(`${URL}/favorites/${email}`, {
//             method: "GET",
//             credentials: "include",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         console.log("Favorites Response: ", response);
//         const data = await response.json();
//         console.log("Favorites Data: ", data);
//         if (response.status === 200) {
//             return data.favorites;
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.log("Unable to fetch the favorite items");
//     }
// };

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

        if (!response.ok) {
            throw new Error(`Error while fetching the cart Items`);
        }

        // console.log(response);
        const data = await response.json();
        // console.log(data);
        return data;
    }
);

// export const fetchCartItems = async ({ email }) => {
//     try {
//         const response = await fetch(`${URL}/cart/${email}`, {
//             method: "GET",
//             credentials: "include",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         console.log("Cart Items response: ", response);
//         const data = await response.json();
//         console.log("Cart items data: ", data);
//         if (response.status === 200) {
//             return data;
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.log("Unable to fetch the cart items");
//     }
// };

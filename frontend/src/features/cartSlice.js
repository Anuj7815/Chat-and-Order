import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toggleFavorite } from "../api/apiUtil";
const API = "http://localhost:5000";

// export const toggleFavorite = createAsyncThunk(
//     "/favorites/toggleFavorites",
//     async ({ email, productId }) => {
//         const response = await fetch(`${API}/favorites`, {
//             method: "POST",
//             credentials: "include",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email, productId }),
//         });
//         // console.log(response);
//         const data = await response.json();
//         // console.log(data.favorites);
//         return data.favorites;
//     }
// );

export const fetchFavorites = createAsyncThunk(
    "/favorites/fetchFavorites",
    async ({ email }) => {
        if (!email) {
            throw new Error(`Email is required to fetch favorites`);
        }
        // email working fine
        // console.log(email);
        const response = await fetch(`${API}/favorites/${email}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(
                `Error whil fetching favorites: ${response.status}`
            );
        }
        // response working fine
        // console.log(response);
        const data = await response.json();
        // console.log(data.favorites);
        return data.favorites;
    }
);

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ email, productId, quantity }) => {
        console.log(email);
        console.log(productId);
        console.log(quantity);
        const response = await fetch(`${API}/cart`, {
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

export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async ({ email }) => {
        const response = await fetch(`${API}/cart/${email}`, {
            method: "GET",
            credentials: "include",
            header: {
                "Content-type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error while fetching the cart Items`);
        }

        // console.log(response);
        const data = await response.json();
        // console.log(data);
        return data;
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        favorites: [],
    },
    reducers: {
        toggleFavorites: (state, action) => {
            const productId = action.payload;
            // // console.log(action.payload);
            // state.favorites[productId] = !state.favorites[productId];
            if (state.favorites.includes(productId)) {
                state.favorites = state.favorites.filter(
                    (id) => id !== productId
                );
            } else {
                state.favorites.push(productId);
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.favorites = action.payload;
            })
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                state.favorites = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cartItems = action.payload;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.cartItems = action.payload;
            });
    },
});

export const { removeFromCart, toggleFavorites } = cartSlice.actions;
export default cartSlice.reducer;

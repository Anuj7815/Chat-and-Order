import { createSlice } from "@reduxjs/toolkit";
import {
    toggleFavorite,
    addToCart,
    fetchFavorites,
    fetchCartItems,
} from "../api/apiUtil";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        favorites: [],
    },
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
        setFavorites: (state, action) => {
            state.favorites = action.payload;
        },
        toggleFavoriteInState: (state, action) => {
            const productId = action.payload;
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

export const { setFavorites, setCartItems, toggleFavoriteInState } =
    cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../api/apiUtil";

const initialState = {
    products: [],
    loading: false,
    hasMore: true,
    page: 1,
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setLoading, setProducts, setError } = productSlice.actions;
export default productSlice.reducer;

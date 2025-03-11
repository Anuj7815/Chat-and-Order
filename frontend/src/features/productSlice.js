import { createSlice } from "@reduxjs/toolkit";

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
        fetchProductsSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
    },
});

export const { fetchProductsSuccess } = productSlice.actions;
export default productSlice.reducer;

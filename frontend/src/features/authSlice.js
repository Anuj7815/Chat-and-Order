import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: localStorage.getItem("isAuth") === "true",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state) => {
            state.isAuthenticated = true;
            localStorage.setItem("isAuth", true);
        },
        logoutSuccess: (state) => {
            state.isAuthenticated = false;
            localStorage.removeItem("isAuth");
            localStorage.removeItem("user");
        },
    },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions; //it exports the actions
export default authSlice.reducer; //it exports the reducer

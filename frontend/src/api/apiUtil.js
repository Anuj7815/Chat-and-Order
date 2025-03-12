const URL = "http://localhost:5000";
import { logoutSuccess } from "../features/authSlice";
import { store } from "../app/store";
import { useNavigate } from "react-router-dom";

const handleApiResponse = async (response) => {
    try {
        const data = await response.json();
        // console.log(data.message);

        const stat = response.status;
        // console.log("Status", stat);
        if (stat >= 200 && stat <= 299) {
            return data;
        } else {
            if (stat === 401) {
                store.dispatch(logoutSuccess());
                window.location.ref = "/login";
                return {
                    sucess: false,
                    message: data.message,
                };
            } else {
                return {
                    success: false,
                    message: data.message,
                };
            }
        }
    } catch (error) {
        console.error("Unknown error occurred");
    }
};

export const apiRequest = async (endpoint, method = "GET", body = null) => {
    try {
        const response = await fetch(`${URL}${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: body ? JSON.stringify(body) : null,
        });
        // console.log(response);
        return handleApiResponse(response);
    } catch (error) {
        console.error("Network error:", error.message);
        return null;
    }
};

export const loginApi = (formData) => apiRequest("/login", "POST", formData);
export const signupApi = (formData) => apiRequest("/signup", "POST", formData);
export const handleLogout = () => apiRequest("/logout", "POST");
export const usersApi = () => apiRequest("/users");
export const fetchProducts = () => apiRequest("/products");
export const toggleFavorite = (email, productId) =>
    apiRequest("/favorites", "POST", email, productId);
export const addToCart = (email, productId, quantity) =>
    apiRequest("/cart", "POST", { email, productId, quantity });
export const fetchFavorites = ({ email }) => apiRequest(`/favorites/${email}`);
export const fetchCartItems = ({ email }) => apiRequest(`/cart/${email}`);

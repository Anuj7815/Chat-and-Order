import React, { useState } from "react";
import { loginApi } from "../api/apiUtil";
import { useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess } from "../features/authSlice";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();

    // handle form change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // handle login form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await loginApi(formData);
        // console.log(result);

        if (result !== null) {
            dispatch(loginSuccess());
            localStorage.setItem("isAuth", true);
            localStorage.setItem("user", JSON.stringify(result.user));
            setFormData({ email: "", password: "" });
            alert("Login Success");
        } else {
            dispatch(logoutSuccess());
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Login!
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <a
                            href="/forgot-password"
                            className="text-blue-600 text-sm hover:underline"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                {/* Don't have an account? */}
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Signup
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;

import { User, Camera, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        address: "",
        age: "",
        profilePicture: "",
    });

    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const loggedInUserEmail = loggedInUser.email;

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/profile?email=${loggedInUserEmail}`,
                    {
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error(`Failed to fetch user information`);
                }

                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error("Unable to fetch user information");
            }
        };
        fetchUserInfo();
    }, [loggedInUserEmail]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        if (selectedFile) {
            formDataToSend.append("profilePicture", selectedFile);
        }

        try {
            const response = await fetch("http://localhost:5000/profile", {
                method: "PATCH",
                body: formDataToSend,
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`Failed to update profile`);
            }

            const data = await response.json();
            // alert("Profile updated successfully!");
            toast.success("Profile Updated Successfully", {
                position: "top-center",
                autoClose: 1000,
            });
            setFormData(data);
        } catch (error) {
            console.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-5">
                    Update Profile
                </h2>

                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center relative">
                    <div className="relative">
                        {formData.profilePicture ? (
                            <img
                                src={formData.profilePicture}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-md"
                            />
                        ) : (
                            <User className="w-24 h-24 text-gray-400 bg-gray-200 rounded-full p-4 border-4 border-gray-300 shadow-md" />
                        )}
                        <label
                            htmlFor="fileInput"
                            className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700 transition"
                        >
                            <Camera size={16} />
                        </label>
                    </div>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                {/* Profile Form */}
                <form className="space-y-4 mt-5" onSubmit={handleUpdate}>
                    <div>
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Your Name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
                            disabled
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            name="contactNumber"
                            value={formData.contactNumber || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Your Contact Number"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Address</label>
                        <textarea
                            name="address"
                            value={formData.address || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Your Address"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Your Age"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            className="px-5 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
                            onClick={() => navigate("/home")}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-800 transition flex items-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        className="animate-spin mr-2"
                                        size={18}
                                    />{" "}
                                    Updating...
                                </>
                            ) : (
                                "Update"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;

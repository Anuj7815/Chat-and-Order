import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Trash2 } from "lucide-react";
import React from "react";
import { usersApi } from "../api/apiUtil";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Fetch users from backend
    useEffect(() => {
        usersApi(setUsers);
    }, []);

    // Delete user
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?"))
            return;

        try {
            await fetch(`http://localhost:5000/users/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleChat = (userEmail, name) => {
        console.log(userEmail);
        navigate(`/chats/${userEmail}/${name}`); // Redirect to chat page with user ID
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Users List
            </h1>

            <div className="overflow-x-auto flex justify-center">
                <table className="w-2/3 border-collapse shadow-lg rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-left">
                            <th className="py-3 px-5">S.No</th>
                            <th className="py-3 px-5">Name</th>
                            <th className="py-3 px-5">Email</th>
                            <th className="py-3 px-5">Contact</th>
                            <th className="py-3 px-5 text-center">Chat</th>
                            {/* <th className="py-3 px-5 text-center">Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className={`border-b ${
                                        index % 2 === 0
                                            ? "bg-gray-100"
                                            : "bg-white"
                                    } hover:bg-gray-200 transition duration-200`}
                                >
                                    <td className="py-4 px-5">{index + 1}</td>
                                    <td className="py-4 px-5">{user.name}</td>
                                    <td className="py-4 px-5">{user.email}</td>
                                    <td className="py-4 px-5">
                                        {user.contactNumber}
                                    </td>
                                    <td className="py-4 px-5 text-center">
                                        <button
                                            onClick={() =>
                                                handleChat(
                                                    user.email,
                                                    user.name
                                                )
                                            }
                                            className="bg-green-500 text-white px-4 py-2 cursor-pointer rounded-full shadow-md hover:bg-green-600 transition"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            {/* Chat */}
                                        </button>
                                    </td>
                                    {/* <td className="py-4 px-5 text-center">
                                        <button
                                            onClick={() =>
                                                handleDelete(user._id)
                                            }
                                            className="bg-red-500 text-white cursor-pointer px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                          
                                        </button>
                                    </td> */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="py-4 px-5 text-center text-gray-500"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersPage;

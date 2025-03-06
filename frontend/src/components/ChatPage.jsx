// React (with Tailwind CSS) (src/App.js)
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { db } from "../firebase/firebase.config";
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    doc,
    serverTimestamp,
} from "firebase/firestore";

// Client tries to Connect to the backend WebSocket server
const socket = io("http://localhost:5000", { autoConnect: false }); // Replace with your backend server URL

const ChatPage = () => {
    const location = useLocation();

    const [messages, setMessage] = useState([]);
    const { userEmail, name } = useParams();
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    // Getting the logged-in user
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const senderEmail = loggedInUser?.email || "";
    console.log(userEmail);
    console.log(senderEmail);
    // console.log(userId);
    console.log(name);

    useEffect(() => {
        if (!senderEmail || !userEmail) return;

        socket.connect();

        const room = [senderEmail, userEmail].sort().join("_");
        const messageRef = collection(db, "chats", room, "messages");
        const q = query(messageRef, orderBy("timestamp", "asc"));

        // Real-time listener
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessage(snapshot.docs.map((doc) => doc.data()));
        });

        // Join chat room
        socket.emit("join_room", { senderEmail, userEmail });

        const handleMessage = (message) => {
            if (message.sender !== senderEmail) {
                setMessage((prevMessages) => [...prevMessages, message]);
            }
        };

        socket.on("receive_message", handleMessage);

        return () => {
            socket.off("receive_message", handleMessage);
            unsubscribe();
            socket.disconnect();
        };
    }, [senderEmail, userEmail]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        const messageData = {
            sender: senderEmail,
            receiver: userEmail,
            text: newMessage,
            timestamp: serverTimestamp(),
        };

        const room = [senderEmail, userEmail].sort().join("_");
        const messageRef = collection(db, "chats", room, "messages");

        try {
            await addDoc(messageRef, messageData);
            socket.emit("send_message", messageData);
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        // <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        //     <h1 className="text-xl font-bold mb-4">Chat With {name}</h1>
        //     <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg">
        //         <div className="h-64 overflow-y-auto p-2 border-b flex flex-col space-y-2">
        //             {messages.map((msg, index) => (
        //                 <div
        //                     key={index}
        //                     className={`p-2 max-w-xs rounded-lg ${
        //                         msg.sender === senderEmail
        //                             ? "bg-blue-500 text-white self-end ml-auto"
        //                             : "bg-gray-200 text-black self-start"
        //                     }`}
        //                 >
        //                     <p>{msg.text}</p>
        //                     <span className="block text-xs text-gray-600 mt-1">
        //                         {new Date(msg.timestamp).toLocaleTimeString()}
        //                     </span>
        //                 </div>
        //             ))}
        //             <div ref={messagesEndRef} />
        //         </div>
        //         <div className="flex items-center mt-2">
        //             <input
        //                 type="text"
        //                 value={newMessage}
        //                 onChange={(e) => setNewMessage(e.target.value)}
        //                 className="flex-grow p-2 border rounded-lg"
        //                 placeholder="Type a message..."
        //                 onKeyDown={handleKeyDown}
        //             />
        //             <button
        //                 onClick={sendMessage}
        //                 className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
        //             >
        //                 Send
        //             </button>
        //         </div>
        //     </div>
        // </div>

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-xl font-bold mb-4">Chat With {name}</h1>
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg">
                <div className="h-64 overflow-y-auto p-2 border-b flex flex-col space-y-2">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-2 max-w-xs rounded-lg ${
                                msg.sender === senderEmail
                                    ? "bg-blue-500 text-white self-end ml-auto"
                                    : "bg-gray-200 text-black self-start"
                            }`}
                        >
                            <p>{msg.text}</p>
                            <span className="block text-xs text-gray-600 mt-1">
                                {msg.timestamp?.toDate
                                    ? new Date(
                                          msg.timestamp.toDate()
                                      ).toLocaleTimeString()
                                    : "Sending..."}
                            </span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="flex items-center mt-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-grow p-2 border rounded-lg"
                        placeholder="Type a message..."
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;

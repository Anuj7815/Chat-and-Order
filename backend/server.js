require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");
const productRoute = require("./routes/productRoute");
const favoriteRoute = require("./routes/favoriteRoute");
const cartRoute = require("./routes/cartRoute");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const profileRoute = require("./routes/profileRoute");
const ChatModel = require("./models/ChatModel");
const checkRoute = require("./routes/checkRoute");
const logoutRoute = require("./routes/logoutRoute");

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },
});

// connected to mongodb atlas
connectDB();

// middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
    fileUpload({ useTempFiles: true, limits: { fileSize: 50 * 1024 * 1024 } })
);
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// routes handling
app.use("/", authRoute);
app.use("/", usersRoute);
app.use("/", productRoute);
app.use("/favorites", favoriteRoute);
app.use("/", profileRoute);
app.use("/cart", cartRoute);
app.use("/", logoutRoute);
app.use("/", checkRoute);

// code for socket.io or chat functionlity
io.on("connection", (socket) => {
    console.log("A user connected");
    // socket.io("chat message", async (msg) => {
    //     try {
    //         const message = new ChatModel({
    //             senderId: msg.senderId,
    //             receiverId: msg.receiverId,
    //             content: msg.content,
    //         });
    //         await message.save();

    //         // emit the message to the specific receiver
    //         io.to(msg.receiverId).emit("chat message", msg);

    //         // emit the message to the sender
    //         io.to(msg.senderId).emit("chat message", msg);
    //     } catch (error) {
    //         console.log(
    //             "Error occured while saving the message: ",
    //             error.message
    //         );
    //     }
    // });

    // socket.on("user online", (userId) => {
    //     socket.join(userId);
    //     socket.userId = userId;
    //     console.log(`User ${userId} is Online.`);
    // });

    // Join a specific chat room
    socket.on("join_room", ({ senderEmail, receiverEmail }) => {
        const room = [senderEmail, receiverEmail].sort().join("_");
        socket.join(room);
        console.log(`${senderEmail} joined room: ${room}`);
    });

    // handle incoming messages
    socket.on("send_message", (data) => {
        const room = [data.sender, data.receiver].sort().join("_");
        console.log(`Sending message from ${data.sender} to ${data.receiver}`);
        io.to(room).emit("receive_message", data);
    });
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// routes
app.get("/", (req, res) => {
    res.send("Backend Running.");
});

app.listen(PORT, () => {
    console.log("Server is Running on: ", PORT);
});

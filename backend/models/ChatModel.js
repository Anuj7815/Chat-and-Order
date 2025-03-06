const mongoose = require("mongoose");

const ChatModel = new mongoose.Schema({
    senderId: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Chats", ChatModel);

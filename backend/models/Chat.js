// models/Chat.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ["user", "bot"],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    enum: ["manual", "pdf", "ai"],
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [messageSchema],
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);

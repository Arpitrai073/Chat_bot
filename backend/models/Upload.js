const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  content: { type: String, required: true },
  type: { type: String, enum: ["faq", "pdf"], default: "faq" },
  uploadedBy: { type: String, default: "admin" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Upload", uploadSchema);

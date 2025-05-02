// models/Faq.js
const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
  type: { type: String, enum: ["manual", "pdf"], default: "manual" },
});

module.exports = mongoose.model("Faq", faqSchema);

// backend/routes/faqRoutes.js
const express = require("express");
const Faq = require("../models/FAQ"); // Import the FAQ model

const router = express.Router();

// POST route for adding FAQ manually
router.post("/manual-faq", async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Create a new FAQ document
    const newFaq = new Faq({ question, answer });

    // Save the FAQ to the database
    await newFaq.save();

    res.status(201).json({ message: "FAQ added successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add FAQ" });
  }
});

module.exports = router;

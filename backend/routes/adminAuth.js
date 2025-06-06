// routes/adminAuth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Secure way

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const authRoutes = require("./routes/authRoutes"); // Import authentication routes
// const chatRoutes = require("./routes/chatRoutes");
// const uploadRoutes = require("./routes/uploadRoutes");
// const faqRoutes = require("./routes/faqRoutes");
// const { protect } = require("./middleware/authMiddleware");
//  // Import authentication middleware

// dotenv.config();

// const app = express();

// // Log environment variables to confirm they are loaded correctly
// console.log("Hugging Face API Token:", process.env.HUGGINGFACE_API_TOKEN); // Check if API token is loaded
// console.log("Hugging Face Model URL:", process.env.HUGGINGFACE_MODEL_URL); // Check if model URL is loaded
// console.log("MongoDB URI:", process.env.MONGO_URI); // Check if MongoDB URI is loaded

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");

//     // Start the server *after* DB connection is successful
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1); // Exit the app if DB fails to connect
//   });

// // Routes
// app.use("/api/auth", authRoutes);       // User registration and login routes
// app.use("/api/chat", protect, chatRoutes);  // Chat routes (protected)
// app.use("/api/admin", protect, uploadRoutes); // Admin upload routes (protected)
// app.use("/api/admin", protect, faqRoutes); // Admin FAQ routes (protected)

// // Root endpoint (optional)
// app.get("/", (req, res) => {
//   console.log("Root endpoint hit");  // Log when root endpoint is accessed
//   res.send("AI Chat Support API is running.");
// });
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Route Imports
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const faqRoutes = require("./routes/faqRoutes");

// Middleware
const { protect } = require("./middleware/authMiddleware");

dotenv.config();

const app = express();

// Debug: Log essential environment variables
console.log("Hugging Face API Token:", process.env.HUGGINGFACE_API_TOKEN);
console.log("Hugging Face Model URL:", process.env.HUGGINGFACE_MODEL_URL);
console.log("MongoDB URI:", process.env.MONGO_URI);

// Global Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);                   // Public: Auth routes
app.use("/api/chat", chatRoutes);          // Protected: User chat
app.use("/api/admin",  uploadRoutes); // Protected: Admin uploads
app.use("/api/admin",  faqRoutes);     // Protected: Admin FAQs

// Health Check
app.get("/", (req, res) => {
  console.log("Root endpoint hit");
  res.send("✅ AI Chat Support API is running.");
});

// MongoDB and Server Init
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });



const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const Upload = require("../models/Upload");
const ManualFaq = require("../models/FAQ"); // ⬅️ New model

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { protect, adminOnly } = require("../middleware/authMiddleware");

// ✅ Upload PDF FAQ File
router.post("/upload-faq", protect, adminOnly, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const pdfData = await pdfParse(req.file.buffer);

    const newUpload = new Upload({
      content: pdfData.text,
      type: "pdf",
      uploadedBy: "admin",
    });

    await newUpload.save();
    res.status(200).json({ message: "PDF uploaded and content stored." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process PDF." });
  }
});


// ✅ Add Manual FAQ
router.post("/manual-faq",protect, adminOnly, async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: "Question and Answer are required." });
  }

  try {
    const newFaq = new ManualFaq({ question, answer });
    await newFaq.save();
    res.status(200).json({ message: "Manual FAQ saved." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save manual FAQ." });
  }
});

// ✅ Get All Manually Added FAQs
router.get("/manual-faq", async (req, res) => {
  try {
    const faqs = await ManualFaq.find().sort({ createdAt: -1 });
    res.status(200).json(faqs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch manual FAQs." });
  }
});

module.exports = router;

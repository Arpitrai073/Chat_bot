const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const Upload = require("../models/Upload");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload-faq", upload.single("file"), async (req, res) => {
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

module.exports = router;

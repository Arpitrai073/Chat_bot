const Upload = require('../models/Upload'); // MongoDB model
const pdfParse = require("pdf-parse");
const uploadFAQ = async (req, res) => {
  const { content, type = 'faq', uploadedBy = 'admin' } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const newEntry = new Upload({ content, type, uploadedBy });
    await newEntry.save();
    res.status(200).json({ message: 'FAQ uploaded successfully' });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: 'Failed to upload FAQ' });
  }
};
const uploadPDF = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
  
    try {
      const dataBuffer = req.file.buffer;
      const pdfData = await pdfParse(dataBuffer);
  
      const newEntry = new Upload({
        content: pdfData.text,
        type: "pdf",
        uploadedBy: "admin",
      });
  
      await newEntry.save();
      res.status(200).json({ message: "PDF uploaded and parsed successfully" });
    } catch (err) {
      console.error("PDF Upload Error:", err);
      res.status(500).json({ error: "Failed to parse PDF" });
    }
  };
  module.exports = { uploadFAQ, uploadPDF }; 

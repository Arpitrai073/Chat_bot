const axios = require("axios");
const Faq = require("../models/FAQ"); // Assuming you have a model for manual FAQs
const Upload = require("../models/Upload"); // Assuming you have a model for uploaded PDFs

const chatMessage = async (req, res) => {
  try {
    const { message } = req.body;

    console.log("Received message:", message);

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    console.log("Using Hugging Face API token:", process.env.HUGGINGFACE_API_TOKEN);
    console.log("Using Hugging Face Model URL:", process.env.HUGGINGFACE_MODEL_URL);

    // Try checking if the message matches any manual FAQ first
    const manualFaq = await Faq.findOne({ question: { $regex: message, $options: 'i' } });

    if (manualFaq) {
      return res.status(200).json({ reply: manualFaq.answer, source: "manual" });
    }

    // Check if the message is found in any uploaded PDFs (we're assuming you indexed content in PDFs)
    const pdfFaq = await Upload.findOne({ content: { $regex: message, $options: 'i' } });

    if (pdfFaq) {
      return res.status(200).json({ reply: pdfFaq.content, source: "pdf" });
    }

    // If no match is found, call the AI model
    const response = await axios.post(
      process.env.HUGGINGFACE_MODEL_URL,
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response from Hugging Face:", response.data);

    const botReply = response.data[0]?.generated_text || "Sorry, I didn't understand that.";
    res.status(200).json({ reply: botReply, source: "ai" });

  } catch (err) {
    console.error("Error in AI chat:", err.message);
    res.status(500).json({ error: "Failed to fetch AI response. Please try again." });
  }
};

module.exports = { chatMessage };

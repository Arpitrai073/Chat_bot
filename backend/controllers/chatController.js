const { OpenAI } = require("openai");
const Faq = require("../models/FAQ");
const Upload = require("../models/Upload");

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const chatMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Try to find a matching manual FAQ
    const manualFaq = await Faq.findOne({ question: { $regex: message, $options: "i" } });

    // Try to find relevant content in uploaded PDFs
    const pdfFaq = await Upload.findOne({ content: { $regex: message, $options: "i" } });

    // Combine any available context
    let context = "";
    if (manualFaq) {
      context += `FAQ:\nQ: ${manualFaq.question}\nA: ${manualFaq.answer}\n\n`;
    }
    if (pdfFaq) {
      context += `PDF content:\n${pdfFaq.content}\n\n`;
    }

    const prompt = context
      ? `Use the following context to answer the user's question:\n\n${context}\nQuestion: ${message}`
      : message;

    // Ask the AI
    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const botReply = completion.choices[0]?.message?.content || "Sorry, I didn't understand that.";

    res.status(200).json({
      reply: botReply,
      source: context ? "context + ai" : "ai",
    });
  } catch (err) {
    console.error("OpenRouter error:", err.message);
    res.status(500).json({ error: "AI processing failed." });
  }
};

module.exports = { chatMessage };

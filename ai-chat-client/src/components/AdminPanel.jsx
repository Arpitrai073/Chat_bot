import React, { useState } from "react";

const AdminPanel = () => {
  const [faqFile, setFaqFile] = useState(null);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [manualFaqs, setManualFaqs] = useState([]);

  const handleFileChange = (e) => {
    setFaqFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!faqFile) {
      setStatus("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", faqFile);

    try {
      setIsUploading(true);
      setStatus("Uploading...");

      const response = await fetch("http://localhost:5000/api/admin/upload-faq", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("File uploaded successfully.");
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      setStatus("Error uploading the file.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleManualSubmit = async () => {
    if (!question.trim() || !answer.trim()) {
      setStatus("Please provide both a question and an answer.");
      return;
    }

    // Create the FAQ object
    const newFaq = { question, answer };
    setManualFaqs([...manualFaqs, newFaq]);

    // Optionally, you can send this FAQ data to the backend to store it in your database
    try {
      const response = await fetch("http://localhost:5000/api/admin/manual-faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFaq),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("FAQ added successfully.");
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      setStatus("Error saving the FAQ.");
    }

    // Reset input fields
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="admin-panel bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Admin Panel - Upload FAQs</h2>

      <div className="mb-4">
        <input
          type="file"
          accept=".txt,.csv,.pdf"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className={`bg-green-500 text-white px-4 py-2 rounded ${isUploading ? "bg-gray-400" : ""}`}
      >
        {isUploading ? "Uploading..." : "Upload FAQ"}
      </button>

      {/* Manual FAQ Input */}
      <h3 className="text-lg font-semibold mt-6">Manually Add FAQ</h3>
      <div className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter the FAQ question"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Answer</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter the FAQ answer"
          />
        </div>

        <button
          onClick={handleManualSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add FAQ
        </button>
      </div>

      {/* Display Manually Added FAQs */}
      <h3 className="text-lg font-semibold mt-6">Manually Added FAQs</h3>
      <div className="mt-4">
        {manualFaqs.length > 0 ? (
          <ul className="list-disc pl-5">
            {manualFaqs.map((faq, index) => (
              <li key={index} className="mb-2">
                <strong>{faq.question}</strong>: {faq.answer}
              </li>
            ))}
          </ul>
        ) : (
          <p>No FAQs added manually yet.</p>
        )}
      </div>

      {status && <p className="mt-4 text-lg text-gray-700">{status}</p>}
    </div>
  );
};

export default AdminPanel;

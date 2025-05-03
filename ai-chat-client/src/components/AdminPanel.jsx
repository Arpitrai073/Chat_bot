import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [faqFile, setFaqFile] = useState(null);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [manualFaqs, setManualFaqs] = useState([]);

  const handleFileChange = (e) => setFaqFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!faqFile) return setStatus("❗ Please select a file.");

    const formData = new FormData();
    formData.append("file", faqFile);

    try {
      setIsUploading(true);
      setStatus("⏳ Uploading...");

      const response = await fetch("http://localhost:5000/api/admin/upload-faq", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setStatus(response.ok ? "✅ File uploaded successfully!" : `❌ Error: ${data.error}`);
    } catch (err) {
      setStatus("⚠️ Error uploading the file.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleManualSubmit = async () => {
    if (!question.trim() || !answer.trim()) {
      return setStatus("❗ Both fields are required.");
    }

    const newFaq = { question, answer };

    try {
      const res = await fetch("http://localhost:5000/api/admin/manual-faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFaq),
      });

      const data = await res.json();
      if (res.ok) {
        setManualFaqs((prev) => [...prev, newFaq]);
        setStatus("✅ FAQ added successfully.");
        setQuestion("");
        setAnswer("");
      } else {
        setStatus(`❌ Error: ${data.error}`);
      }
    } catch {
      setStatus("⚠️ Error saving the FAQ.");
    }
  };

  // ✅ Fetch manually added FAQs on component load
  const fetchManualFaqs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/manual-faq");
      const data = await res.json();
      if (res.ok) setManualFaqs(data);
    } catch {
      console.error("Failed to load manual FAQs.");
    }
  };

  useEffect(() => {
    fetchManualFaqs();
  }, []);
  // Auto-clear status after 4 seconds
useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 p-6 text-white">
      <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8 drop-shadow-md animate-fade-in">
          Admin FAQ Panel
        </h2>

        {/* File Upload Section */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold">Upload FAQ File</label>
          <input
            type="file"
            accept=".txt,.csv,.pdf"
            onChange={handleFileChange}
            className="block w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-400 transition"
          />
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`w-full mt-2 px-4 py-2 rounded-lg text-white font-medium transition ${
              isUploading ? "bg-gray-600 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-400"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload FAQ"}
          </button>
        </div>

        {/* Manual FAQ Entry */}
        <h3 className="text-2xl font-semibold mt-10 mb-4 text-blue-300">
          Add FAQ Manually
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter FAQ question"
            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter FAQ answer"
            rows={3}
            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleManualSubmit}
            className="w-full bg-blue-600 hover:bg-blue-500 transition text-white px-4 py-2 rounded-lg font-semibold"
          >
            Add FAQ
          </button>
        </div>

        {/* Display FAQs */}
        <h3 className="text-2xl font-semibold mt-10 mb-4 text-green-300">
          Manually Added FAQs
        </h3>
        {manualFaqs.length > 0 ? (
          <ul className="space-y-3 bg-gray-800 rounded-lg p-4">
            {manualFaqs.map((faq, index) => (
              <li key={index} className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-green-100">{faq.question}</p>
                <p className="text-sm text-gray-300">{faq.answer}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">No FAQs added manually yet.</p>
        )}

        {/* Status Message */}
        {status && (
          <p className="mt-6 p-3 bg-gray-800 text-yellow-300 rounded text-center text-sm border border-yellow-400 shadow-sm">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

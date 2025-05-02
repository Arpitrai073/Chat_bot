import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import chatStore from "../store/chatStore";
import authStore from "../store/authStore";
import Message from "./Message";
import Loader from "./Loader";
import Navbar from "./Navbar"; // ✅ Import Navbar

const ChatBox = observer(() => {
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatStore.messages.length]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const message = input;
    chatStore.addMessage({ text: message, sender: "user" });
    setInput("");
    chatStore.setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.user}`,
        },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        const data = await res.json();
        chatStore.addMessage({
          text: data.reply,
          sender: "bot",
          source: data.source,
        });
      } else {
        chatStore.addMessage({ text: "Server error occurred.", sender: "bot" });
      }
    } catch (err) {
      console.error("Chat fetch error:", err.message);
      chatStore.addMessage({ text: "Network error. Please try again.", sender: "bot" });
    } finally {
      chatStore.setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar /> {/* ✅ Navbar added at the top */}

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {chatStore.messages.map((msg, idx) => (
          <Message key={idx} message={msg} />
        ))}
        {chatStore.loading && <Loader />}
        <div ref={chatEndRef} />
      </div>

      <div className="sticky bottom-0 bg-white border-t px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 disabled:opacity-50"
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
});

export default ChatBox;

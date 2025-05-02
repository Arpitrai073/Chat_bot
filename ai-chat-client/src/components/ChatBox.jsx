import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import chatStore from "../store/chatStore";
import Message from "./Message";
import Loader from "./Loader";

const ChatBox = observer(() => {
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatStore.messages.length]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    chatStore.addMessage({ text: input, sender: "user" });
    setInput("");
    chatStore.setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, userId: "exampleUserId" }),
      });

      if (res.ok) {
        const data = await res.json();
        chatStore.addMessage({
          text: data.reply,
          sender: "bot",
          source: data.source, // Optional
        });
      } else {
        chatStore.addMessage({ text: "Server error occurred.", sender: "bot" });
      }
    } catch (err) {
      chatStore.addMessage({ text: "Network error. Please try again.", sender: "bot" });
    } finally {
      chatStore.setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {chatStore.messages.map((msg, idx) => (
          <Message key={idx} message={msg} />
        ))}
        {chatStore.loading && <Loader />}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
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

import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaRobot } from "react-icons/fa";

const Message = ({ message }) => {
  const isUser = message.sender === "user";
  const bubbleClasses = isUser
    ? "bg-blue-600 text-white self-end rounded-tr-none"
    : "bg-white/20 text-white backdrop-blur-sm self-start rounded-tl-none";

  const avatar = isUser ? (
    <FaUser className="text-blue-300 text-lg" />
  ) : (
    <FaRobot className="text-gray-200 text-lg" />
  );

  const timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} items-end`}
    >
      {!isUser && <div className="mr-2">{avatar}</div>}

      <div>
        <div
          className={`px-4 py-2 max-w-xs sm:max-w-md rounded-2xl mb-1 shadow-md ${bubbleClasses}`}
        >
          {message.text}
        </div>
        <div className="text-xs text-gray-400 ml-1">{timestamp}</div>
        {!isUser && message.source && (
          <div className="text-xs text-gray-300 ml-1 italic">
            Source: <span className="font-semibold">{message.source}</span>
          </div>
        )}
      </div>

      {isUser && <div className="ml-2">{avatar}</div>}
    </motion.div>
  );
};

export default Message;

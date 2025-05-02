import React from "react";
import { FaUser, FaRobot } from "react-icons/fa";

const Message = ({ message }) => {
  const isUser = message.sender === "user";
  const bubbleColor = isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900";
  const align = isUser ? "justify-end" : "justify-start";
  const avatar = isUser ? <FaUser className="text-blue-600" /> : <FaRobot className="text-gray-600" />;

  return (
    <div className={`flex ${align} mb-3`}>
      {!isUser && <div className="mr-2">{avatar}</div>}

      <div>
        <div className={`px-4 py-2 rounded-2xl max-w-xs sm:max-w-md break-words ${bubbleColor}`}>
          {message.text}
        </div>
        {/* Optional: Show source of the bot's reply */}
        {!isUser && message.source && (
          <div className="text-xs text-gray-500 mt-1 ml-1">
            Source: <span className="font-medium">{message.source}</span>
          </div>
        )}
      </div>

      {isUser && <div className="ml-2">{avatar}</div>}
    </div>
  );
};

export default Message;

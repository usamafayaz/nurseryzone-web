import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaPaperPlane, FaCopy, FaRobot } from "react-icons/fa";
import Gemini_key from "../utils/geminiKey";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(Gemini_key);

  const handleSend = async () => {
    if (inputText.trim() === "") return;
    if (inputText.trim() === "cls") {
      setMessages([]);
      setInputText("");
      return;
    }

    const newMessage = { id: Date.now(), text: inputText, user: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(inputText);
      const response = await result.response;
      const aiResponse = {
        id: Date.now() + 1,
        text: response.text(),
        user: false,
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("Error chatting with Gemini:", error);
      const errorResponse = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please try again.",
        user: false,
      };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
              <div className="flex justify-center mb-4 text-green-600">
                <FaRobot />
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                Welcome to Plant Assistant
              </h2>
              <p className="text-center text-gray-600">
                Curious about plants? 🌿 Ask me anything about plant care, types
                of plants, or gardening tips, and I'll provide you with helpful
                insights!
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.user ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.user ? "bg-green-600" : "bg-white shadow-md"
                }`}
              >
                <FormattedText text={message.text} isUser={message.user} />
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-md">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-green-600" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t border-gray-200">
        <div className="max-w-screen-lg mx-auto flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about plants..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
            className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

// Format message text with proper styling
const FormattedText = ({ text, isUser }) => {
  const lines = text.split("\n");
  let inCodeBlock = false;
  let codeContent = "";

  return lines.map((line, lineIndex) => {
    // Check for numbered headings (e.g., "1. **Title**")
    const numberedHeadingMatch = line.match(/^(\d+\.) \*\*(.*?)\*\*/);
    if (numberedHeadingMatch) {
      const [number, headingText] = numberedHeadingMatch;
      return (
        <div
          key={lineIndex}
          className={`text-lg font-bold italic mb-3 ${
            isUser ? "text-white" : "text-gray-800"
          }`}
        >
          {number} {headingText}
        </div>
      );
    }

    // Handle code blocks
    if (line.trim() === "```") {
      if (inCodeBlock) {
        const content = codeContent;
        codeContent = "";
        inCodeBlock = false;
        return (
          <div
            key={lineIndex}
            className="relative bg-gray-100 rounded-md p-4 mb-3 group"
          >
            <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap">
              {content}
            </pre>
            <button
              onClick={() => {
                navigator.clipboard.writeText(content);
                // You could add a toast notification here
              }}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FaCopy />
            </button>
          </div>
        );
      } else {
        inCodeBlock = true;
        return null;
      }
    }

    if (inCodeBlock) {
      codeContent += line + "\n";
      return null;
    }

    // Handle other formatting
    const parts = line.split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*)/);

    return (
      <div key={lineIndex} className="mb-2">
        {parts
          .filter((part) => part.trim())
          .map((part, partIndex) => {
            part = part.trim();

            if (part.startsWith("***") && part.endsWith("***")) {
              return (
                <span
                  key={`${lineIndex}-${partIndex}`}
                  className={`text-xl font-bold mb-3 block ${
                    isUser ? "text-white" : "text-gray-800"
                  }`}
                >
                  {part.slice(3, -3).trim()}
                </span>
              );
            } else if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <span
                  key={`${lineIndex}-${partIndex}`}
                  className={`text-lg font-bold mb-2 block ${
                    isUser ? "text-white" : "text-gray-800"
                  }`}
                >
                  {part.slice(2, -2).trim()}
                </span>
              );
            } else if (part.startsWith("*") && part.endsWith("*")) {
              return (
                <span
                  key={`${lineIndex}-${partIndex}`}
                  className={`italic ${
                    isUser ? "text-white" : "text-green-600"
                  }`}
                >
                  {part.slice(1, -1).trim()}
                </span>
              );
            } else {
              return (
                <span
                  key={`${lineIndex}-${partIndex}`}
                  className={`${isUser ? "text-white" : "text-gray-600"}`}
                >
                  {part}
                </span>
              );
            }
          })}
      </div>
    );
  });
};

export default ChatBot;

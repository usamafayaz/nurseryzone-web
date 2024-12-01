import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MessageSquare, Send, Copy, Bot, Leaf } from "lucide-react";

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

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header Section */}
      <div className="bg-green-600 text-white py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Leaf size={32} />
            <div>
              <h1 className="text-xl font-bold">Plant Assistant</h1>
              <p className="text-green-100 mt-1">
                Your personal gardening companion
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden min-h-[390px] flex flex-col">
          {/* Decorative element */}
          <div className="absolute top-0 left-0 w-2 h-full bg-green-600" />

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center">
                  <div className="flex justify-center mb-4 text-green-600">
                    <Bot size={48} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Welcome to Plant Assistant
                  </h2>
                  <p className="text-gray-600">
                    Curious about plants? 🌿 Ask me anything about plant care,
                    types of plants, or gardening tips, and I'll provide you
                    with helpful insights!
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
                    className={`max-w-[80%] p-4 rounded-xl shadow-sm ${
                      message.user
                        ? "bg-green-600 text-white"
                        : "bg-gray-50 border border-gray-100"
                    }`}
                  >
                    <FormattedText text={message.text} isUser={message.user} />
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-green-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="relative">
            <MessageSquare
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about plants..."
              className="w-full pl-12 pr-16 py-3 border border-gray-300 rounded-lg  transition-all duration-200 ease-in-out"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="fixed -bottom-32 -left-32 w-64 h-64 border-4 border-green-600 border-opacity-10 rounded-full" />
      <div className="fixed -bottom-28 -left-28 w-56 h-56 border-4 border-green-600 border-opacity-10 rounded-full" />
      <div className="fixed -top-32 -right-32 w-64 h-64 border-4 border-green-600 border-opacity-10 rounded-full" />
      <div className="fixed -top-28 -right-28 w-56 h-56 border-4 border-green-600 border-opacity-10 rounded-full" />
    </div>
  );
};

// Format message text with proper styling
const FormattedText = ({ text, isUser }) => {
  const lines = text.split("\n");
  let inCodeBlock = false;
  let codeContent = "";

  return lines.map((line, lineIndex) => {
    // Check for numbered headings
    const numberedHeadingMatch = line.match(/^(\d+\.) \*\*(.*?)\*\*/);
    if (numberedHeadingMatch) {
      const [, number, headingText] = numberedHeadingMatch;
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
            className="relative bg-white bg-opacity-10 rounded-md p-4 mb-3 group"
          >
            <pre
              className={`text-sm font-mono whitespace-pre-wrap ${
                isUser ? "text-white" : "text-gray-800"
              }`}
            >
              {content}
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(content)}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Copy size={16} />
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
                  className={isUser ? "text-white" : "text-gray-600"}
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

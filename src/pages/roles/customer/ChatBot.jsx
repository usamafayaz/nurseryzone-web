import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MessageSquare, Send, Copy, Bot, Sparkles } from "lucide-react";
import { REACT_APP_API_KEY } from "../../../config/key";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatSessionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Initialize AI only once
  const genAI = new GoogleGenerativeAI(REACT_APP_API_KEY);

  // Initialize chat session
  const initializeChatSession = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    chatSessionRef.current = model.startChat({
      history: messages.map((msg) => ({
        role: msg.user ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
      generationConfig: {
        maxOutputTokens: 500,
      },
    });
  };

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    // Special command to clear chat
    if (inputText.trim().toLowerCase() === "cls") {
      setMessages([]);

      setInputText("");
      chatSessionRef.current = null;
      return;
    }

    const newMessage = { id: Date.now(), text: inputText, user: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Initialize or reinitialize chat session
      if (!chatSessionRef.current) {
        await initializeChatSession();
      }

      // Send message and get response
      const result = await chatSessionRef.current.sendMessage(inputText);
      const response = result.response;

      const aiResponse = {
        id: Date.now() + 1,
        text: response.text(),
        user: false,
      };

      // Update messages and reinitialize chat session to maintain context
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      await initializeChatSession();
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
    <div className="bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-green-200 to-green-100 pointer-events-none" />

      <div className="bg-green-600 text-white py-4 px-6 shadow-md relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Sparkles size={32} className="text-green-200" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                AI Plant Companion
              </h1>
              <p className="text-green-100 mt-1 text-sm">
                Your intelligent gardening assistant
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl border border-green-50 p-8 relative overflow-hidden min-h-[500px] flex flex-col">
          <div className="absolute top-0 left-0 w-2 h-full bg-green-600" />

          <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center">
                  <div className="flex justify-center mb-4 text-green-600">
                    <Bot size={56} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Plant Intelligence Awaits
                  </h2>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Explore the world of plants with our AI companion. Ask about
                    care tips, plant identification, gardening techniques, and
                    more – your green journey starts here! 🌿
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
                    className={`max-w-[85%] p-4 rounded-xl shadow-sm transition-all ${
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
                <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-green-600" />
                  <span className="text-gray-600 text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

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
              placeholder="Ask about plants, gardening, or care tips..."
              className="w-full pl-12 pr-16 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-300 transition-all duration-200 ease-in-out"
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

      <div className="fixed -bottom-32 -left-32 w-64 h-64 border-4 border-green-600 border-opacity-10 rounded-full" />
      <div className="fixed -top-32 -right-32 w-64 h-64 border-4 border-green-600 border-opacity-10 rounded-full" />
    </div>
  );
};

const FormattedText = ({ text, isUser }) => {
  const lines = text.split("\n");
  let inCodeBlock = false;
  let codeContent = "";

  return lines.map((line, lineIndex) => {
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

    if (line.trim() === "```") {
      if (inCodeBlock) {
        const content = codeContent;
        codeContent = "";
        inCodeBlock = false;
        return (
          <div
            key={lineIndex}
            className="relative bg-slate-500 bg-opacity-10 rounded-md p-4 mb-3 group"
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

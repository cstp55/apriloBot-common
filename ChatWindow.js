import React, { useState, useRef, useEffect } from "react";
import "./ChatWindow.css";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! How can I assist you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage = { role: "user", content: inputValue };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setStreamingMessage(""); // Reset the streaming message
    
    try {
      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "aprilo",
          messages: [
            ...messages,
            userMessage
          ],
          stream: true
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        // Each chunk can contain multiple JSON objects separated by newlines
        const jsonStrings = chunk.split("\n").filter(str => str.trim());

        for (const jsonString of jsonStrings) {
          try {
            const data = JSON.parse(jsonString);

            if (data.message && data.message.content) {
              fullContent += data.message.content;
              setStreamingMessage(fullContent);
            }

            if (data.done) {
              // Add the complete message to the chat history and clear streaming
      setMessages(prevMessages => [
        ...prevMessages, 
                { role: "assistant", content: fullContent }
      ]);
              setStreamingMessage("");
              break;
    }
          } catch (e) {
            console.error("Error parsing JSON chunk:", e, jsonString);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching from API:", error);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." }
      ]);
      setStreamingMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      {/* Chat Icon */}
      <div className="chat-icon" onClick={toggleChat}>
        {isOpen ? <CloseIcon fontSize="large" /> : <ChatIcon fontSize="large" />}
      </div>
      
      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">Welcome to Chatbot</div>
          <div className="chat-body">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`chat-message ${message.role === "user" ? "user-message" : "assistant-message"}`}
              >
                {message.content}
              </div>
            ))}

            {/* Streaming message - shows typing effect */}
            {streamingMessage && (
              <div className="chat-message assistant-message streaming-message">
                {streamingMessage}
                <span className="typing-indicator"></span>
          </div>
            )}

            <div ref={messagesEndRef} />
          </div>
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type your message here..."
              className="chat-input"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={isLoading || streamingMessage}
            />
            <button
              className="send-button"
              onClick={sendMessage}
              disabled={isLoading || streamingMessage || !inputValue.trim()}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
    </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
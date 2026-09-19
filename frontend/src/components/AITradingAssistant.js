import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export const AITradingAssistant = () => {
  const { colors } = useTheme();
  const [messages, setMessages] = useState([
    { role: "assistant", text: "👋 Hi! I'm your AI Trading Assistant. Ask me anything about stocks, portfolios, or trading strategies!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages([...messages, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
     const response = await fetch("http://localhost:4000/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: userMessage }),
});

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "assistant", text: "⚠️ Error connecting to AI. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    backgroundColor: colors.background,
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const chatBoxStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    width: "100%",
    maxWidth: "600px",
    height: "600px",
    display: "flex",
    flexDirection: "column",
  };

  const messagesContainerStyle = {
    flex: 1,
    overflowY: "auto",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const messageStyle = (isUser) => ({
    display: "flex",
    justifyContent: isUser ? "flex-end" : "flex-start",
    marginBottom: "0.5rem",
  });

  const bubbleStyle = (isUser) => ({
    backgroundColor: isUser ? colors.primary : colors.surfaceLight,
    color: isUser ? "white" : colors.text,
    padding: "0.75rem 1rem",
    borderRadius: "12px",
    maxWidth: "80%",
    wordWrap: "break-word",
    fontSize: "14px",
    lineHeight: "1.4",
  });

  const inputContainerStyle = {
    display: "flex",
    gap: "0.5rem",
    padding: "1rem",
    borderTop: `1px solid ${colors.border}`,
  };

  const inputStyle = {
    flex: 1,
    padding: "0.75rem",
    borderRadius: "6px",
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    color: colors.text,
    fontSize: "14px",
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: colors.primary,
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  };

  return (
    <div style={containerStyle}>
      <div style={chatBoxStyle}>
        <div style={{ padding: "1rem", borderBottom: `1px solid ${colors.border}` }}>
          <h2 style={{ color: colors.text, margin: 0 }}>🤖 AI Trading Assistant</h2>
          <p style={{ color: colors.textSecondary, margin: "0.25rem 0 0 0", fontSize: "12px" }}>
            Powered by Advanced LLM
          </p>
        </div>

        <div style={messagesContainerStyle}>
          {messages.map((msg, idx) => (
            <div key={idx} style={messageStyle(msg.role === "user")}>
              <div style={bubbleStyle(msg.role === "user")}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={messageStyle(false)}>
              <div style={bubbleStyle(false)}>
                ⏳ Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={inputContainerStyle}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about stocks, portfolios, strategies..."
            style={inputStyle}
          />
          <button onClick={handleSend} disabled={loading} style={buttonStyle}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITradingAssistant;
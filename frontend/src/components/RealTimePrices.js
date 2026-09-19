import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useTheme } from "../context/ThemeContext";

export const RealTimePrices = () => {
  const { colors } = useTheme();
  const [prices, setPrices] = useState({});
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
      setConnected(true);
    });

    socket.on("initialPrices", (data) => {
      setPrices(data);
    });

    socket.on("priceUpdate", (data) => {
      setPrices(data);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    return () => socket.disconnect();
  }, []);

  const containerStyle = {
    backgroundColor: colors.background,
    minHeight: "100vh",
    padding: "2rem",
  };

  const cardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "1.5rem",
    marginBottom: "2rem",
  };

  const headerStyle = {
    color: colors.text,
    marginBottom: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const statusStyle = {
    display: "inline-block",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: connected ? "#2ecc71" : "#e74c3c",
    marginRight: "0.5rem",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1.5rem",
  };

  const priceBoxStyle = {
    backgroundColor: colors.surfaceLight,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "1.5rem",
    textAlign: "center",
  };

  const symbolStyle = {
    fontSize: "14px",
    color: colors.textSecondary,
    marginBottom: "0.5rem",
    fontWeight: "600",
  };

  const priceStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: colors.text,
    marginBottom: "0.5rem",
  };

  const changeStyle = {
    fontSize: "14px",
    color: "#2ecc71",
    fontWeight: "600",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div>
            <h1 style={{ color: colors.text, margin: 0 }}>📊 Real-time Prices</h1>
            <p style={{ color: colors.textSecondary, margin: "0.5rem 0 0 0", fontSize: "12px" }}>
              Live WebSocket Updates
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={statusStyle}></div>
            <span style={{ color: connected ? "#2ecc71" : "#e74c3c", fontWeight: "600", fontSize: "14px" }}>
              {connected ? "Live" : "Disconnected"}
            </span>
          </div>
        </div>

        <div style={gridStyle}>
          {Object.entries(prices).map(([symbol, price]) => (
            <div key={symbol} style={priceBoxStyle}>
              <div style={symbolStyle}>{symbol}</div>
              <div style={priceStyle}>₹{price.toFixed(2)}</div>
              <div style={changeStyle}>📈 Live Update</div>
            </div>
          ))}
        </div>

        {Object.keys(prices).length === 0 && (
          <div style={{ textAlign: "center", color: colors.textSecondary, padding: "2rem" }}>
            ⏳ Connecting to real-time feed...
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimePrices;
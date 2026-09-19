import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export const AdvancedOrders = () => {
  const { colors } = useTheme();
  const [orderType, setOrderType] = useState("bracket");
  const [symbol, setSymbol] = useState("INFY");
  const [quantity, setQuantity] = useState(1);
  const [entryPrice, setEntryPrice] = useState(1550);
  const [targetProfit, setTargetProfit] = useState(1600);
  const [stopLoss, setStopLoss] = useState(1500);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const stocks = ["INFY", "TCS", "HDFCBANK", "WIPRO", "RELIANCE"];

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  const profitPerShare = targetProfit - entryPrice;
  const lossPerShare = entryPrice - stopLoss;
  const totalProfit = profitPerShare * quantity;
  const totalLoss = lossPerShare * quantity;
  const riskRewardRatio = (profitPerShare / lossPerShare).toFixed(2);

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

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "6px",
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    color: colors.text,
    boxSizing: "border-box",
    marginBottom: "1rem",
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: colors.primary,
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    width: "100%",
  };

  const orderTypeButtonStyle = (active) => ({
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    border: `2px solid ${active ? colors.primary : colors.border}`,
    backgroundColor: active ? colors.primary + "20" : "transparent",
    color: colors.text,
    cursor: "pointer",
    fontWeight: "600",
    marginRight: "0.5rem",
    marginBottom: "1rem",
  });

  const summaryBoxStyle = {
    backgroundColor: colors.surfaceLight,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "1.5rem",
    marginTop: "1.5rem",
  };

  const summaryRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
    color: colors.text,
  };

  const successStyle = {
    backgroundColor: colors.success + "20",
    border: `1px solid ${colors.success}`,
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
    color: colors.success,
    fontWeight: "600",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: colors.text, marginBottom: "2rem" }}>🎯 Advanced Orders</h1>

      {orderPlaced && (
        <div style={successStyle}>
          ✅ Order Placed Successfully! Bracket order activated with target & stop-loss.
        </div>
      )}

      {/* Order Type Selection */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>Order Type</h2>
        <div>
          <button
            style={orderTypeButtonStyle(orderType === "bracket")}
            onClick={() => setOrderType("bracket")}
          >
            💰 Bracket Order
          </button>
          <button
            style={orderTypeButtonStyle(orderType === "cover")}
            onClick={() => setOrderType("cover")}
          >
            🛡️ Cover Order
          </button>
          <button
            style={orderTypeButtonStyle(orderType === "regular")}
            onClick={() => setOrderType("regular")}
          >
            📊 Regular Order
          </button>
        </div>
        <p style={{ color: colors.textSecondary, fontSize: "12px", marginTop: "1rem" }}>
          {orderType === "bracket" && "🎯 Bracket Order: Enter position with automatic profit target and stop-loss"}
          {orderType === "cover" && "🛡️ Cover Order: Buy at market with mandatory stop-loss"}
          {orderType === "regular" && "📊 Regular Order: Simple buy/sell order"}
        </p>
      </div>

      {/* Order Details */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>Order Details</h2>

        <label style={{ color: colors.textSecondary, fontSize: "12px", fontWeight: "600" }}>
          Symbol
        </label>
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          style={selectStyle}
        >
          {stocks.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <label style={{ color: colors.textSecondary, fontSize: "12px", fontWeight: "600" }}>
          Quantity
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          style={inputStyle}
        />

        <label style={{ color: colors.textSecondary, fontSize: "12px", fontWeight: "600" }}>
          Entry Price (₹)
        </label>
        <input
          type="number"
          value={entryPrice}
          onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
          style={inputStyle}
        />

        {(orderType === "bracket" || orderType === "cover") && (
          <>
            <label style={{ color: colors.textSecondary, fontSize: "12px", fontWeight: "600" }}>
              Target Profit (₹)
            </label>
            <input
              type="number"
              value={targetProfit}
              onChange={(e) => setTargetProfit(parseFloat(e.target.value) || 0)}
              style={inputStyle}
            />

            <label style={{ color: colors.textSecondary, fontSize: "12px", fontWeight: "600" }}>
              Stop Loss (₹)
            </label>
            <input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
              style={inputStyle}
            />
          </>
        )}

        <button onClick={handlePlaceOrder} style={buttonStyle}>
          Place {orderType === "bracket" ? "Bracket" : orderType === "cover" ? "Cover" : "Regular"} Order
        </button>
      </div>

      {/* Order Summary */}
      {(orderType === "bracket" || orderType === "cover") && (
        <div style={cardStyle}>
          <h2 style={{ color: colors.text, marginBottom: "1rem" }}>📊 Order Summary</h2>

          <div style={summaryBoxStyle}>
            <div style={summaryRowStyle}>
              <span>Symbol:</span>
              <strong>{symbol}</strong>
            </div>
            <div style={summaryRowStyle}>
              <span>Quantity:</span>
              <strong>{quantity} shares</strong>
            </div>
            <div style={summaryRowStyle}>
              <span>Entry Price:</span>
              <strong>₹{entryPrice.toFixed(2)}</strong>
            </div>
            <div style={summaryRowStyle}>
              <span>Target Price:</span>
              <strong style={{ color: colors.success }}>₹{targetProfit.toFixed(2)}</strong>
            </div>
            <div style={summaryRowStyle}>
              <span>Stop Loss:</span>
              <strong style={{ color: colors.danger }}>₹{stopLoss.toFixed(2)}</strong>
            </div>

            <hr style={{ borderColor: colors.border, margin: "1rem 0" }} />

            <div style={summaryRowStyle}>
              <span>Profit Per Share:</span>
              <strong style={{ color: colors.success }}>₹{profitPerShare.toFixed(2)}</strong>
            </div>
            <div style={summaryRowStyle}>
              <span>Loss Per Share:</span>
              <strong style={{ color: colors.danger }}>₹{lossPerShare.toFixed(2)}</strong>
            </div>
            <div style={summaryRowStyle}>
              <span>Total Profit Potential:</span>
              <strong style={{ color: colors.success }}>₹{totalProfit.toFixed(2)}</strong>
            </div>
            <div style={summaryRowStyle}>
              <span>Total Loss Risk:</span>
              <strong style={{ color: colors.danger }}>₹{totalLoss.toFixed(2)}</strong>
            </div>
            <div style={summaryRowStyle}>
              <span>Risk:Reward Ratio:</span>
              <strong style={{ color: colors.primary }}>1:{riskRewardRatio}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>ℹ️ Order Types Explained</h2>
        <div style={{ color: colors.text, lineHeight: "1.8" }}>
          <p><strong>💰 Bracket Order:</strong> Place entry, target profit, and stop-loss all at once. Automatic exit when price reaches either target or stop-loss.</p>
          <p><strong>🛡️ Cover Order:</strong> Buy at market with mandatory stop-loss to limit losses. Lower brokerage than bracket orders.</p>
          <p><strong>📊 Regular Order:</strong> Simple buy or sell order without automatic exits. Manual management required.</p>
        </div>
      </div>
    </div>
  );
};

export default AdvancedOrders;
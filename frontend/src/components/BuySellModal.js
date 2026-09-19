import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export const BuySellModal = ({ symbol, onClose, type = "BUY" }) => {
  const { colors } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(1500);
  const [orderType, setOrderType] = useState("Market");

  const totalValue = quantity * price;

  const handleSubmit = () => {
    alert(`${type} order placed!\n${quantity} x ${symbol} @ ₹${price}`);
    onClose();
  };

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  };

  const modalStyle = {
    backgroundColor: colors.surface,
    border: `2px solid ${type === "BUY" ? colors.success : colors.danger}`,
    borderRadius: "12px",
    padding: "2rem",
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    borderBottom: `1px solid ${colors.border}`,
    paddingBottom: "1rem",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: type === "BUY" ? colors.success : colors.danger,
    margin: 0,
  };

  const closeButtonStyle = {
    background: "none",
    border: "none",
    fontSize: "28px",
    cursor: "pointer",
    color: colors.text,
  };

  const fieldStyle = {
    marginBottom: "1.5rem",
  };

  const labelStyle = {
    display: "block",
    color: colors.textSecondary,
    fontSize: "12px",
    marginBottom: "0.5rem",
    fontWeight: "600",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "6px",
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    color: colors.text,
    fontSize: "14px",
    boxSizing: "border-box",
  };

  const selectStyle = {
    ...inputStyle,
  };

  const summaryStyle = {
    backgroundColor: colors.background,
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1.5rem",
  };

  const summaryRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.75rem",
    fontSize: "14px",
  };

  const totalStyle = {
    display: "flex",
    justifyContent: "space-between",
    borderTop: `1px solid ${colors.border}`,
    paddingTop: "0.75rem",
    fontSize: "16px",
    fontWeight: "bold",
    color: colors.text,
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "1rem",
  };

  const submitButtonStyle = {
    flex: 1,
    padding: "1rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: type === "BUY" ? colors.success : colors.danger,
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  };

  const cancelButtonStyle = {
    flex: 1,
    padding: "1rem",
    borderRadius: "6px",
    border: `1px solid ${colors.border}`,
    backgroundColor: "transparent",
    color: colors.text,
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            {type === "BUY" ? "Buy" : "Sell"} {symbol}
          </h2>
          <button style={closeButtonStyle} onClick={onClose}>
            ✕
          </button>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Order Type</label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            style={selectStyle}
          >
            <option>Market</option>
            <option>Limit</option>
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            style={inputStyle}
            min="1"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Price per Unit (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
            style={inputStyle}
            step="0.01"
          />
        </div>

        <div style={summaryStyle}>
          <div style={summaryRowStyle}>
            <span>Quantity:</span>
            <span>{quantity}</span>
          </div>
          <div style={summaryRowStyle}>
            <span>Price:</span>
            <span>₹{price.toFixed(2)}</span>
          </div>
          <div style={totalStyle}>
            <span>Total Value:</span>
            <span>₹{totalValue.toFixed(2)}</span>
          </div>
        </div>

        <div style={buttonContainerStyle}>
          <button style={submitButtonStyle} onClick={handleSubmit}>
            {type === "BUY" ? "Buy Now" : "Sell Now"}
          </button>
          <button style={cancelButtonStyle} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuySellModal;
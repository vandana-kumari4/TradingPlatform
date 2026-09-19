import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { StockPrice } from "./StockPrice";
import { BuySellModal } from "./BuySellModal";

export const Watchlist = () => {
  const { colors } = useTheme();
  const [watchlist, setWatchlist] = useState([
    { name: "INFY", price: 1550, change: 150, changePercent: 10.71, isDown: false },
    { name: "TCS", price: 3400, change: 200, changePercent: 6.25, isDown: false },
    { name: "HDFCBANK", price: 1550, change: 50, changePercent: 3.33, isDown: false },
    { name: "WIPRO", price: 450, change: -20, changePercent: -4.26, isDown: true },
    { name: "RELIANCE", price: 2100, change: 100, changePercent: 5.0, isDown: false },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [modalType, setModalType] = useState("BUY");
  const [hoveredStock, setHoveredStock] = useState(null);

  const filteredWatchlist = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeFromWatchlist = (symbol) => {
    setWatchlist(watchlist.filter((s) => s.name !== symbol));
  };

  const openBuyModal = (symbol) => {
    setSelectedStock(symbol);
    setModalType("BUY");
  };

  const openSellModal = (symbol) => {
    setSelectedStock(symbol);
    setModalType("SELL");
  };

  const containerStyle = {
    backgroundColor: colors.background,
    minHeight: "100vh",
    padding: "2rem",
  };

  const searchContainerStyle = {
    marginBottom: "2rem",
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  };

  const searchInputStyle = {
    flex: 1,
    padding: "0.75rem 1rem",
    borderRadius: "6px",
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: "14px",
  };

  const countStyle = {
    color: colors.textSecondary,
    fontWeight: "600",
    fontSize: "14px",
  };

  const listContainerStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    overflow: "hidden",
  };

  const headerStyle = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
    gap: "1rem",
    padding: "1rem 1.5rem",
    backgroundColor: colors.surfaceLight,
    borderBottom: `1px solid ${colors.border}`,
    fontWeight: "600",
    fontSize: "12px",
    color: colors.textSecondary,
    textTransform: "uppercase",
  };

  const itemStyle = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
    gap: "1rem",
    padding: "1rem 1.5rem",
    borderBottom: `1px solid ${colors.border}`,
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: hoveredStock === null ? colors.surface : colors.surface,
    transition: "background-color 0.2s",
  };

  const stockNameStyle = {
    fontWeight: "600",
    color: colors.text,
    fontSize: "14px",
  };

  const priceStyle = {
    color: colors.text,
    fontWeight: "600",
  };

  const changeStyle = (isDown) => ({
    color: isDown ? colors.danger : colors.success,
    fontWeight: "600",
    fontSize: "14px",
  });

  const actionsStyle = {
    display: "flex",
    gap: "0.5rem",
  };

  const buyButtonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: colors.success,
    color: "white",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  };

  const sellButtonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: colors.danger,
    color: "white",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  };

  const removeButtonStyle = {
    padding: "0.5rem 0.75rem",
    borderRadius: "4px",
    border: `1px solid ${colors.border}`,
    backgroundColor: "transparent",
    color: colors.textSecondary,
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: colors.text, marginBottom: "1.5rem" }}>My Watchlist</h1>

      {/* Search */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search eg: INFY, TCS, HDFCBANK"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
        <span style={countStyle}>
          {filteredWatchlist.length} / {watchlist.length}
        </span>
      </div>

      {/* Watchlist Table */}
      <div style={listContainerStyle}>
        <div style={headerStyle}>
          <div>Stock</div>
          <div>Last Price</div>
          <div>Change</div>
          <div>% Change</div>
          <div>Actions</div>
        </div>

        {filteredWatchlist.length > 0 ? (
          filteredWatchlist.map((stock) => (
            <div
              key={stock.name}
              style={{
                ...itemStyle,
                backgroundColor:
                  hoveredStock === stock.name ? colors.surfaceLight : colors.surface,
              }}
              onMouseEnter={() => setHoveredStock(stock.name)}
              onMouseLeave={() => setHoveredStock(null)}
            >
              <div style={stockNameStyle}>{stock.name}</div>
              <div style={priceStyle}>₹{stock.price}</div>
              <div style={changeStyle(stock.isDown)}>
                {stock.isDown ? "−" : "+"}₹{Math.abs(stock.change)}
              </div>
              <div style={changeStyle(stock.isDown)}>
                {stock.isDown ? "−" : "+"}
                {Math.abs(stock.changePercent)}%
              </div>
              <div style={actionsStyle}>
                <button
                  onClick={() => openBuyModal(stock.name)}
                  style={buyButtonStyle}
                >
                  Buy
                </button>
                <button
                  onClick={() => openSellModal(stock.name)}
                  style={sellButtonStyle}
                >
                  Sell
                </button>
                <button
                  onClick={() => removeFromWatchlist(stock.name)}
                  style={removeButtonStyle}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: "2rem", textAlign: "center", color: colors.textSecondary }}>
            No stocks found
          </div>
        )}
      </div>

      {/* Buy/Sell Modal */}
      {selectedStock && (
        <BuySellModal
          symbol={selectedStock}
          type={modalType}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </div>
  );
};

export default Watchlist;
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { StockPrice } from "./StockPrice";
import { StockChart } from "./StockChart";
import { BuySellModal } from "./BuySellModal";

const POPULAR_STOCKS = ["INFY", "TCS", "HDFCBANK", "WIPRO", "RELIANCE", "BAJAJ", "LT", "MARUTI", "SBIN", "KOTAKBANK"];

export const StockSearch = () => {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [modalType, setModalType] = useState("BUY");
  const [showModal, setShowModal] = useState(false);

  const filteredStocks = searchTerm
    ? POPULAR_STOCKS.filter((stock) =>
        stock.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : POPULAR_STOCKS;

  const openBuyModal = (stock) => {
    setSelectedStock(stock);
    setModalType("BUY");
    setShowModal(true);
  };

  const openSellModal = (stock) => {
    setSelectedStock(stock);
    setModalType("SELL");
    setShowModal(true);
  };

  const containerStyle = {
    backgroundColor: colors.background,
    minHeight: "100vh",
    padding: "2rem",
  };

  const searchContainerStyle = {
    marginBottom: "2rem",
  };

  const searchInputStyle = {
    width: "100%",
    padding: "1rem",
    borderRadius: "8px",
    border: `2px solid ${colors.border}`,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: "16px",
    boxSizing: "border-box",
  };

  const resultsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
  };

  const stockCardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "1.5rem",
    cursor: "pointer",
    transition: "all 0.3s",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: colors.text,
    marginBottom: "1rem",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
  };

  const buyButtonStyle = {
    flex: 1,
    padding: "0.75rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: colors.success,
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  };

  const sellButtonStyle = {
    flex: 1,
    padding: "0.75rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: colors.danger,
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: colors.text, marginBottom: "2rem" }}>Search Stocks</h1>

      {/* Search Input */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search stock by symbol (e.g., INFY, TCS, HDFCBANK)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
          autoFocus
        />
      </div>

      {/* Results */}
      {filteredStocks.length > 0 ? (
        <div>
          <p style={{ color: colors.textSecondary, marginBottom: "1.5rem" }}>
            Found {filteredStocks.length} stock(s)
          </p>
          <div style={resultsContainerStyle}>
            {filteredStocks.map((stock) => (
              <div key={stock} style={stockCardStyle}>
                <div style={titleStyle}>{stock}</div>
                <StockPrice symbol={stock} />
                <div style={buttonContainerStyle}>
                  <button
                    onClick={() => openBuyModal(stock)}
                    style={buyButtonStyle}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => openSellModal(stock)}
                    style={sellButtonStyle}
                  >
                    Sell
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", color: colors.textSecondary, marginTop: "2rem" }}>
          <p>No stocks found matching "{searchTerm}"</p>
        </div>
      )}

      {/* Buy/Sell Modal */}
      {showModal && selectedStock && (
        <BuySellModal
          symbol={selectedStock}
          type={modalType}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default StockSearch;
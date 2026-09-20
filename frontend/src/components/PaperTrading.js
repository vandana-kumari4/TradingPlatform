import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export const PaperTrading = () => {
  const { colors } = useTheme();
  const [portfolio, setPortfolio] = useState({
    virtualBalance: 850000,
    totalTrades: 12,
    winRate: 58.3,
    totalProfitLoss: 150000,
    openTrades: [
      { id: 1, symbol: "INFY", type: "BUY", quantity: 100, entryPrice: 1550, current: 1650, pnl: 10000, pnlPercent: 6.45 },
      { id: 2, symbol: "TCS", type: "BUY", quantity: 50, entryPrice: 3400, current: 3380, pnl: -1000, pnlPercent: -0.59 },
    ],
    closedTrades: [
      { id: 3, symbol: "WIPRO", type: "BUY", quantity: 200, entryPrice: 450, exitPrice: 480, pnl: 6000, pnlPercent: 6.67 },
      { id: 4, symbol: "RELIANCE", type: "BUY", quantity: 30, entryPrice: 2100, exitPrice: 2050, pnl: -1500, pnlPercent: -2.38 },
    ],
  });

  const [newTrade, setNewTrade] = useState({
    symbol: "INFY",
    type: "BUY",
    quantity: 1,
    entryPrice: 1550,
  });

  const [showNewTrade, setShowNewTrade] = useState(false);

  const handlePlaceTrade = () => {
    if (newTrade.quantity > 0 && newTrade.entryPrice > 0) {
      const trade = {
        id: Math.random(),
        ...newTrade,
        current: newTrade.entryPrice,
        pnl: 0,
        pnlPercent: 0,
      };
      setPortfolio({
        ...portfolio,
        openTrades: [trade, ...portfolio.openTrades],
        virtualBalance: portfolio.virtualBalance - (newTrade.quantity * newTrade.entryPrice),
        totalTrades: portfolio.totalTrades + 1,
      });
      setNewTrade({ symbol: "INFY", type: "BUY", quantity: 1, entryPrice: 1550 });
      setShowNewTrade(false);
    }
  };

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

  const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  };

  const statBoxStyle = {
    backgroundColor: colors.surfaceLight,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "1.5rem",
    textAlign: "center",
  };

  const statValueStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: "0.5rem",
  };

  const statLabelStyle = {
    color: colors.textSecondary,
    fontSize: "12px",
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
    width: "100%",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  };

  const headerCellStyle = {
    padding: "1rem",
    textAlign: "left",
    backgroundColor: colors.surfaceLight,
    fontWeight: "600",
    color: colors.text,
    borderBottom: `1px solid ${colors.border}`,
  };

  const cellStyle = {
    padding: "1rem",
    textAlign: "left",
    borderBottom: `1px solid ${colors.border}`,
    color: colors.text,
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: colors.text, marginBottom: "2rem" }}>📈 Paper Trading</h1>

      {/* Stats */}
      <div style={statsGridStyle}>
        <div style={statBoxStyle}>
          <div style={statValueStyle}>₹{portfolio.virtualBalance.toLocaleString()}</div>
          <div style={statLabelStyle}>Virtual Balance</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statValueStyle}>{portfolio.totalTrades}</div>
          <div style={statLabelStyle}>Total Trades</div>
        </div>
        <div style={statBoxStyle}>
          <div style={{ ...statValueStyle, color: colors.success }}>+{portfolio.winRate}%</div>
          <div style={statLabelStyle}>Win Rate</div>
        </div>
        <div style={statBoxStyle}>
          <div style={{ ...statValueStyle, color: colors.success }}>+₹{portfolio.totalProfitLoss.toLocaleString()}</div>
          <div style={statLabelStyle}>Total Profit</div>
        </div>
      </div>

      {/* Place New Trade */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ color: colors.text, margin: 0 }}>Place Paper Trade</h2>
          <button
            onClick={() => setShowNewTrade(!showNewTrade)}
            style={{ ...buttonStyle, width: "auto", padding: "0.5rem 1rem" }}
          >
            {showNewTrade ? "Cancel" : "+ New Trade"}
          </button>
        </div>

        {showNewTrade && (
          <div style={{ backgroundColor: colors.surfaceLight, padding: "1.5rem", borderRadius: "8px" }}>
            <label style={{ color: colors.textSecondary, fontSize: "12px", fontWeight: "600" }}>Stock</label>
            <select
              value={newTrade.symbol}
              onChange={(e) => setNewTrade({ ...newTrade, symbol: e.target.value })}
              style={selectStyle}
            >
              <option>INFY</option>
              <option>TCS</option>
              <option>HDFCBANK</option>
              <option>WIPRO</option>
              <option>RELIANCE</option>
            </select>

            <label style={{ color: colors.textSecondary, fontSize: "12px", fontWeight: "600" }}>Type</label>
            <select
              value={newTrade.type}
              onChange={(e) => setNewTrade({ ...newTrade, type: e.target.value })}
              style={selectStyle}
            >
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>

            <label style={{ color: colors.textSecondary, fontSize: "12px", fontWeight: "600" }}>Quantity</label>
            <input
              type="number"
              value={newTrade.quantity}
              onChange={(e) => setNewTrade({ ...newTrade, quantity: parseInt(e.target.value) || 1 })}
              style={inputStyle}
            />

            <label style={{ color: colors.textSecondary, fontSize: "12px", fontWeight: "600" }}>Entry Price (₹)</label>
            <input
              type="number"
              value={newTrade.entryPrice}
              onChange={(e) => setNewTrade({ ...newTrade, entryPrice: parseFloat(e.target.value) || 0 })}
              style={inputStyle}
            />

            <button onClick={handlePlaceTrade} style={buttonStyle}>
              Place Trade
            </button>
          </div>
        )}
      </div>

      {/* Open Trades */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>📊 Open Trades ({portfolio.openTrades.length})</h2>
        {portfolio.openTrades.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={headerCellStyle}>Symbol</th>
                  <th style={headerCellStyle}>Type</th>
                  <th style={headerCellStyle}>Quantity</th>
                  <th style={headerCellStyle}>Entry Price</th>
                  <th style={headerCellStyle}>Current</th>
                  <th style={headerCellStyle}>P&L</th>
                  <th style={headerCellStyle}>%</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.openTrades.map((trade) => (
                  <tr key={trade.id}>
                    <td style={cellStyle}><strong>{trade.symbol}</strong></td>
                    <td style={cellStyle}>{trade.type === "BUY" ? "📈" : "📉"} {trade.type}</td>
                    <td style={cellStyle}>{trade.quantity}</td>
                    <td style={cellStyle}>₹{trade.entryPrice}</td>
                    <td style={cellStyle}>₹{trade.current}</td>
                    <td style={{ ...cellStyle, color: trade.pnl > 0 ? colors.success : colors.danger, fontWeight: "600" }}>
                      {trade.pnl > 0 ? "+" : ""}₹{trade.pnl.toLocaleString()}
                    </td>
                    <td style={{ ...cellStyle, color: trade.pnlPercent > 0 ? colors.success : colors.danger, fontWeight: "600" }}>
                      {trade.pnlPercent > 0 ? "+" : ""}{trade.pnlPercent.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: colors.textSecondary, textAlign: "center", padding: "2rem" }}>No open trades</p>
        )}
      </div>

      {/* Closed Trades */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>✅ Closed Trades ({portfolio.closedTrades.length})</h2>
        {portfolio.closedTrades.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={headerCellStyle}>Symbol</th>
                  <th style={headerCellStyle}>Type</th>
                  <th style={headerCellStyle}>Quantity</th>
                  <th style={headerCellStyle}>Entry</th>
                  <th style={headerCellStyle}>Exit</th>
                  <th style={headerCellStyle}>P&L</th>
                  <th style={headerCellStyle}>%</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.closedTrades.map((trade) => (
                  <tr key={trade.id}>
                    <td style={cellStyle}><strong>{trade.symbol}</strong></td>
                    <td style={cellStyle}>{trade.type === "BUY" ? "📈" : "📉"} {trade.type}</td>
                    <td style={cellStyle}>{trade.quantity}</td>
                    <td style={cellStyle}>₹{trade.entryPrice}</td>
                    <td style={cellStyle}>₹{trade.exitPrice}</td>
                    <td style={{ ...cellStyle, color: trade.pnl > 0 ? colors.success : colors.danger, fontWeight: "600" }}>
                      {trade.pnl > 0 ? "+" : ""}₹{trade.pnl.toLocaleString()}
                    </td>
                    <td style={{ ...cellStyle, color: trade.pnlPercent > 0 ? colors.success : colors.danger, fontWeight: "600" }}>
                      {trade.pnlPercent > 0 ? "+" : ""}{trade.pnlPercent.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: colors.textSecondary, textAlign: "center", padding: "2rem" }}>No closed trades</p>
        )}
      </div>
    </div>
  );
};

export default PaperTrading;
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export const Leaderboard = () => {
  const { colors } = useTheme();
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: "Vandana Kumari", avatar: "👩‍💻", portfolio: { totalReturns: 125000, totalValue: 5500000 }, city: "Jaipur" },
    { rank: 2, name: "Arjun Singh", avatar: "👨‍💼", portfolio: { totalReturns: 95000, totalValue: 4200000 }, city: "Mumbai" },
    { rank: 3, name: "Priya Sharma", avatar: "👩‍🔬", portfolio: { totalReturns: 87500, totalValue: 3800000 }, city: "Bangalore" },
    { rank: 4, name: "Rajesh Patel", avatar: "👨‍🏫", portfolio: { totalReturns: 65000, totalValue: 3200000 }, city: "Delhi" },
    { rank: 5, name: "Neha Gupta", avatar: "👩‍💼", portfolio: { totalReturns: 58000, totalValue: 2900000 }, city: "Pune" },
    { rank: 6, name: "Vikram Kumar", avatar: "👨‍💻", portfolio: { totalReturns: 45000, totalValue: 2500000 }, city: "Hyderabad" },
    { rank: 7, name: "Anjali Desai", avatar: "👩‍🎓", portfolio: { totalReturns: 38000, totalValue: 2100000 }, city: "Chennai" },
    { rank: 8, name: "Rohan Nair", avatar: "👨‍🎨", portfolio: { totalReturns: 32000, totalValue: 1800000 }, city: "Kolkata" },
    { rank: 9, name: "Sneha Roy", avatar: "👩‍⚕️", portfolio: { totalReturns: 28000, totalValue: 1600000 }, city: "Ahmedabad" },
    { rank: 10, name: "Aditya Singh", avatar: "👨‍⚖️", portfolio: { totalReturns: 22000, totalValue: 1400000 }, city: "Lucknow" },
  ]);

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

  const medalStyle = {
    display: "inline-block",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginRight: "0.5rem",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: colors.text, marginBottom: "2rem" }}>🏆 Leaderboard</h1>

      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>Top 10 Traders</h2>
        <p style={{ color: colors.textSecondary, marginBottom: "1.5rem" }}>
          Ranked by total portfolio returns
        </p>

        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Rank</th>
                <th style={headerCellStyle}>Trader</th>
                <th style={headerCellStyle}>City</th>
                <th style={headerCellStyle}>Portfolio Value</th>
                <th style={headerCellStyle}>Total Returns</th>
                <th style={headerCellStyle}>Return %</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((trader) => (
                <tr key={trader.rank}>
                  <td style={cellStyle}>
                    {trader.rank === 1 && (
                      <span style={{ ...medalStyle, backgroundColor: "#FFD700" }}>🥇</span>
                    )}
                    {trader.rank === 2 && (
                      <span style={{ ...medalStyle, backgroundColor: "#C0C0C0" }}>🥈</span>
                    )}
                    {trader.rank === 3 && (
                      <span style={{ ...medalStyle, backgroundColor: "#CD7F32" }}>🥉</span>
                    )}
                    {trader.rank > 3 && <span style={{ fontWeight: "600" }}>#{trader.rank}</span>}
                  </td>
                  <td style={cellStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "24px" }}>{trader.avatar}</span>
                      <strong>{trader.name}</strong>
                    </div>
                  </td>
                  <td style={cellStyle}>📍 {trader.city}</td>
                  <td style={cellStyle}>₹{trader.portfolio.totalValue.toLocaleString()}</td>
                  <td style={{ ...cellStyle, color: colors.success, fontWeight: "600" }}>
                    ₹{trader.portfolio.totalReturns.toLocaleString()}
                  </td>
                  <td style={{ ...cellStyle, color: colors.success, fontWeight: "600" }}>
                    +{((trader.portfolio.totalReturns / trader.portfolio.totalValue) * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Your Rank */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>📊 Your Ranking</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          <div style={{ backgroundColor: colors.surfaceLight, padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "32px", color: colors.primary, fontWeight: "bold" }}>🥇</div>
            <div style={{ color: colors.textSecondary, fontSize: "12px", marginTop: "0.5rem" }}>Your Rank</div>
            <div style={{ fontSize: "24px", color: colors.text, fontWeight: "bold", marginTop: "0.5rem" }}>#1</div>
          </div>
          <div style={{ backgroundColor: colors.surfaceLight, padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "32px", color: colors.success }}>📈</div>
            <div style={{ color: colors.textSecondary, fontSize: "12px", marginTop: "0.5rem" }}>Your Returns</div>
            <div style={{ fontSize: "24px", color: colors.text, fontWeight: "bold", marginTop: "0.5rem" }}>₹125000</div>
          </div>
          <div style={{ backgroundColor: colors.surfaceLight, padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "32px", color: colors.primary }}>🎯</div>
            <div style={{ color: colors.textSecondary, fontSize: "12px", marginTop: "0.5rem" }}>Return %</div>
            <div style={{ fontSize: "24px", color: colors.text, fontWeight: "bold", marginTop: "0.5rem" }}>+2.27%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
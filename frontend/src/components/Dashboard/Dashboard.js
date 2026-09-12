import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { hybridHoldingsAPI, hybridOrdersAPI, hybridPositionsAPI } from "../../services/hybridDataService";

export const Dashboard = () => {
  const { colors } = useTheme();
  const [holdings, setHoldings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  const portfolioData = {
    totalValue: 450000,
    dayChange: 2500,
    dayChangePercent: 0.56,
    cashAvailable: 50000,
    investedValue: 400000,
    returns: 12500,
    returnsPercent: 3.22,
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [holdingsData, ordersData, positionsData] = await Promise.all([
        hybridHoldingsAPI.getAll(),
        hybridOrdersAPI.getAll(),
        hybridPositionsAPI.getAll(),
      ]);

      if (holdingsData.success) setHoldings(holdingsData.data);
      if (ordersData.success) setOrders(ordersData.data);
      if (positionsData.success) setPositions(positionsData.data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    backgroundColor: colors.background,
    minHeight: "100vh",
    padding: "2rem",
  };

  const portfolioCardStyle = {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary}dd 100%)`,
    color: "white",
    borderRadius: "12px",
    padding: "2rem",
    marginBottom: "2rem",
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
  };

  const cellStyle = {
    padding: "1rem",
    textAlign: "left",
    borderBottom: `1px solid ${colors.border}`,
    fontSize: "14px",
  };

  if (loading) {
    return <div style={containerStyle}>Loading dashboard...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ color: colors.text, marginBottom: "2rem" }}>Portfolio</h1>

      <div style={portfolioCardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>Total Portfolio Value</div>
            <div style={{ fontSize: "32px", fontWeight: "bold", margin: "0.5rem 0" }}>
              ₹{portfolioData.totalValue.toLocaleString()}
            </div>
            <div style={{ fontSize: "14px" }}>
              +₹{portfolioData.dayChange.toLocaleString()} ({portfolioData.dayChangePercent}%) Today
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>Total Returns</div>
            <div style={{ fontSize: "28px", fontWeight: "bold", margin: "0.5rem 0" }}>
              ₹{portfolioData.returns.toLocaleString()}
            </div>
            <div style={{ fontSize: "14px" }}>+{portfolioData.returnsPercent.toFixed(2)}%</div>
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>Your Holdings</h2>
        {holdings.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead style={{ backgroundColor: colors.surfaceLight }}>
                <tr>
                  <th style={cellStyle}>Stock</th>
                  <th style={cellStyle}>Qty</th>
                  <th style={cellStyle}>Avg</th>
                  <th style={cellStyle}>Price</th>
                  <th style={cellStyle}>Gain/Loss</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h) => (
                  <tr key={h._id}>
                    <td style={cellStyle}><strong>{h.name}</strong></td>
                    <td style={cellStyle}>{h.qty}</td>
                    <td style={cellStyle}>₹{h.avg}</td>
                    <td style={cellStyle}>₹{h.price}</td>
                    <td style={{
                      ...cellStyle,
                      color: (h.price - h.avg) >= 0 ? colors.success : colors.danger,
                      fontWeight: "600",
                    }}>
                      {(h.price - h.avg) >= 0 ? "+" : ""}₹{(h.price - h.avg).toFixed(2)} ({h.net})
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ color: colors.textSecondary }}>No holdings yet</div>
        )}
      </div>

      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>Recent Orders</h2>
        {orders.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead style={{ backgroundColor: colors.surfaceLight }}>
                <tr>
                  <th style={cellStyle}>Stock</th>
                  <th style={cellStyle}>Type</th>
                  <th style={cellStyle}>Qty</th>
                  <th style={cellStyle}>Price</th>
                  <th style={cellStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td style={cellStyle}><strong>{o.name}</strong></td>
                    <td style={{
                      ...cellStyle,
                      color: o.mode === "BUY" ? colors.success : colors.danger,
                      fontWeight: "600",
                    }}>{o.mode}</td>
                    <td style={cellStyle}>{o.qty}</td>
                    <td style={cellStyle}>₹{o.price}</td>
                    <td style={cellStyle}>
                      <span style={{
                        backgroundColor: o.status === "COMPLETED" ? colors.success : colors.warning,
                        color: "white",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        fontSize: "12px",
                      }}>{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ color: colors.textSecondary }}>No orders yet</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export const Notifications = () => {
  const { colors } = useTheme();
  const [alerts, setAlerts] = useState([
    { id: 1, symbol: "INFY", targetPrice: 1600, condition: "above", createdAt: "2 days ago", status: "Active" },
    { id: 2, symbol: "TCS", targetPrice: 3200, condition: "below", createdAt: "5 days ago", status: "Active" },
    { id: 3, symbol: "HDFCBANK", targetPrice: 1700, condition: "above", createdAt: "1 week ago", status: "Triggered" },
  ]);

  const [newAlert, setNewAlert] = useState({
    symbol: "INFY",
    targetPrice: 1600,
    condition: "above",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderFilled: true,
    priceAlert: true,
    dailySummary: true,
    newsUpdate: false,
  });

  const [showAddAlert, setShowAddAlert] = useState(false);

  const handleAddAlert = () => {
    if (newAlert.targetPrice > 0) {
      const alert = {
        id: Math.random(),
        ...newAlert,
        createdAt: "just now",
        status: "Active",
      };
      setAlerts([alert, ...alerts]);
      setNewAlert({ symbol: "INFY", targetPrice: 1600, condition: "above" });
      setShowAddAlert(false);
    }
  };

  const handleDeleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
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

  const toggleStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const toggleSwitch = (checked) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => {}}
      style={{
        width: "20px",
        height: "20px",
        cursor: "pointer",
      }}
    />
  );

  return (
    <div style={containerStyle}>
      <h1 style={{ color: colors.text, marginBottom: "2rem" }}>🔔 Notifications & Alerts</h1>

      {/* Notification Settings */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1.5rem" }}>📧 Email Preferences</h2>
        
        <div style={{ display: "grid", gap: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", backgroundColor: colors.surfaceLight, borderRadius: "8px" }}>
            <div>
              <h3 style={{ color: colors.text, margin: 0 }}>Order Filled Alerts</h3>
              <p style={{ color: colors.textSecondary, margin: "0.5rem 0 0 0", fontSize: "12px" }}>Get notified when your orders are executed</p>
            </div>
            <input
              type="checkbox"
              checked={notificationSettings.orderFilled}
              onChange={(e) => setNotificationSettings({ ...notificationSettings, orderFilled: e.target.checked })}
              style={{ width: "24px", height: "24px", cursor: "pointer" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", backgroundColor: colors.surfaceLight, borderRadius: "8px" }}>
            <div>
              <h3 style={{ color: colors.text, margin: 0 }}>Price Alerts</h3>
              <p style={{ color: colors.textSecondary, margin: "0.5rem 0 0 0", fontSize: "12px" }}>Notifications when stocks hit your target prices</p>
            </div>
            <input
              type="checkbox"
              checked={notificationSettings.priceAlert}
              onChange={(e) => setNotificationSettings({ ...notificationSettings, priceAlert: e.target.checked })}
              style={{ width: "24px", height: "24px", cursor: "pointer" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", backgroundColor: colors.surfaceLight, borderRadius: "8px" }}>
            <div>
              <h3 style={{ color: colors.text, margin: 0 }}>Daily Market Summary</h3>
              <p style={{ color: colors.textSecondary, margin: "0.5rem 0 0 0", fontSize: "12px" }}>Daily recap of market performance and your portfolio</p>
            </div>
            <input
              type="checkbox"
              checked={notificationSettings.dailySummary}
              onChange={(e) => setNotificationSettings({ ...notificationSettings, dailySummary: e.target.checked })}
              style={{ width: "24px", height: "24px", cursor: "pointer" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", backgroundColor: colors.surfaceLight, borderRadius: "8px" }}>
            <div>
              <h3 style={{ color: colors.text, margin: 0 }}>News Updates</h3>
              <p style={{ color: colors.textSecondary, margin: "0.5rem 0 0 0", fontSize: "12px" }}>Important market news and company announcements</p>
            </div>
            <input
              type="checkbox"
              checked={notificationSettings.newsUpdate}
              onChange={(e) => setNotificationSettings({ ...notificationSettings, newsUpdate: e.target.checked })}
              style={{ width: "24px", height: "24px", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      {/* Price Alerts */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ color: colors.text, margin: 0 }}>📊 Price Alerts</h2>
          <button
            onClick={() => setShowAddAlert(!showAddAlert)}
            style={{ ...buttonStyle, width: "auto", padding: "0.5rem 1rem" }}
          >
            {showAddAlert ? "Cancel" : "+ Add Alert"}
          </button>
        </div>

        {showAddAlert && (
          <div style={{ backgroundColor: colors.surfaceLight, padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
            <label style={{ color: colors.textSecondary, fontSize: "12px", fontWeight: "600" }}>Stock</label>
            <select
              value={newAlert.symbol}
              onChange={(e) => setNewAlert({ ...newAlert, symbol: e.target.value })}
              style={selectStyle}
            >
              <option>INFY</option>
              <option>TCS</option>
              <option>HDFCBANK</option>
              <option>WIPRO</option>
              <option>RELIANCE</option>
            </select>

            <label style={{ color: colors.textSecondary, fontSize: "12px", fontWeight: "600" }}>Target Price (₹)</label>
            <input
              type="number"
              value={newAlert.targetPrice}
              onChange={(e) => setNewAlert({ ...newAlert, targetPrice: parseFloat(e.target.value) })}
              style={inputStyle}
            />

            <label style={{ color: colors.textSecondary, fontSize: "12px", fontWeight: "600" }}>Condition</label>
            <select
              value={newAlert.condition}
              onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value })}
              style={selectStyle}
            >
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>

            <button onClick={handleAddAlert} style={buttonStyle}>
              Create Alert
            </button>
          </div>
        )}

        {alerts.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={headerCellStyle}>Stock</th>
                  <th style={headerCellStyle}>Condition</th>
                  <th style={headerCellStyle}>Target Price</th>
                  <th style={headerCellStyle}>Status</th>
                  <th style={headerCellStyle}>Created</th>
                  <th style={headerCellStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert) => (
                  <tr key={alert.id}>
                    <td style={cellStyle}><strong>{alert.symbol}</strong></td>
                    <td style={cellStyle}>
                      {alert.condition === "above" ? "📈 Above" : "📉 Below"}
                    </td>
                    <td style={cellStyle}>₹{alert.targetPrice}</td>
                    <td style={cellStyle}>
                      <span style={{
                        backgroundColor: alert.status === "Active" ? colors.success : colors.warning,
                        color: "white",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}>
                        {alert.status}
                      </span>
                    </td>
                    <td style={cellStyle}>{alert.createdAt}</td>
                    <td style={cellStyle}>
                      <button
                        onClick={() => handleDeleteAlert(alert.id)}
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: "4px",
                          border: "none",
                          backgroundColor: colors.danger,
                          color: "white",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem", color: colors.textSecondary }}>
            No alerts created yet. Create one to get started!
          </div>
        )}
      </div>

      {/* Recent Notifications */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1.5rem" }}>📬 Recent Notifications</h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          <div style={{ backgroundColor: colors.surfaceLight, padding: "1rem", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <strong style={{ color: colors.text }}>INFY Price Alert Triggered</strong>
              <span style={{ color: colors.textSecondary, fontSize: "12px" }}>2 hours ago</span>
            </div>
            <p style={{ color: colors.textSecondary, margin: "0.5rem 0", fontSize: "14px" }}>
              ✅ INFY reached ₹1700, above your target of ₹1600
            </p>
          </div>

          <div style={{ backgroundColor: colors.surfaceLight, padding: "1rem", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <strong style={{ color: colors.text }}>Order Executed</strong>
              <span style={{ color: colors.textSecondary, fontSize: "12px" }}>Yesterday</span>
            </div>
            <p style={{ color: colors.textSecondary, margin: "0.5rem 0", fontSize: "14px" }}>
              ✅ Buy order for 10 TCS shares @ ₹3400 executed
            </p>
          </div>

          <div style={{ backgroundColor: colors.surfaceLight, padding: "1rem", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <strong style={{ color: colors.text }}>Daily Market Summary</strong>
              <span style={{ color: colors.textSecondary, fontSize: "12px" }}>2 days ago</span>
            </div>
            <p style={{ color: colors.textSecondary, margin: "0.5rem 0", fontSize: "14px" }}>
              📊 Your portfolio is up +2.27% today. Market performing well.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
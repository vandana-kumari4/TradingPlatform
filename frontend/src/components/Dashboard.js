import React from "react";
import { useTheme } from "../context/ThemeContext";
import { holdingsAPI, ordersAPI, positionsAPI } from "../services/api";
import { TrendingUp, TrendingDown, Eye, EyeOff } from "lucide-react";

export const Dashboard = () => {
  const { colors } = useTheme();
  const [holdings, setHoldings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);

  // Sample portfolio data (replace with real data from API)
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
        holdingsAPI.getAll(),
        ordersAPI.getAll(),
        positionsAPI.getAll(),
      ]);

      if (holdingsData.success) setHoldings(holdingsData.data);
      if (ordersData.success) setOrders(ordersData.data);
      if (positionsData.success) setPositions(positionsData.data);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    backgroundColor: colors.background,
    color: colors.text,
    minHeight: "100vh",
    padding: "2rem",
  };

  const headerStyle = {
    marginBottom: "2rem",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: colors.text,
  };

  const subtitleStyle = {
    fontSize: "14px",
    color: colors.textSecondary,
  };

  const summaryGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  };

  const cardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "1.5rem",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const portfolioCardStyle = {
    ...cardStyle,
    gridColumn: "1 / -1",
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary}dd 100%)`,
    color: "white",
    border: "none",
  };

  const cardValueStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    marginTop: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  };

  const cardLabelStyle = {
    fontSize: "12px",
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "0.5rem",
  };

  const changeStyle = (isPositive) => ({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "0.75rem",
    color: isPositive ? colors.success : colors.danger,
    fontSize: "14px",
    fontWeight: "600",
  });

  const statsStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    marginTop: "1.5rem",
  };

  const statItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "1rem",
    borderBottom: `1px solid ${colors.border}`,
  };

  const statLabelStyle = {
    color: colors.textSecondary,
    fontSize: "12px",
  };

  const statValueStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: colors.text,
  };

  const sectionStyle = {
    marginBottom: "2rem",
  };

  const sectionTitleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    color: colors.text,
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const tableHeaderStyle = {
    backgroundColor: colors.surfaceLight,
    color: colors.textSecondary,
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    borderBottom: `1px solid ${colors.border}`,
  };

  const tableRowStyle = {
    borderBottom: `1px solid ${colors.border}`,
    transition: "background 0.3s ease",
  };

  const tableCellStyle = {
    padding: "1rem",
    textAlign: "left",
    fontSize: "14px",
  };

  const actionButtonStyle = {
    backgroundColor: colors.primary,
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "18px",
            color: colors.textSecondary,
          }}
        >
          Loading your portfolio...
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>Portfolio</div>
        <div style={subtitleStyle}>
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Portfolio Summary Card */}
      <div style={portfolioCardStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            marginBottom: "2rem",
          }}
        >
          <div>
            <div style={cardLabelStyle}>Total Portfolio Value</div>
            <div style={cardValueStyle}>
              {showBalance ? (
                formatCurrency(portfolioData.totalValue)
              ) : (
                <span style={{ fontSize: "24px" }}>••••••</span>
              )}
              <button
                onClick={() => setShowBalance(!showBalance)}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  padding: 0,
                  marginTop: "-0.5rem",
                }}
              >
                {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            <div
              style={{
                ...changeStyle(portfolioData.dayChangePercent >= 0),
              }}
            >
              {portfolioData.dayChangePercent >= 0 ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              {formatCurrency(portfolioData.dayChange)} (
              {portfolioData.dayChangePercent.toFixed(2)}%) Today
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={cardLabelStyle}>Total Returns</div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              {formatCurrency(portfolioData.returns)}
            </div>
            <div style={{ fontSize: "12px", marginTop: "0.5rem" }}>
              +{portfolioData.returnsPercent.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={statsStyle}>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Invested Value</span>
            <span style={statValueStyle}>
              {formatCurrency(portfolioData.investedValue)}
            </span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Cash Available</span>
            <span style={statValueStyle}>
              {formatCurrency(portfolioData.cashAvailable)}
            </span>
          </div>
        </div>
      </div>

      {/* Holdings Section */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Your Holdings</div>
        {holdings.length > 0 ? (
          <div
            style={{
              ...cardStyle,
              padding: 0,
              overflow: "auto",
            }}
          >
            <table style={tableStyle}>
              <thead>
                <tr style={tableHeaderStyle}>
                  <td style={tableCellStyle}>Stock</td>
                  <td style={tableCellStyle}>Quantity</td>
                  <td style={tableCellStyle}>Avg Price</td>
                  <td style={tableCellStyle}>Current</td>
                  <td style={tableCellStyle}>Gain/Loss</td>
                  <td style={tableCellStyle}>Action</td>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => (
                  <tr
                    key={holding._id}
                    style={tableRowStyle}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = colors.hover)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <td style={tableCellStyle}>
                      <div style={{ fontWeight: "600" }}>{holding.name}</div>
                    </td>
                    <td style={tableCellStyle}>{holding.qty}</td>
                    <td style={tableCellStyle}>₹{holding.avg}</td>
                    <td style={tableCellStyle}>₹{holding.price}</td>
                    <td
                      style={{
                        ...tableCellStyle,
                        color:
                          (holding.price - holding.avg) >= 0
                            ? colors.success
                            : colors.danger,
                      }}
                    >
                      {(holding.price - holding.avg) >= 0 ? "+" : ""}
                      ₹{(holding.price - holding.avg).toFixed(2)} ({holding.net}%)
                    </td>
                    <td style={tableCellStyle}>
                      <button
                        style={actionButtonStyle}
                        onMouseEnter={(e) => (e.currentTarget.opacity = "0.8")}
                        onMouseLeave={(e) => (e.currentTarget.opacity = "1")}
                      >
                        Sell
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            style={{
              ...cardStyle,
              textAlign: "center",
              padding: "3rem",
              color: colors.textSecondary,
            }}
          >
            No holdings yet. Start by buying stocks!
          </div>
        )}
      </div>

      {/* Recent Orders Section */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Recent Orders</div>
        {orders.length > 0 ? (
          <div
            style={{
              ...cardStyle,
              padding: 0,
              overflow: "auto",
            }}
          >
            <table style={tableStyle}>
              <thead>
                <tr style={tableHeaderStyle}>
                  <td style={tableCellStyle}>Stock</td>
                  <td style={tableCellStyle}>Type</td>
                  <td style={tableCellStyle}>Quantity</td>
                  <td style={tableCellStyle}>Price</td>
                  <td style={tableCellStyle}>Status</td>
                  <td style={tableCellStyle}>Date</td>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr
                    key={order._id}
                    style={tableRowStyle}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = colors.hover)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <td style={tableCellStyle}>{order.name}</td>
                    <td
                      style={{
                        ...tableCellStyle,
                        color:
                          order.mode === "BUY" ? colors.success : colors.danger,
                        fontWeight: "600",
                      }}
                    >
                      {order.mode}
                    </td>
                    <td style={tableCellStyle}>{order.qty}</td>
                    <td style={tableCellStyle}>₹{order.price}</td>
                    <td style={tableCellStyle}>
                      <span
                        style={{
                          backgroundColor:
                            order.status === "COMPLETED"
                              ? colors.success
                              : order.status === "PENDING"
                              ? colors.warning
                              : colors.danger,
                          color: "white",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td style={tableCellStyle}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            style={{
              ...cardStyle,
              textAlign: "center",
              padding: "3rem",
              color: colors.textSecondary,
            }}
          >
            No orders yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
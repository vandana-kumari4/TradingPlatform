import React, { useState } from "react";
import designSystemV2 from "../../styles/designSystemV2";
import { Badge } from "../UIV2";
import { useHoldings } from "../../hooks/useHoldings";
import { useOrders } from "../../hooks/useOrders";
import { TrendingUp, TrendingDown, Plus, BarChart3, Search } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardV2Professional = () => {
  const { colors, spacing, typography, radius, shadow } = designSystemV2;
  const { holdings, loading: holdingsLoading } = useHoldings();
  const { orders, loading: ordersLoading } = useOrders();

  const [timeframe, setTimeframe] = useState("1M");
  const [activeTab, setActiveTab] = useState("gainers");

  // Performance chart data
  const performanceData = [
    { date: "1 Oct", value: 420000 },
    { date: "5 Oct", value: 432000 },
    { date: "10 Oct", value: 428000 },
    { date: "15 Oct", value: 440000 },
    { date: "20 Oct", value: 445000 },
    { date: "25 Oct", value: 450000 },
  ];

  // TRANSFORM HOLDINGS DATA - EXACT SAME AS HOLDINGSV2
 // TRANSFORM HOLDINGS DATA - FIX PROPERTY NAMES
const holdingsData = holdings.length > 0
    ? holdings.map(h => {
        // Handle both possible property name variations
        const quantity = h.quantity || h.qty || 0;
        const buyPrice = h.buyPrice || h.avgPrice || 0;
        const currentPrice = h.currentPrice || 0;
        
        const qty = parseFloat(quantity) || 0;
        const bPrice = parseFloat(buyPrice) || 0;
        const cPrice = parseFloat(currentPrice) || 0;
        
        const investedValue = qty * bPrice;
        const currentValue = qty * cPrice;
        const pnl = currentValue - investedValue;
        const pnlPercent = investedValue > 0 ? ((pnl / investedValue) * 100) : 0;
        
        return {
          symbol: String(h.symbol || h.name || "N/A"),
          value: isNaN(currentValue) ? 0 : currentValue,
          gainLoss: isNaN(pnl) ? 0 : pnl,
          gainLossPercent: isNaN(pnlPercent) ? 0 : pnlPercent,
        };
      })
    : [];

  // Real data from Holdings
  const totalPortfolioValue = holdings.reduce((sum, h) => {
    return sum + ((Number(h.quantity) || 0) * (Number(h.currentPrice) || 0));
  }, 0) || 278250;

  const totalCost = holdings.reduce((sum, h) => {
    return sum + ((Number(h.quantity) || 0) * (Number(h.buyPrice) || 0));
  }, 0) || 268000;

  const totalGainLoss = totalPortfolioValue - totalCost;
  const totalGainLossPercent = totalCost > 0 ? ((totalGainLoss / totalCost) * 100) : 0.74;

  // Today's P&L from Orders
  const todaysOrders = orders.filter(o => {
    const orderDate = new Date(o.createdAt);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  });
  const todaysPnL = todaysOrders.reduce((sum, o) => sum + (o.profitLoss || 0), 0) || 2345;

  // Recent orders for display
  const recentOrders = orders.length > 0
    ? orders.slice(0, 10).map(o => ({
        symbol: o.symbol || "N/A",
        type: o.type || "BUY",
        qty: o.quantity || 0,
        price: o.price || 0,
        status: o.status || "Pending",
        time: o.createdAt ? new Date(o.createdAt).toLocaleTimeString() : "N/A",
      }))
    : [];

  // Market data (mock)
  const marketData = [
    { name: "NIFTY 50", value: 23450, changePercent: 0.54 },
    { name: "SENSEX", value: 76540, changePercent: -0.23 },
    { name: "BANK NIFTY", value: 48320, changePercent: 0.58 },
    { name: "NIFTY IT", value: 31240, changePercent: 1.36 },
  ];

  const watchlistData = [
    { symbol: "INFY", price: 1550, changePercent: 1.64 },
    { symbol: "TCS", price: 3400, changePercent: -1.31 },
    { symbol: "WIPRO", price: 450, changePercent: 4.65 },
    { symbol: "HDFCBANK", price: 1550, changePercent: -1.90 },
    { symbol: "RELIANCE", price: 2100, changePercent: 2.44 },
  ];

  const gainersData = [
    { symbol: "SUNPHARMA", change: 4.52 },
    { symbol: "BAJAJFINSV", change: 3.89 },
    { symbol: "MARUTI", change: 3.21 },
  ];

  const losersData = [
    { symbol: "SBILIFE", change: -2.43 },
    { symbol: "ASIANPAINT", change: -2.15 },
    { symbol: "BHARTIARTL", change: -1.98 },
  ];

  // STYLES
  const containerStyle = {
    backgroundColor: colors.bg,
    minHeight: "100vh",
    padding: spacing.xl,
  };

  const contentStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
  };

  const headerStyle = {
    marginBottom: spacing["2xl"],
  };

  const greetingStyle = {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    fontSize: "32px",
  };

  const subtitleStyle = {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  };

  const statusStyle = {
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
    ...typography.bodySmall,
    color: colors.success,
    fontWeight: 600,
  };

  const statusDotStyle = {
    width: "8px",
    height: "8px",
    backgroundColor: colors.success,
    borderRadius: "50%",
  };

  const summaryGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: spacing.lg,
    marginBottom: spacing["2xl"],
  };

  const cardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    boxShadow: shadow.xs,
  };

  const cardLabelStyle = {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    display: "block",
  };

  const cardValueStyle = {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    fontSize: "24px",
  };

  const cardChangeStyle = (isPositive) => ({
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
    ...typography.bodySmall,
    color: isPositive ? colors.success : colors.error,
    fontWeight: 600,
  });

  const chartCardStyle = {
    ...cardStyle,
    marginBottom: spacing.lg,
  };

  const chartHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottom: `1px solid ${colors.border}`,
  };

  const timeframeButtonsStyle = {
    display: "flex",
    gap: spacing.sm,
    flexWrap: "wrap",
  };

  const timeframeButtonStyle = (active) => ({
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: active ? colors.primary : "transparent",
    color: active ? "white" : colors.textSecondary,
    border: `1px solid ${active ? colors.primary : colors.border}`,
    borderRadius: radius.md,
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 600,
    fontFamily: typography.fontFamily,
    transition: "all 200ms",
  });

  const twoColGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: spacing.lg,
    marginBottom: spacing.lg,
  };

  const marketGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: spacing.lg,
  };

  const marketItemStyle = {
    ...cardStyle,
    padding: spacing.md,
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const tableHeaderStyle = {
    backgroundColor: colors.bgSecondary,
    borderBottom: `1px solid ${colors.border}`,
  };

  const tableHeaderCellStyle = {
    padding: `${spacing.md} ${spacing.lg}`,
    textAlign: "left",
    ...typography.label,
    color: colors.textSecondary,
    fontWeight: 600,
  };

  const tableCellStyle = {
    padding: `${spacing.md} ${spacing.lg}`,
    borderBottom: `1px solid ${colors.border}`,
    ...typography.body,
    color: colors.textPrimary,
  };

  const tabsStyle = {
    display: "flex",
    gap: spacing.lg,
    marginBottom: spacing.lg,
    borderBottom: `1px solid ${colors.border}`,
    flexWrap: "wrap",
  };

  const tabStyle = (active) => ({
    padding: `${spacing.md} 0`,
    backgroundColor: "transparent",
    border: "none",
    borderBottom: active ? `2px solid ${colors.primary}` : "transparent",
    color: active ? colors.primary : colors.textSecondary,
    cursor: "pointer",
    fontFamily: typography.fontFamily,
    fontWeight: active ? 600 : 500,
    fontSize: "14px",
  });

  const actionGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: spacing.lg,
  };

  const actionButtonStyle = {
    ...cardStyle,
    padding: spacing.md,
    textAlign: "center",
    cursor: "pointer",
    transition: "all 200ms",
    background: "none",
    border: `1px solid ${colors.border}`,
  };

  if (holdingsLoading || ordersLoading) {
    return (
      <div style={containerStyle}>
        <div style={contentStyle}>
          <div style={{ textAlign: "center", padding: spacing.xl }}>
            <p style={{ color: colors.textSecondary }}>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h1 style={greetingStyle}>Good morning, Vandana</h1>
          <p style={subtitleStyle}>Here's your market & portfolio overview.</p>
          <div style={statusStyle}>
            <div style={statusDotStyle}></div>
            Market Open
          </div>
        </div>

        {/* SUMMARY CARDS - 4 IN ONE ROW */}
        <div style={summaryGridStyle}>
          <div style={cardStyle}>
            <label style={cardLabelStyle}>Total Portfolio Value</label>
            <div style={cardValueStyle}>₹{totalPortfolioValue.toLocaleString()}</div>
            <div style={cardChangeStyle(totalGainLoss > 0)}>
              {totalGainLoss > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{totalGainLoss > 0 ? "+" : ""}{totalGainLossPercent.toFixed(2)}%</span>
            </div>
          </div>

          <div style={cardStyle}>
            <label style={cardLabelStyle}>Today's P&L</label>
            <div style={{ ...cardValueStyle, color: todaysPnL > 0 ? colors.success : colors.error }}>
              {todaysPnL > 0 ? "+" : ""}₹{Math.abs(todaysPnL).toLocaleString()}
            </div>
            <div style={cardChangeStyle(todaysPnL > 0)}>
              {todaysPnL > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{todaysPnL > 0 ? "+" : ""}0.52%</span>
            </div>
          </div>

          <div style={cardStyle}>
            <label style={cardLabelStyle}>Overall P&L</label>
            <div style={{ ...cardValueStyle, color: totalGainLoss > 0 ? colors.success : colors.error }}>
              {totalGainLoss > 0 ? "+" : ""}₹{Math.abs(totalGainLoss).toLocaleString()}
            </div>
            <div style={cardChangeStyle(totalGainLoss > 0)}>
              {totalGainLoss > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{totalGainLoss > 0 ? "+" : ""}{totalGainLossPercent.toFixed(2)}% YTD</span>
            </div>
          </div>

          <div style={cardStyle}>
            <label style={cardLabelStyle}>Available Funds</label>
            <div style={cardValueStyle}>₹45,200</div>
            <div style={{ ...typography.bodySmall, color: colors.textSecondary }}>
              Ready to invest
            </div>
          </div>
        </div>

        {/* PERFORMANCE CHART */}
        <div style={chartCardStyle}>
          <div style={chartHeaderStyle}>
            <div style={{ ...typography.h4, color: colors.textPrimary }}>
              Portfolio Performance
            </div>
            <div style={timeframeButtonsStyle}>
              {["1D", "1W", "1M", "3M", "6M", "1Y", "ALL"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  style={timeframeButtonStyle(timeframe === tf)}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.primary} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} opacity={0.5} />
              <XAxis 
                dataKey="date" 
                stroke={colors.textTertiary} 
                style={{ fontSize: "12px" }}
                tick={{ fill: colors.textTertiary }}
              />
              <YAxis 
                stroke={colors.textTertiary} 
                style={{ fontSize: "12px" }}
                tick={{ fill: colors.textTertiary }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: radius.md,
                  boxShadow: shadow.sm,
                }}
                labelStyle={{ color: colors.textPrimary }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={colors.primary}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* MARKET OVERVIEW + WATCHLIST */}
        <div style={twoColGridStyle}>
          {/* MARKET OVERVIEW */}
          <div style={chartCardStyle}>
            <div style={{ ...typography.h4, color: colors.textPrimary, marginBottom: spacing.lg }}>
              Market Overview
            </div>
            <div style={marketGridStyle}>
              {marketData.map((item) => (
                <div key={item.name} style={marketItemStyle}>
                  <div style={{ ...typography.label, color: colors.textSecondary, marginBottom: spacing.sm }}>
                    {item.name}
                  </div>
                  <div style={{ ...typography.h4, color: colors.textPrimary }}>
                    {item.value.toLocaleString()}
                  </div>
                  <div
                    style={{
                      ...typography.bodySmall,
                      color: item.changePercent > 0 ? colors.success : colors.error,
                      marginTop: spacing.xs,
                      fontWeight: 600,
                    }}
                  >
                    {item.changePercent > 0 ? "+" : ""}{item.changePercent}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WATCHLIST */}
          <div style={chartCardStyle}>
            <div style={{ ...typography.h4, color: colors.textPrimary, marginBottom: spacing.lg }}>
              Watchlist
            </div>
            <table style={tableStyle}>
              <thead style={tableHeaderStyle}>
                <tr>
                  <th style={tableHeaderCellStyle}>Symbol</th>
                  <th style={{ ...tableHeaderCellStyle, textAlign: "right" }}>Price</th>
                  <th style={{ ...tableHeaderCellStyle, textAlign: "right" }}>Change</th>
                </tr>
              </thead>
              <tbody>
                {watchlistData.map((stock) => (
                  <tr key={stock.symbol}>
                    <td style={tableCellStyle}>{stock.symbol}</td>
                    <td style={{ ...tableCellStyle, textAlign: "right" }}>₹{stock.price}</td>
                    <td
                      style={{
                        ...tableCellStyle,
                        textAlign: "right",
                        color: stock.changePercent > 0 ? colors.success : colors.error,
                        fontWeight: 600,
                      }}
                    >
                      {stock.changePercent > 0 ? "+" : ""}{stock.changePercent}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* HOLDINGS + MARKET MOVERS */}
        <div style={twoColGridStyle}>
          {/* HOLDINGS SNAPSHOT */}
          <div style={chartCardStyle}>
            <div style={{ ...typography.h4, color: colors.textPrimary, marginBottom: spacing.lg }}>
              Holdings Snapshot ({holdings.length})
            </div>
            {holdingsData.length > 0 ? (
              <table style={tableStyle}>
                <thead style={tableHeaderStyle}>
                  <tr>
                    <th style={tableHeaderCellStyle}>Stock</th>
                    <th style={{ ...tableHeaderCellStyle, textAlign: "right" }}>Value</th>
                    <th style={{ ...tableHeaderCellStyle, textAlign: "right" }}>P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {holdingsData.map((holding, idx) => (
                    <tr key={idx}>
                      <td style={tableCellStyle}><strong>{holding.symbol}</strong></td>
                      <td style={{ ...tableCellStyle, textAlign: "right" }}>
                        ₹{holding.value.toLocaleString()}
                      </td>
                      <td
                        style={{
                          ...tableCellStyle,
                          textAlign: "right",
                          color: holding.gainLoss > 0 ? colors.success : colors.error,
                          fontWeight: 600,
                        }}
                      >
                        {holding.gainLoss > 0 ? "+" : ""}₹{Math.abs(holding.gainLoss).toLocaleString()} ({holding.gainLossPercent > 0 ? "+" : ""}{holding.gainLossPercent.toFixed(2)}%)
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: spacing.lg, textAlign: "center", color: colors.textSecondary }}>
                No holdings yet
              </div>
            )}
          </div>

          {/* MARKET MOVERS */}
          <div style={chartCardStyle}>
            <div style={{ ...typography.h4, color: colors.textPrimary, marginBottom: spacing.lg }}>
              Market Movers
            </div>
            <div style={tabsStyle}>
              {["gainers", "losers"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={tabStyle(activeTab === tab)}
                >
                  {tab === "gainers" ? "Top Gainers" : "Top Losers"}
                </button>
              ))}
            </div>
            <table style={tableStyle}>
              <thead style={tableHeaderStyle}>
                <tr>
                  <th style={tableHeaderCellStyle}>Symbol</th>
                  <th style={{ ...tableHeaderCellStyle, textAlign: "right" }}>Change</th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === "gainers" ? gainersData : losersData).map((item) => (
                  <tr key={item.symbol}>
                    <td style={tableCellStyle}>{item.symbol}</td>
                    <td
                      style={{
                        ...tableCellStyle,
                        textAlign: "right",
                        color: item.change > 0 ? colors.success : colors.error,
                        fontWeight: 600,
                      }}
                    >
                      {item.change > 0 ? "+" : ""}{item.change}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div style={chartCardStyle}>
          <div style={{ ...typography.h4, color: colors.textPrimary, marginBottom: spacing.lg }}>
            Recent Orders ({orders.length})
          </div>
          {recentOrders.length > 0 ? (
            <table style={tableStyle}>
              <thead style={tableHeaderStyle}>
                <tr>
                  <th style={tableHeaderCellStyle}>Stock</th>
                  <th style={tableHeaderCellStyle}>Type</th>
                  <th style={{ ...tableHeaderCellStyle, textAlign: "right" }}>Qty</th>
                  <th style={{ ...tableHeaderCellStyle, textAlign: "right" }}>Price</th>
                  <th style={tableHeaderCellStyle}>Status</th>
                  <th style={tableHeaderCellStyle}>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <tr key={idx}>
                    <td style={tableCellStyle}>{order.symbol}</td>
                    <td style={tableCellStyle}>
                      <Badge variant={order.type === "BUY" ? "success" : "error"} size="sm">
                        {order.type}
                      </Badge>
                    </td>
                    <td style={{ ...tableCellStyle, textAlign: "right" }}>{order.qty}</td>
                    <td style={{ ...tableCellStyle, textAlign: "right" }}>₹{order.price}</td>
                    <td style={tableCellStyle}>
                      <Badge
                        variant={
                          order.status === "Completed"
                            ? "success"
                            : order.status === "Pending"
                            ? "warning"
                            : "error"
                        }
                        size="sm"
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td style={tableCellStyle}>{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: spacing.lg, textAlign: "center", color: colors.textSecondary }}>
              No orders yet
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div style={{ marginTop: spacing["2xl"] }}>
          <div style={{ ...typography.h4, color: colors.textPrimary, marginBottom: spacing.lg }}>
            Quick Actions
          </div>
          <div style={actionGridStyle}>
            <button 
              onClick={() => window.location.href = '/watchlist'}
              style={actionButtonStyle}
            >
              <Plus size={20} style={{ margin: "0 auto", color: colors.primary, marginBottom: spacing.sm, display: "block" }} />
              <div style={{ ...typography.label, color: colors.textPrimary }}>Add to Watchlist</div>
            </button>
            <button 
              onClick={() => window.location.href = '/holdings'}
              style={actionButtonStyle}
            >
              <BarChart3 size={20} style={{ margin: "0 auto", color: colors.primary, marginBottom: spacing.sm, display: "block" }} />
              <div style={{ ...typography.label, color: colors.textPrimary }}>View Portfolio</div>
            </button>
            <button 
              onClick={() => window.location.href = '/screener'}
              style={actionButtonStyle}
            >
              <Search size={20} style={{ margin: "0 auto", color: colors.primary, marginBottom: spacing.sm, display: "block" }} />
              <div style={{ ...typography.label, color: colors.textPrimary }}>Open Screener</div>
            </button>
            <button 
              onClick={() => window.location.href = '/analytics'}
              style={actionButtonStyle}
            >
              <TrendingUp size={20} style={{ margin: "0 auto", color: colors.primary, marginBottom: spacing.sm, display: "block" }} />
              <div style={{ ...typography.label, color: colors.textPrimary }}>View Analytics</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardV2Professional;
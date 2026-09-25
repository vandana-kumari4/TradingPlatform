import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import designSystem from "../../styles/designSystem";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
} from "lucide-react";
import { Card, Badge, StatusBadge } from "../UI";

export const Dashboard = () => {
  const { isDark } = useTheme();
  const { colors, spacing, typography, radius, shadow, transitions } = designSystem;

  const portfolioData = [
    { date: "Sep 15", value: 420000 },
    { date: "Sep 16", value: 425000 },
    { date: "Sep 17", value: 432000 },
    { date: "Sep 18", value: 440000 },
    { date: "Sep 19", value: 445000 },
    { date: "Sep 20", value: 450000 },
  ];

  const recentTrades = [
    {
      id: 1,
      symbol: "INFY",
      type: "BUY",
      qty: 50,
      price: 1550,
      value: 77500,
      time: "10:30 AM",
      status: "completed",
    },
    {
      id: 2,
      symbol: "TCS",
      type: "BUY",
      qty: 30,
      price: 3400,
      value: 102000,
      time: "02:15 PM",
      status: "completed",
    },
    {
      id: 3,
      symbol: "RELIANCE",
      type: "SELL",
      qty: 20,
      price: 2100,
      value: 42000,
      time: "03:45 PM",
      status: "completed",
    },
  ];

  const holdings = [
    { symbol: "INFY", qty: 50, value: 77500, change: 2.5 },
    { symbol: "TCS", qty: 30, value: 102000, change: -1.2 },
    { symbol: "RELIANCE", qty: 20, value: 42000, change: 3.8 },
  ];

  // STYLES
  const containerStyle = {
    backgroundColor: colors.bgSecondary,
    minHeight: "100vh",
    padding: `${spacing.xl} ${spacing.xl}`,
  };

  const contentStyle = {
    maxWidth: "1280px",
    margin: "0 auto",
  };

  const headerStyle = {
    marginBottom: spacing["3xl"],
  };

  const headerTitleStyle = {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  };

  const headerSubtitleStyle = {
    ...typography.bodyLarge,
    color: colors.textSecondary,
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: spacing.lg,
    marginBottom: spacing["2xl"],
  };

  const statCardStyle = {
    backgroundColor: colors.bgPrimary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.xl,
    boxShadow: shadow.xs,
    transition: transitions.base,
    cursor: "default",
    ':hover': {
      boxShadow: shadow.md,
      borderColor: colors.primary,
    },
  };

  const statIconStyle = {
    width: "48px",
    height: "48px",
    borderRadius: radius.lg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
    fontSize: "24px",
  };

  const statLabelStyle = {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    fontWeight: 500,
  };

  const statValueStyle = {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  };

  const statChangeStyle = {
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
    fontSize: "13px",
    fontWeight: 600,
  };

  const chartContainerStyle = {
    backgroundColor: colors.bgPrimary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing["2xl"],
    boxShadow: shadow.xs,
  };

  const chartHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xl,
  };

  const chartTitleStyle = {
    ...typography.h3,
    color: colors.textPrimary,
  };

  const chartTimestampStyle = {
    ...typography.bodySmall,
    color: colors.textSecondary,
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
  };

  const sectionsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: spacing.lg,
  };

  const sectionStyle = {
    backgroundColor: colors.bgPrimary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.xl,
    boxShadow: shadow.xs,
  };

  const sectionTitleStyle = {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  };

  const tradeRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${spacing.md} 0`,
    borderBottom: `1px solid ${colors.border}`,
    ':last-child': {
      borderBottom: 'none',
    },
  };

  const tradeSymbolStyle = {
    fontWeight: 600,
    color: colors.textPrimary,
    fontSize: "14px",
  };

  const tradeTimeStyle = {
    fontSize: "12px",
    color: colors.textSecondary,
  };

  const holdingRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${spacing.md} 0`,
    borderBottom: `1px solid ${colors.border}`,
    ':last-child': {
      borderBottom: 'none',
    },
  };

  const holdingValueStyle = {
    fontWeight: 600,
    color: colors.textPrimary,
    textAlign: "right",
  };

  // COMPONENT
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h1 style={headerTitleStyle}>Welcome back, Vandana! 👋</h1>
          <p style={headerSubtitleStyle}>Here's your portfolio overview</p>
        </div>

        {/* STAT CARDS GRID */}
        <div style={gridStyle}>
          {/* Portfolio Value */}
          <div style={statCardStyle}>
            <div
              style={{
                ...statIconStyle,
                backgroundColor: `${colors.primary}20`,
              }}
            >
              <Wallet size={24} color={colors.primary} />
            </div>
            <div style={statLabelStyle}>Portfolio Value</div>
            <div style={statValueStyle}>₹450,000</div>
            <div style={statChangeStyle}>
              <StatusBadge status="up" value="+₹30,000" size="sm" />
              <span style={{ color: colors.success }}>+7.1%</span>
            </div>
          </div>

          {/* Today's Change */}
          <div style={statCardStyle}>
            <div
              style={{
                ...statIconStyle,
                backgroundColor: `${colors.success}20`,
              }}
            >
              <TrendingUp size={24} color={colors.success} />
            </div>
            <div style={statLabelStyle}>Today's Change</div>
            <div style={statValueStyle}>+₹2,345</div>
            <div style={statChangeStyle}>
              <ArrowUpRight size={14} color={colors.success} />
              <span style={{ color: colors.success }}>+0.52%</span>
            </div>
          </div>

          {/* Total Returns */}
          <div style={statCardStyle}>
            <div
              style={{
                ...statIconStyle,
                backgroundColor: `${colors.info}20`,
              }}
            >
              <BarChart3 size={24} color={colors.info} />
            </div>
            <div style={statLabelStyle}>Total Returns</div>
            <div style={statValueStyle}>₹12,500</div>
            <div style={statChangeStyle}>
              <Badge variant="success" size="sm">
                2.78% YTD
              </Badge>
            </div>
          </div>

          {/* Holdings Count */}
          <div style={statCardStyle}>
            <div
              style={{
                ...statIconStyle,
                backgroundColor: `${colors.warning}20`,
              }}
            >
              <PieChart size={24} color="#F59E0B" />
            </div>
            <div style={statLabelStyle}>Holdings</div>
            <div style={statValueStyle}>5</div>
            <div style={statChangeStyle}>
              <span style={{ color: colors.textSecondary }}>Diversified portfolio</span>
            </div>
          </div>
        </div>

        {/* PORTFOLIO CHART */}
        <div style={chartContainerStyle}>
          <div style={chartHeaderStyle}>
            <h2 style={chartTitleStyle}>Portfolio Growth</h2>
            <div style={chartTimestampStyle}>
              <Clock size={14} />
              Last updated: 5 mins ago
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.border}
                vertical={false}
              />
              <XAxis dataKey="date" stroke={colors.textTertiary} />
              <YAxis stroke={colors.textTertiary} />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.bgPrimary,
                  border: `1px solid ${colors.border}`,
                  borderRadius: radius.md,
                  boxShadow: shadow.md,
                }}
                formatter={(value) => `₹${value.toLocaleString()}`}
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

        {/* BOTTOM SECTIONS */}
        <div style={sectionsGridStyle}>
          {/* RECENT TRADES */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Recent Trades</h3>
            {recentTrades.map((trade) => (
              <div key={trade.id} style={tradeRowStyle}>
                <div>
                  <div style={tradeSymbolStyle}>
                    {trade.type === "BUY" ? (
                      <ArrowDownLeft
                        size={14}
                        color={colors.success}
                        style={{ marginRight: spacing.xs }}
                      />
                    ) : (
                      <ArrowUpRight
                        size={14}
                        color={colors.error}
                        style={{ marginRight: spacing.xs }}
                      />
                    )}
                    {trade.symbol}
                  </div>
                  <div style={tradeTimeStyle}>{trade.time}</div>
                </div>
                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  <Badge
                    variant={trade.type === "BUY" ? "success" : "error"}
                    size="sm"
                  >
                    {trade.type === "BUY" ? "Buy" : "Sell"} {trade.qty}
                  </Badge>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: colors.textPrimary,
                      marginTop: spacing.xs,
                    }}
                  >
                    ₹{trade.value.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* TOP HOLDINGS */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Top Holdings</h3>
            {holdings.map((holding) => (
              <div key={holding.symbol} style={holdingRowStyle}>
                <div>
                  <div style={tradeSymbolStyle}>{holding.symbol}</div>
                  <div style={tradeTimeStyle}>{holding.qty} shares</div>
                </div>
                <div style={holdingValueStyle}>
                  <div>₹{holding.value.toLocaleString()}</div>
                  <StatusBadge
                    status={holding.change > 0 ? "up" : "down"}
                    value={`${holding.change > 0 ? "+" : ""}${holding.change}%`}
                    size="sm"
                    showArrow={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
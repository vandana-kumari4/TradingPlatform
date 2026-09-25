import React, { useState, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import designSystem from "../styles/designSystem";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Pie as PieIcon, BarChart3 } from "lucide-react";
import { Card, Badge, StatusBadge } from "./UI";

export const PortfolioAnalytics = () => {
  const { isDark } = useTheme();
  const { colors, spacing, typography, radius, shadow, transitions } = designSystem;

  const performanceData = [
    { month: "Jun", value: 380000 },
    { month: "Jul", value: 395000 },
    { month: "Aug", value: 410000 },
    { month: "Sep", value: 425000 },
    { month: "Oct", value: 440000 },
    { month: "Nov", value: 450000 },
  ];

  const stockBreakdownData = [
    { name: "INFY", value: 77500, fill: "#2563EB" },
    { name: "TCS", value: 102000, fill: "#0EA5E9" },
    { name: "RELIANCE", value: 42000, fill: "#06B6D4" },
    { name: "WIPRO", value: 45000, fill: "#14B8A6" },
    { name: "SBIN", value: 43500, fill: "#10B981" },
  ];

  const sectorAllocationData = [
    { name: "IT", value: 224500, fill: "#2563EB" },
    { name: "Banking", value: 145500, fill: "#0EA5E9" },
    { name: "Energy", value: 42000, fill: "#F59E0B" },
    { name: "Other", value: 38000, fill: "#8B5CF6" },
  ];

  const stockBreakdownTable = [
    {
      symbol: "INFY",
      qty: 50,
      value: 77500,
      allocation: "17.2%",
      return: 5000,
      returnPercent: 6.87,
    },
    {
      symbol: "TCS",
      qty: 30,
      value: 102000,
      allocation: "22.7%",
      return: -3000,
      returnPercent: -2.86,
    },
    {
      symbol: "RELIANCE",
      qty: 20,
      value: 42000,
      allocation: "9.3%",
      return: 2000,
      returnPercent: 5.0,
    },
    {
      symbol: "WIPRO",
      qty: 100,
      value: 45000,
      allocation: "10.0%",
      return: 3000,
      returnPercent: 7.14,
    },
    {
      symbol: "SBIN",
      qty: 75,
      value: 43500,
      allocation: "9.7%",
      return: 2250,
      returnPercent: 5.45,
    },
  ];

  const sectorAllocationTable = [
    { sector: "IT", value: 224500, allocation: "49.9%", change: 2.5 },
    { sector: "Banking", value: 145500, allocation: "32.3%", change: 4.2 },
    { sector: "Energy", value: 42000, allocation: "9.3%", change: 5.0 },
    { sector: "Other", value: 38000, allocation: "8.4%", change: 1.8 },
  ];

  const totalValue = 450000;
  const totalGain = 12500;
  const totalGainPercent = 2.86;

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
    marginBottom: spacing["2xl"],
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
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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

  const chartContainerStyle = {
    backgroundColor: colors.bgPrimary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    boxShadow: shadow.xs,
  };

  const chartTitleStyle = {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  };

  const chartsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: spacing.lg,
    marginBottom: spacing["2xl"],
  };

  const tableContainerStyle = {
    backgroundColor: colors.bgPrimary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    boxShadow: shadow.xs,
    overflow: "hidden",
    marginBottom: spacing.lg,
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const tableHeaderStyle = {
    backgroundColor: colors.bgSecondary,
    borderBottom: `2px solid ${colors.border}`,
  };

  const tableHeaderCellStyle = (isNumeric = false) => ({
    padding: `${spacing.md} ${spacing.lg}`,
    textAlign: isNumeric ? "right" : "left",
    fontWeight: 600,
    color: colors.textSecondary,
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  });

  const tableRowStyle = (isHovered = false) => ({
    borderBottom: `1px solid ${colors.border}`,
    backgroundColor: isHovered ? colors.bgSecondary : "transparent",
    transition: transitions.base,
  });

  const tableCellStyle = (isNumeric = false) => ({
    padding: `${spacing.md} ${spacing.lg}`,
    textAlign: isNumeric ? "right" : "left",
    color: colors.textPrimary,
    fontSize: "14px",
    fontWeight: isNumeric ? 600 : 400,
  });

  const [hoveredRow, setHoveredRow] = React.useState(null);

  // CUSTOM TOOLTIP
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: colors.bgPrimary,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.md,
            padding: spacing.md,
            boxShadow: shadow.md,
          }}
        >
          <p style={{ color: colors.textPrimary, fontWeight: 600, margin: 0 }}>
            {label}
          </p>
          <p style={{ color: colors.primary, margin: `${spacing.xs} 0 0 0` }}>
            {payload[0].name}: ₹{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  // COMPONENT
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h1 style={headerTitleStyle}>Portfolio Analytics</h1>
          <p style={headerSubtitleStyle}>
            Detailed insights into your portfolio performance and allocation
          </p>
        </div>

        {/* STAT CARDS */}
        <div style={gridStyle}>
          <div style={statCardStyle}>
            <div style={statLabelStyle}>Total Value</div>
            <div style={statValueStyle}>₹{totalValue.toLocaleString()}</div>
            <Badge variant="default" size="sm">
              5 Holdings
            </Badge>
          </div>

          <div style={statCardStyle}>
            <div style={statLabelStyle}>Total Gain/Loss</div>
            <div style={statValueStyle}>
              <span style={{ color: totalGain > 0 ? colors.success : colors.error }}>
                ₹{totalGain.toLocaleString()}
              </span>
            </div>
            <StatusBadge
              status={totalGain > 0 ? "up" : "down"}
              value={`${totalGain > 0 ? "+" : ""}${totalGainPercent}%`}
              size="sm"
            />
          </div>

          <div style={statCardStyle}>
            <div style={statLabelStyle}>Average Return</div>
            <div style={statValueStyle}>5.29%</div>
            <div
              style={{
                fontSize: "12px",
                color: colors.success,
                fontWeight: 600,
              }}
            >
              ↑ Outperforming Nifty50
            </div>
          </div>

          <div style={statCardStyle}>
            <div style={statLabelStyle}>Risk Score</div>
            <div style={statValueStyle}>6.2/10</div>
            <Badge variant="warning" size="sm">
              Moderate
            </Badge>
          </div>
        </div>

        {/* CHARTS GRID */}
        <div style={chartsGridStyle}>
          {/* PERFORMANCE CHART */}
          <div style={chartContainerStyle}>
            <h3 style={chartTitleStyle}>Performance (6 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.border}
                  vertical={false}
                />
                <XAxis dataKey="month" stroke={colors.textTertiary} />
                <YAxis stroke={colors.textTertiary} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={colors.primary}
                  strokeWidth={2}
                  dot={{ fill: colors.primary, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* STOCK ALLOCATION PIE */}
          <div style={chartContainerStyle}>
            <h3 style={chartTitleStyle}>Stock Allocation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stockBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stockBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* SECTOR ALLOCATION PIE */}
          <div style={chartContainerStyle}>
            <h3 style={chartTitleStyle}>Sector Allocation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectorAllocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sectorAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* STOCK BREAKDOWN TABLE */}
        <div style={tableContainerStyle}>
          <div style={{ padding: `${spacing.xl}` }}>
            <h3 style={chartTitleStyle}>Stock-by-Stock Breakdown</h3>
          </div>
          <table style={tableStyle}>
            <thead style={tableHeaderStyle}>
              <tr>
                <th style={tableHeaderCellStyle()}>Symbol</th>
                <th style={tableHeaderCellStyle(true)}>Qty</th>
                <th style={tableHeaderCellStyle(true)}>Value</th>
                <th style={tableHeaderCellStyle(true)}>% of Portfolio</th>
                <th style={tableHeaderCellStyle(true)}>Gain/Loss</th>
                <th style={tableHeaderCellStyle(true)}>Return %</th>
              </tr>
            </thead>
            <tbody>
              {stockBreakdownTable.map((stock, idx) => (
                <tr
                  key={idx}
                  style={tableRowStyle(hoveredRow === `stock-${idx}`)}
                  onMouseEnter={() => setHoveredRow(`stock-${idx}`)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={tableCellStyle()}>{stock.symbol}</td>
                  <td style={tableCellStyle(true)}>{stock.qty}</td>
                  <td style={tableCellStyle(true)}>₹{stock.value.toLocaleString()}</td>
                  <td style={tableCellStyle(true)}>{stock.allocation}</td>
                  <td style={tableCellStyle(true)}>
                    <span
                      style={{
                        color: stock.return > 0 ? colors.success : colors.error,
                      }}
                    >
                      {stock.return > 0 ? "+" : ""}₹{stock.return.toLocaleString()}
                    </span>
                  </td>
                  <td style={tableCellStyle(true)}>
                    <Badge
                      variant={stock.returnPercent > 0 ? "success" : "error"}
                      size="sm"
                    >
                      {stock.returnPercent > 0 ? "+" : ""}
                      {stock.returnPercent.toFixed(2)}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SECTOR BREAKDOWN TABLE */}
        <div style={tableContainerStyle}>
          <div style={{ padding: `${spacing.xl}` }}>
            <h3 style={chartTitleStyle}>Sector Breakdown</h3>
          </div>
          <table style={tableStyle}>
            <thead style={tableHeaderStyle}>
              <tr>
                <th style={tableHeaderCellStyle()}>Sector</th>
                <th style={tableHeaderCellStyle(true)}>Value</th>
                <th style={tableHeaderCellStyle(true)}>% of Portfolio</th>
                <th style={tableHeaderCellStyle(true)}>Change %</th>
              </tr>
            </thead>
            <tbody>
              {sectorAllocationTable.map((sector, idx) => (
                <tr
                  key={idx}
                  style={tableRowStyle(hoveredRow === `sector-${idx}`)}
                  onMouseEnter={() => setHoveredRow(`sector-${idx}`)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={tableCellStyle()}>{sector.sector}</td>
                  <td style={tableCellStyle(true)}>
                    ₹{sector.value.toLocaleString()}
                  </td>
                  <td style={tableCellStyle(true)}>{sector.allocation}</td>
                  <td style={tableCellStyle(true)}>
                    <StatusBadge
                      status={sector.change > 0 ? "up" : "down"}
                      value={`${sector.change > 0 ? "+" : ""}${sector.change}%`}
                      size="sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalytics;
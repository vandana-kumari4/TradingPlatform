import React, { useState } from "react";
import designSystemV2 from "../styles/designSystemV2";
import { Button, Badge } from "./UIV2";
import { TrendingUp, TrendingDown, MoreVertical } from "lucide-react";
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

export const AnalyticsV2 = () => {
  const { colors, spacing, typography, radius, shadow } = designSystemV2;

  // Mock data
  const performanceData = [
    { month: "Jan", value: 420000, benchmark: 415000 },
    { month: "Feb", value: 425000, benchmark: 420000 },
    { month: "Mar", value: 432000, benchmark: 428000 },
    { month: "Apr", value: 440000, benchmark: 432000 },
    { month: "May", value: 445000, benchmark: 440000 },
    { month: "Jun", value: 450000, benchmark: 448000 },
  ];

  const allocationData = [
    { name: "Technology", value: 40, color: colors.primary },
    { name: "Finance", value: 35, color: colors.success },
    { name: "Energy", value: 15, color: colors.warning },
    { name: "Pharma", value: 10, color: colors.error },
  ];

  const sectorData = [
    { sector: "IT", allocation: 40, returns: 8.5 },
    { sector: "Banking", allocation: 35, returns: 5.2 },
    { sector: "Energy", allocation: 15, returns: 12.3 },
    { sector: "Pharma", allocation: 10, returns: 3.1 },
  ];

  // Styles
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

  const headerTitleStyle = {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    fontSize: "28px",
  };

  const headerSubtitleStyle = {
    ...typography.body,
    color: colors.textSecondary,
  };

  const metricsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: spacing.lg,
    marginBottom: spacing["2xl"],
  };

  const metricCardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    boxShadow: shadow.xs,
  };

  const metricLabelStyle = {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    display: "block",
  };

  const metricValueStyle = {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  };

  const metricChangeStyle = (isPositive) => ({
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
    ...typography.bodySmall,
    color: isPositive ? colors.success : colors.error,
    fontWeight: 600,
  });

  const chartCardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    boxShadow: shadow.xs,
    marginBottom: spacing.lg,
  };

  const chartHeaderStyle = {
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottom: `1px solid ${colors.border}`,
  };

  const chartTitleStyle = {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  };

  const chartSubtitleStyle = {
    ...typography.bodySmall,
    color: colors.textSecondary,
  };

  const twoColGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
    gap: spacing.lg,
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

  const tableHeaderCellStyle = {
    padding: `${spacing.md} ${spacing.lg}`,
    textAlign: "left",
    ...typography.label,
    color: colors.textSecondary,
    fontWeight: 600,
  };

  const tableRowStyle = {
    borderBottom: `1px solid ${colors.border}`,
  };

  const tableCellStyle = {
    padding: `${spacing.md} ${spacing.lg}`,
    ...typography.body,
    color: colors.textPrimary,
  };

  const tableCellNumericStyle = {
    ...tableCellStyle,
    textAlign: "right",
    fontFamily: typography.mono.fontFamily,
    fontWeight: 500,
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h1 style={headerTitleStyle}>Portfolio Analytics</h1>
          <p style={headerSubtitleStyle}>Detailed performance and allocation insights</p>
        </div>

        {/* KEY METRICS */}
        <div style={metricsGridStyle}>
          <div style={metricCardStyle}>
            <label style={metricLabelStyle}>Total Return</label>
            <div style={metricValueStyle}>₹12,500</div>
            <div style={metricChangeStyle(true)}>
              <TrendingUp size={14} />
              <span>+2.78%</span>
            </div>
          </div>

          <div style={metricCardStyle}>
            <label style={metricLabelStyle}>YTD Return</label>
            <div style={metricValueStyle}>+8.45%</div>
            <div style={metricChangeStyle(true)}>
              <TrendingUp size={14} />
              <span>vs 5.2% benchmark</span>
            </div>
          </div>

          <div style={metricCardStyle}>
            <label style={metricLabelStyle}>Volatility</label>
            <div style={metricValueStyle}>12.4%</div>
            <div style={metricChangeStyle(false)}>
              <TrendingDown size={14} />
              <span>Lower risk</span>
            </div>
          </div>

          <div style={metricCardStyle}>
            <label style={metricLabelStyle}>Sharpe Ratio</label>
            <div style={metricValueStyle}>1.24</div>
            <div style={{ ...typography.bodySmall, color: colors.textSecondary }}>
              Risk-adjusted returns
            </div>
          </div>
        </div>

        {/* PERFORMANCE CHART */}
        <div style={chartCardStyle}>
          <div style={chartHeaderStyle}>
            <div style={chartTitleStyle}>Performance vs Benchmark</div>
            <div style={chartSubtitleStyle}>Last 6 months</div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
              <XAxis dataKey="month" stroke={colors.textTertiary} style={{ fontSize: "12px" }} />
              <YAxis stroke={colors.textTertiary} style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: radius.md,
                }}
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Legend wrapperStyle={{ paddingTop: spacing.lg }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={colors.primary}
                strokeWidth={2}
                name="Your Portfolio"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke={colors.textTertiary}
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Benchmark"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ALLOCATION & SECTOR */}
        <div style={twoColGridStyle}>
          {/* ALLOCATION */}
          <div style={chartCardStyle}>
            <div style={chartHeaderStyle}>
              <div style={chartTitleStyle}>Portfolio Allocation</div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* SECTOR BREAKDOWN */}
          <div style={chartCardStyle}>
            <div style={chartHeaderStyle}>
              <div style={chartTitleStyle}>Sector Breakdown</div>
            </div>
            <table style={tableStyle}>
              <thead style={tableHeaderStyle}>
                <tr>
                  <th style={tableHeaderCellStyle}>Sector</th>
                  <th style={{ ...tableHeaderCellStyle, textAlign: "right" }}>Allocation</th>
                  <th style={{ ...tableHeaderCellStyle, textAlign: "right" }}>Returns</th>
                </tr>
              </thead>
              <tbody>
                {sectorData.map((sector, idx) => (
                  <tr key={idx} style={tableRowStyle}>
                    <td style={tableCellStyle}>{sector.sector}</td>
                    <td style={tableCellNumericStyle}>
                      <Badge variant="default" size="sm">
                        {sector.allocation}%
                      </Badge>
                    </td>
                    <td style={{ ...tableCellNumericStyle, color: sector.returns > 5 ? colors.success : colors.textPrimary }}>
                      {sector.returns > 0 ? "+" : ""}{sector.returns}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* STOCK PERFORMANCE */}
        <div style={chartCardStyle}>
          <div style={chartHeaderStyle}>
            <div style={chartTitleStyle}>Stock Performance</div>
            <div style={chartSubtitleStyle}>By return contribution</div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { symbol: "INFY", contribution: 5000 },
                { symbol: "TCS", contribution: -3000 },
                { symbol: "HDFCBANK", contribution: -1750 },
                { symbol: "WIPRO", contribution: 800 },
                { symbol: "RELIANCE", contribution: 1000 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
              <XAxis dataKey="symbol" stroke={colors.textTertiary} style={{ fontSize: "12px" }} />
              <YAxis stroke={colors.textTertiary} style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: radius.md,
                }}
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Bar dataKey="contribution" fill={colors.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsV2;
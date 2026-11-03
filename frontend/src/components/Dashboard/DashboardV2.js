import React from "react";
import designSystemV2 from "../../styles/designSystemV2";
import { Button, Card, Badge, Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from "../UIV2";
import { TrendingUp, TrendingDown, Eye, MoreVertical } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export const DashboardV2 = () => {
  const { colors, spacing, typography, radius } = designSystemV2;

  // Mock data
  const portfolioData = [
    { date: "Sep 15", value: 420000 },
    { date: "Sep 16", value: 425000 },
    { date: "Sep 17", value: 432000 },
    { date: "Sep 18", value: 440000 },
    { date: "Sep 19", value: 445000 },
    { date: "Sep 20", value: 450000 },
  ];

  const holdings = [
    { symbol: "INFY", qty: 50, avgPrice: 1450, currentPrice: 1550, value: 77500, gain: 5000, gainPercent: 6.87 },
    { symbol: "TCS", qty: 30, avgPrice: 3500, currentPrice: 3400, value: 102000, gain: -3000, gainPercent: -2.86 },
    { symbol: "HDFCBANK", qty: 25, avgPrice: 1620, currentPrice: 1550, value: 38750, gain: -1750, gainPercent: -4.32 },
  ];

  const recentActivity = [
    { id: 1, type: "BUY", symbol: "INFY", qty: 50, price: 1550, time: "10:30 AM", status: "Completed" },
    { id: 2, type: "BUY", symbol: "TCS", qty: 30, price: 3400, time: "2:15 PM", status: "Completed" },
    { id: 3, type: "SELL", symbol: "RELIANCE", qty: 20, price: 2100, time: "3:45 PM", status: "Completed" },
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
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: spacing.lg,
    marginBottom: spacing["2xl"],
  };

  const metricCardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    boxShadow: colors.shadow?.xs,
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

  const chartContainerStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing["2xl"],
  };

  const chartHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottom: `1px solid ${colors.border}`,
  };

  const chartTitleStyle = {
    ...typography.h4,
    color: colors.textPrimary,
  };

  const chartSubtitleStyle = {
    ...typography.bodySmall,
    color: colors.textSecondary,
  };

  const twoColGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
    gap: spacing.lg,
  };

  const sectionStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
  };

  const sectionHeaderStyle = {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const tableContainerStyle = {
    overflowX: "auto",
  };

  const emptyRowStyle = {
    padding: spacing.lg,
    textAlign: "center",
    color: colors.textSecondary,
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h1 style={headerTitleStyle}>Portfolio</h1>
          <p style={headerSubtitleStyle}>Overview of your investments and performance</p>
        </div>

        {/* KEY METRICS */}
        <div style={metricsGridStyle}>
          {/* Portfolio Value */}
          <div style={metricCardStyle}>
            <label style={metricLabelStyle}>Portfolio Value</label>
            <div style={metricValueStyle}>₹450,000</div>
            <div style={metricChangeStyle(true)}>
              <TrendingUp size={14} />
              <span>+₹30,000 (7.1%)</span>
            </div>
          </div>

          {/* Today's P&L */}
          <div style={metricCardStyle}>
            <label style={metricLabelStyle}>Today's P&L</label>
            <div style={metricValueStyle}>+₹2,345</div>
            <div style={metricChangeStyle(true)}>
              <TrendingUp size={14} />
              <span>+0.52%</span>
            </div>
          </div>

          {/* Total Returns */}
          <div style={metricCardStyle}>
            <label style={metricLabelStyle}>Total Returns</label>
            <div style={metricValueStyle}>+₹12,500</div>
            <div style={metricChangeStyle(true)}>
              <TrendingUp size={14} />
              <span>+2.78% YTD</span>
            </div>
          </div>

          {/* Holdings */}
          <div style={metricCardStyle}>
            <label style={metricLabelStyle}>Holdings</label>
            <div style={metricValueStyle}>5</div>
            <div style={{ ...typography.bodySmall, color: colors.textSecondary }}>
              Across 3 stocks
            </div>
          </div>
        </div>

        {/* PERFORMANCE CHART */}
        <div style={chartContainerStyle}>
          <div style={chartHeaderStyle}>
            <div>
              <div style={chartTitleStyle}>Portfolio Growth</div>
              <div style={chartSubtitleStyle}>Last 6 days</div>
            </div>
            <Button variant="secondary" size="sm">View Details</Button>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.primary} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
              <XAxis dataKey="date" stroke={colors.textTertiary} style={{ fontSize: "12px" }} />
              <YAxis stroke={colors.textTertiary} style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: radius.md,
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

        {/* HOLDINGS & ACTIVITY */}
        <div style={twoColGridStyle}>
          {/* HOLDINGS TABLE */}
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              Holdings
              <Button variant="ghost" size="sm">View All</Button>
            </div>

            <div style={tableContainerStyle}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Symbol</TableHeaderCell>
                    <TableHeaderCell align="right">Qty</TableHeaderCell>
                    <TableHeaderCell align="right">Price</TableHeaderCell>
                    <TableHeaderCell align="right">Gain/Loss</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {holdings.length > 0 ? (
                    holdings.map((h) => (
                      <TableRow key={h.symbol}>
                        <TableCell>
                          <strong>{h.symbol}</strong>
                        </TableCell>
                        <TableCell align="right" variant="numeric">{h.qty}</TableCell>
                        <TableCell align="right" variant="numeric">₹{h.currentPrice}</TableCell>
                        <TableCell align="right">
                          <Badge variant={h.gain > 0 ? "success" : "error"} size="sm">
                            {h.gain > 0 ? "+" : ""}₹{h.gain}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} style={emptyRowStyle}>
                        No holdings yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              Recent Activity
              <Button variant="ghost" size="sm">View All</Button>
            </div>

            <div style={tableContainerStyle}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Symbol</TableHeaderCell>
                    <TableHeaderCell align="right">Price</TableHeaderCell>
                    <TableHeaderCell>Time</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentActivity.length > 0 ? (
                    recentActivity.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <Badge
                            variant={activity.type === "BUY" ? "success" : "error"}
                            size="sm"
                          >
                            {activity.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{activity.symbol}</TableCell>
                        <TableCell align="right" variant="numeric">
                          ₹{activity.price}
                        </TableCell>
                        <TableCell>{activity.time}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} style={emptyRowStyle}>
                        No recent activity
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardV2;
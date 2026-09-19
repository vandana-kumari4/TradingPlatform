import React, { useState } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTheme } from "../context/ThemeContext";

const performanceData = [
  { month: "Jan", value: 400000, profit: 0 },
  { month: "Feb", value: 410000, profit: 10000 },
  { month: "Mar", value: 405000, profit: 5000 },
  { month: "Apr", value: 425000, profit: 25000 },
  { month: "May", value: 435000, profit: 35000 },
  { month: "Jun", value: 450000, profit: 50000 },
];

const holdingsData = [
  { name: "INFY", value: 150000 },
  { name: "TCS", value: 170000 },
  { name: "HDFCBANK", value: 130000 },
];

const COLORS = ["#0066cc", "#2ecc71", "#e74c3c"];

export const PortfolioAnalytics = () => {
  const { colors } = useTheme();

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

  const statsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  };

  const statBoxStyle = {
    backgroundColor: colors.surfaceLight,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "1.5rem",
    textAlign: "center",
  };

  const statLabelStyle = {
    color: colors.textSecondary,
    fontSize: "12px",
    marginBottom: "0.5rem",
  };

  const statValueStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: colors.text,
  };

  const chartTitleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: colors.text,
    marginBottom: "1rem",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: colors.text, marginBottom: "2rem" }}>Portfolio Analytics</h1>

      {/* Key Metrics */}
      <div style={statsContainerStyle}>
        <div style={statBoxStyle}>
          <div style={statLabelStyle}>Total Portfolio Value</div>
          <div style={statValueStyle}>₹450,000</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statLabelStyle}>Total Invested</div>
          <div style={statValueStyle}>₹400,000</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statLabelStyle}>Total Returns</div>
          <div style={{ ...statValueStyle, color: colors.success }}>+₹50,000</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statLabelStyle}>Returns %</div>
          <div style={{ ...statValueStyle, color: colors.success }}>+12.5%</div>
        </div>
      </div>

      {/* Portfolio Performance Chart */}
      <div style={cardStyle}>
        <h2 style={chartTitleStyle}>Portfolio Performance (6 Months)</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis dataKey="month" stroke={colors.textSecondary} />
            <YAxis stroke={colors.textSecondary} />
            <Tooltip
              contentStyle={{
                backgroundColor: colors.background,
                border: `1px solid ${colors.border}`,
                borderRadius: "8px",
                color: colors.text,
              }}
              formatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke={colors.primary}
              strokeWidth={2}
              dot={{ fill: colors.primary }}
              name="Portfolio Value"
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke={colors.success}
              strokeWidth={2}
              dot={{ fill: colors.success }}
              name="Profit"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Profit by Month */}
      <div style={cardStyle}>
        <h2 style={chartTitleStyle}>Monthly Profit</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis dataKey="month" stroke={colors.textSecondary} />
            <YAxis stroke={colors.textSecondary} />
            <Tooltip
              contentStyle={{
                backgroundColor: colors.background,
                border: `1px solid ${colors.border}`,
                borderRadius: "8px",
                color: colors.text,
              }}
              formatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Bar dataKey="profit" fill={colors.success} radius={8} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Holdings Distribution */}
      <div style={cardStyle}>
        <h2 style={chartTitleStyle}>Holdings Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={holdingsData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ₹${value.toLocaleString()}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {holdingsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `₹${value.toLocaleString()}`}
              contentStyle={{
                backgroundColor: colors.background,
                border: `1px solid ${colors.border}`,
                borderRadius: "8px",
                color: colors.text,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Summary */}
      <div style={cardStyle}>
        <h2 style={chartTitleStyle}>Performance Summary</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
        }}>
          <div>
            <h3 style={{ color: colors.text, marginBottom: "1rem" }}>Best Performer</h3>
            <div style={{ color: colors.success, fontSize: "18px", fontWeight: "bold" }}>
              TCS: +₹200 (+6.25%)
            </div>
          </div>
          <div>
            <h3 style={{ color: colors.text, marginBottom: "1rem" }}>Worst Performer</h3>
            <div style={{ color: colors.danger, fontSize: "18px", fontWeight: "bold" }}>
              WIPRO: -₹20 (-4.26%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalytics;
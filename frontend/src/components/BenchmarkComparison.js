import React, { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTheme } from "../context/ThemeContext";

const comparisonData = [
  { month: "Jan", portfolio: 400000, nifty50: 38000, sensex: 52000 },
  { month: "Feb", portfolio: 410000, nifty50: 39500, sensex: 53500 },
  { month: "Mar", portfolio: 405000, nifty50: 38200, sensex: 52100 },
  { month: "Apr", portfolio: 425000, nifty50: 41000, sensex: 55200 },
  { month: "May", portfolio: 435000, nifty50: 42800, sensex: 57100 },
  { month: "Jun", portfolio: 450000, nifty50: 44500, sensex: 59500 },
];

const performanceMetrics = [
  { metric: "Total Return", portfolio: "12.5%", nifty50: "17.1%", sensex: "14.4%" },
  { metric: "YTD Return", portfolio: "8.3%", nifty50: "12.6%", sensex: "10.9%" },
  { metric: "Volatility", portfolio: "6.2%", nifty50: "8.5%", sensex: "7.8%" },
  { metric: "Sharpe Ratio", portfolio: "1.85", nifty50: "1.62", sensex: "1.71%" },
  { metric: "Max Drawdown", portfolio: "-4.2%", nifty50: "-6.8%", sensex: "-5.9%" },
];

export const BenchmarkComparison = () => {
  const { colors } = useTheme();
  const [timeFrame, setTimeFrame] = useState("6M");

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

  const chartTitleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: colors.text,
    marginBottom: "1rem",
  };

  const timeFrameButtonStyle = (active) => ({
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: active ? colors.primary : colors.surfaceLight,
    color: active ? "white" : colors.text,
    cursor: "pointer",
    fontWeight: "600",
    marginRight: "0.5rem",
  });

  const statsGridStyle = {
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
    marginBottom: "0.5rem",
  };

  const statDiffStyle = (value) => ({
    fontSize: "14px",
    color: value.includes("-") ? colors.danger : colors.success,
    fontWeight: "600",
  });

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  };

  const cellStyle = {
    padding: "1rem",
    textAlign: "left",
    borderBottom: `1px solid ${colors.border}`,
  };

  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: colors.surfaceLight,
    fontWeight: "600",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: colors.text, marginBottom: "2rem" }}>Portfolio vs Benchmark</h1>

      {/* Time Frame Selection */}
      <div style={cardStyle}>
        <h2 style={chartTitleStyle}>Select Time Period</h2>
        <div>
          {["1M", "3M", "6M", "1Y", "5Y"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeFrame(tf)}
              style={timeFrameButtonStyle(timeFrame === tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Key Statistics */}
      <div style={cardStyle}>
        <h2 style={chartTitleStyle}>Key Statistics ({timeFrame})</h2>
        <div style={statsGridStyle}>
          <div style={statBoxStyle}>
            <div style={statLabelStyle}>Your Portfolio</div>
            <div style={statValueStyle}>12.5%</div>
            <div style={statDiffStyle("+50")}>+₹50,000</div>
          </div>
          <div style={statBoxStyle}>
            <div style={statLabelStyle}>Nifty 50</div>
            <div style={statValueStyle}>17.1%</div>
            <div style={statDiffStyle("+4.6")}>+4.6% vs Portfolio</div>
          </div>
          <div style={statBoxStyle}>
            <div style={statLabelStyle}>Sensex</div>
            <div style={statValueStyle}>14.4%</div>
            <div style={statDiffStyle("+1.9")}>+1.9% vs Portfolio</div>
          </div>
          <div style={statBoxStyle}>
            <div style={statLabelStyle}>Alpha</div>
            <div style={statValueStyle}>-4.6%</div>
            <div style={statDiffStyle("-")}>Underperformance</div>
          </div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div style={cardStyle}>
        <h2 style={chartTitleStyle}>Performance Comparison</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={comparisonData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
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
              dataKey="portfolio"
              stroke={colors.primary}
              strokeWidth={2}
              dot={{ fill: colors.primary }}
              name="Your Portfolio"
            />
            <Line
              type="monotone"
              dataKey="nifty50"
              stroke={colors.success}
              strokeWidth={2}
              dot={{ fill: colors.success }}
              name="Nifty 50"
            />
            <Line
              type="monotone"
              dataKey="sensex"
              stroke="#f39c12"
              strokeWidth={2}
              dot={{ fill: "#f39c12" }}
              name="Sensex"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Returns Comparison Bar Chart */}
      <div style={cardStyle}>
        <h2 style={chartTitleStyle}>Monthly Returns Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
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
            />
            <Legend />
            <Bar dataKey="portfolio" fill={colors.primary} name="Your Portfolio" />
            <Bar dataKey="nifty50" fill={colors.success} name="Nifty 50" />
            <Bar dataKey="sensex" fill="#f39c12" name="Sensex" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Metrics Table */}
      <div style={cardStyle}>
        <h2 style={chartTitleStyle}>Performance Metrics</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Metric</th>
                <th style={headerCellStyle}>Your Portfolio</th>
                <th style={headerCellStyle}>Nifty 50</th>
                <th style={headerCellStyle}>Sensex</th>
              </tr>
            </thead>
            <tbody>
              {performanceMetrics.map((row, idx) => (
                <tr key={idx}>
                  <td style={cellStyle}><strong>{row.metric}</strong></td>
                  <td style={{...cellStyle, color: colors.text, fontWeight: "600"}}>{row.portfolio}</td>
                  <td style={{...cellStyle, color: colors.success, fontWeight: "600"}}>{row.nifty50}</td>
                  <td style={{...cellStyle, color: "#f39c12", fontWeight: "600"}}>{row.sensex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analysis */}
      <div style={cardStyle}>
        <h2 style={chartTitleStyle}>Analysis</h2>
        <div style={{ color: colors.text, lineHeight: "1.8" }}>
          <p>📊 <strong>Performance Summary:</strong> Your portfolio returned 12.5% in the last 6 months, underperforming Nifty 50 by 4.6% but outperforming Sensex by 1.9%.</p>
          <p>⚠️ <strong>Key Finding:</strong> Lower volatility (6.2% vs 8.5%) suggests a more defensive portfolio composition.</p>
          <p>💡 <strong>Recommendation:</strong> Consider increasing allocation to IT and Banking sectors to align better with index performance.</p>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkComparison;

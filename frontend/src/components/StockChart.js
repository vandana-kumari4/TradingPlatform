import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "../context/ThemeContext";
import mockChartData from "../services/mockChartData";

export const StockChart = ({ symbol, height = 400 }) => {
  const { colors } = useTheme();
  const [resolution, setResolution] = useState("D");
  
  const data = mockChartData[symbol] || [];
  const loading = false;
  const error = !data || data.length === 0;

  if (error) return <div style={{ color: colors.textSecondary }}>No chart data</div>;

  const minPrice = Math.min(...data.map(d => d.price));
  const maxPrice = Math.max(...data.map(d => d.price));
  const priceRange = maxPrice - minPrice;
  const yAxisMin = Math.floor(minPrice - priceRange * 0.1);
  const yAxisMax = Math.ceil(maxPrice + priceRange * 0.1);

  return (
    <div style={{
      backgroundColor: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "2rem",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ color: colors.text, margin: 0 }}>{symbol} Price Chart</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["D", "W", "M"].map((res) => (
            <button
              key={res}
              onClick={() => setResolution(res)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor: resolution === res ? colors.primary : colors.surfaceLight,
                color: resolution === res ? "white" : colors.text,
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              {res === "D" ? "1D" : res === "W" ? "1W" : "1M"}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
          <XAxis
            dataKey="time"
            stroke={colors.textSecondary}
            style={{ fontSize: "12px" }}
          />
          <YAxis
            domain={[yAxisMin, yAxisMax]}
            stroke={colors.textSecondary}
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              color: colors.text,
            }}
            formatter={(value) => `₹${value.toFixed(2)}`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={colors.primary}
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

      <div style={{
        marginTop: "1rem",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
        fontSize: "12px",
      }}>
        <div>
          <div style={{ color: colors.textSecondary }}>High</div>
          <div style={{ color: colors.success, fontWeight: "600" }}>
            ₹{Math.max(...data.map(d => d.high)).toFixed(2)}
          </div>
        </div>
        <div>
          <div style={{ color: colors.textSecondary }}>Low</div>
          <div style={{ color: colors.danger, fontWeight: "600" }}>
            ₹{Math.min(...data.map(d => d.low)).toFixed(2)}
          </div>
        </div>
        <div>
          <div style={{ color: colors.textSecondary }}>Latest</div>
          <div style={{ color: colors.text, fontWeight: "600" }}>
            ₹{data[data.length - 1].price.toFixed(2)}
          </div>
        </div>
        <div>
          <div style={{ color: colors.textSecondary }}>Avg Volume</div>
          <div style={{ color: colors.text, fontWeight: "600" }}>
            {(Math.round(data.reduce((a, b) => a + b.volume, 0) / data.length / 1000))}{" K"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChart;
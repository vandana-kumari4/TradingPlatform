import React, { useState, useMemo } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTheme } from "../context/ThemeContext";

// Calculate SMA (Simple Moving Average)
const calculateSMA = (data, period) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(null);
    } else {
      const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      result.push(sum / period);
    }
  }
  return result;
};

// Calculate RSI (Relative Strength Index)
const calculateRSI = (data, period = 14) => {
  const result = [];
  const changes = [];
  
  for (let i = 1; i < data.length; i++) {
    changes.push(data[i] - data[i - 1]);
  }

  for (let i = 0; i < changes.length; i++) {
    if (i < period - 1) {
      result.push(null);
    } else {
      const gains = changes.slice(i - period + 1, i + 1).filter(c => c > 0).reduce((a, b) => a + b, 0);
      const losses = Math.abs(changes.slice(i - period + 1, i + 1).filter(c => c < 0).reduce((a, b) => a + b, 0));
      
      const avgGain = gains / period;
      const avgLoss = losses / period;
      
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      const rsi = 100 - (100 / (1 + rs));
      result.push(rsi);
    }
  }
  
  return result;
};

// Calculate Bollinger Bands
const calculateBollingerBands = (data, period = 20, stdDev = 2) => {
  const sma = calculateSMA(data, period);
  const result = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push({ upper: null, middle: null, lower: null });
    } else {
      const prices = data.slice(i - period + 1, i + 1);
      const mean = prices.reduce((a, b) => a + b, 0) / period;
      const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / period;
      const std = Math.sqrt(variance);
      
      result.push({
        upper: mean + (std * stdDev),
        middle: mean,
        lower: mean - (std * stdDev),
      });
    }
  }
  
  return result;
};

// Mock chart data
const generateChartData = (stock) => {
  const data = [];
  let price = 1500;
  
  for (let i = 0; i < 60; i++) {
    price += (Math.random() - 0.5) * 50;
    data.push({
      day: `Day ${i + 1}`,
      price: Math.max(price, 100),
    });
  }
  
  return data;
};

export const TechnicalIndicators = () => {
  const { colors } = useTheme();
  const [selectedStock, setSelectedStock] = useState("INFY");
  const stocks = ["INFY", "TCS", "HDFCBANK", "WIPRO", "RELIANCE"];

  const chartData = useMemo(() => {
    const rawData = generateChartData(selectedStock);
    const prices = rawData.map(d => d.price);
    
    const sma12 = calculateSMA(prices, 12);
    const sma26 = calculateSMA(prices, 26);
    const rsi = calculateRSI(prices, 14);
    const bb = calculateBollingerBands(prices, 20, 2);

    return rawData.map((d, i) => ({
      ...d,
      sma12: sma12[i],
      sma26: sma26[i],
      rsi: rsi[i],
      bbUpper: bb[i]?.upper,
      bbMiddle: bb[i]?.middle,
      bbLower: bb[i]?.lower,
    }));
  }, [selectedStock]);

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

  const buttonStyle = (active) => ({
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: active ? colors.primary : colors.surfaceLight,
    color: active ? "white" : colors.text,
    cursor: "pointer",
    fontWeight: "600",
    marginRight: "0.5rem",
  });

  return (
    <div style={containerStyle}>
      <h1 style={{ color: colors.text, marginBottom: "2rem" }}>📈 Technical Indicators</h1>

      {/* Stock Selection */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>Select Stock</h2>
        <div>
          {stocks.map(stock => (
            <button
              key={stock}
              onClick={() => setSelectedStock(stock)}
              style={buttonStyle(selectedStock === stock)}
            >
              {stock}
            </button>
          ))}
        </div>
      </div>

      {/* Price Chart with Bollinger Bands */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>Price & Bollinger Bands</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis dataKey="day" stroke={colors.textSecondary} />
            <YAxis stroke={colors.textSecondary} />
            <Tooltip
              contentStyle={{ backgroundColor: colors.background, border: `1px solid ${colors.border}` }}
              formatter={(value) => value ? `₹${value.toFixed(2)}` : "N/A"}
            />
            <Legend />
            <Line type="monotone" dataKey="price" stroke={colors.primary} strokeWidth={2} name="Price" />
            <Line type="monotone" dataKey="bbUpper" stroke="#f39c12" strokeDasharray="5 5" name="Upper Band" />
            <Line type="monotone" dataKey="bbMiddle" stroke="#e74c3c" strokeDasharray="5 5" name="Middle Band" />
            <Line type="monotone" dataKey="bbLower" stroke="#3498db" strokeDasharray="5 5" name="Lower Band" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* RSI Chart */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>RSI (Relative Strength Index)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis dataKey="day" stroke={colors.textSecondary} />
            <YAxis stroke={colors.textSecondary} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: colors.background, border: `1px solid ${colors.border}` }}
              formatter={(value) => value ? value.toFixed(2) : "N/A"}
            />
            <Legend />
            <Line type="monotone" dataKey="rsi" stroke={colors.primary} strokeWidth={2} name="RSI" />
          </LineChart>
        </ResponsiveContainer>
        <div style={{ color: colors.textSecondary, fontSize: "12px", marginTop: "1rem" }}>
          📊 RSI Levels: <strong>Below 30</strong> = Oversold | <strong>30-70</strong> = Neutral | <strong>Above 70</strong> = Overbought
        </div>
      </div>

      {/* SMA Chart */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>Moving Averages (SMA)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis dataKey="day" stroke={colors.textSecondary} />
            <YAxis stroke={colors.textSecondary} />
            <Tooltip
              contentStyle={{ backgroundColor: colors.background, border: `1px solid ${colors.border}` }}
              formatter={(value) => value ? `₹${value.toFixed(2)}` : "N/A"}
            />
            <Legend />
            <Line type="monotone" dataKey="price" stroke={colors.primary} strokeWidth={2} name="Price" />
            <Line type="monotone" dataKey="sma12" stroke="#2ecc71" strokeWidth={2} name="SMA 12" />
            <Line type="monotone" dataKey="sma26" stroke="#e74c3c" strokeWidth={2} name="SMA 26" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Analysis */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>📊 Indicator Analysis</h2>
        <div style={{ color: colors.text, lineHeight: "1.8" }}>
          <p>✅ <strong>Bollinger Bands:</strong> Identify overbought/oversold conditions and volatility</p>
          <p>✅ <strong>RSI:</strong> Momentum indicator showing strength of price movement</p>
          <p>✅ <strong>SMA:</strong> Trend direction - Price above SMA = Uptrend, Below = Downtrend</p>
          <p>💡 <strong>Trading Signal:</strong> Use combination of all three for best accuracy</p>
        </div>
      </div>
    </div>
  );
};

export default TechnicalIndicators;
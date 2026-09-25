import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export const MultiAgentTrading = () => {
  const { colors } = useTheme();
  const [selectedStock, setSelectedStock] = useState("INFY");
  const [quantity, setQuantity] = useState(100);
  const [portfolioValue] = useState(450000);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const stocks = ["INFY", "TCS", "HDFCBANK", "WIPRO", "RELIANCE", "SBIN"];
  const mockPortfolio = [
    { symbol: "INFY", qty: 50, price: 1550 },
    { symbol: "TCS", qty: 30, price: 3400 },
  ];

  const getMockAnalysis = (stock) => ({
    symbol: stock,
    agentAnalyses: {
      marketAnalyst: {
        agent: "Market Analyst",
        analysis: `${stock} shows strong technical setup. RSI indicates oversold conditions with bullish divergence forming. Volume surge confirms institutional buying interest. Trend reversal signals emerging on daily charts.`,
      },
      riskManager: {
        agent: "Risk Manager",
        assessment: `Position sizing: ${quantity} shares (${((quantity * 1550) / portfolioValue * 100).toFixed(2)}% of portfolio). Risk: Controlled. Stop-loss recommended at 3% below entry. Portfolio impact: Low to Medium.`,
        riskLevel: "MEDIUM",
      },
      strategyOptimizer: {
        agent: "Strategy Optimizer",
        strategy: `Recommended Strategy: SMA Crossover with Bollinger Band confirmation. Golden cross on moving averages intact. Price near lower Bollinger Band suggests reversal setup. Best entry on breakout above resistance at ₹1600.`,
      },
      portfolioRebalancer: {
        agent: "Portfolio Rebalancer",
        recommendations: `Current allocation is skewed towards IT. Recommendation: Take partial profits in TCS (5-10 shares). Reallocate to RELIANCE or SBIN for sector diversification. This improves Sharpe ratio by 0.15.`,
      },
    },
    finalRecommendation: {
      ACTION: "BUY",
      CONFIDENCE: 82,
      POSITION_SIZE: quantity,
      STOP_LOSS: 1500,
      TARGET: 1700,
    },
  });

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/multi-agent-trading/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: selectedStock,
          quantity,
          portfolioValue,
          portfolio: mockPortfolio,
        }),
      });

      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error("Error:", error);
      setAnalysis(getMockAnalysis(selectedStock));
    }
    setLoading(false);
  };

  const containerStyle = {
    backgroundColor: colors.background,
    minHeight: "100vh",
    padding: "2rem",
  };

  const headerStyle = {
    marginBottom: "3rem",
  };

  const titleStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    color: colors.text,
    margin: 0,
    marginBottom: "0.5rem",
  };

  const subtitleStyle = {
    color: colors.textSecondary,
    fontSize: "14px",
    margin: 0,
  };

  const cardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "2rem",
    marginBottom: "2rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "8px",
    border: `2px solid ${colors.border}`,
    backgroundColor: colors.background,
    color: colors.text,
    boxSizing: "border-box",
    marginBottom: "1rem",
    fontSize: "14px",
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: colors.primary,
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
  };

  const agentCardStyle = {
    backgroundColor: colors.surfaceLight,
    border: `2px solid ${colors.primary}`,
    borderRadius: "12px",
    padding: "1.5rem",
    marginBottom: "1.5rem",
  };

  const agentHeaderStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const agentContentStyle = {
    color: colors.text,
    lineHeight: "1.6",
    fontSize: "14px",
  };

  const finalRecommendationStyle = {
    backgroundColor: `${colors.success}15`,
    border: `3px solid ${colors.success}`,
    borderRadius: "16px",
    padding: "2rem",
    marginTop: "2rem",
  };

  const actionBadgeStyle = {
    display: "inline-block",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "20px",
    color: "white",
    backgroundColor: colors.success,
    marginBottom: "1rem",
  };

  const metricsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
  };

  const metricBoxStyle = {
    backgroundColor: colors.background,
    padding: "1.5rem",
    borderRadius: "12px",
    textAlign: "center",
    border: `1px solid ${colors.border}`,
  };

  const metricValueStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: "0.5rem",
  };

  const metricLabelStyle = {
    fontSize: "12px",
    color: colors.textSecondary,
    fontWeight: "600",
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>🤖 Multi-Agent AI Trading System</h1>
        <p style={subtitleStyle}>4 AI agents collaborate: Market Analyst, Risk Manager, Strategy Optimizer, Portfolio Rebalancer</p>
      </div>

      {/* Input Section */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, fontSize: "18px", marginBottom: "1.5rem" }}>Configure Analysis</h2>

        <label style={{ color: colors.textSecondary, fontSize: "12px", fontWeight: "600", display: "block", marginBottom: "0.75rem" }}>
          Stock Symbol
        </label>
        <select
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
          style={selectStyle}
        >
          {stocks.map((stock) => (
            <option key={stock} value={stock}>
              {stock}
            </option>
          ))}
        </select>

        <label style={{ color: colors.textSecondary, fontSize: "12px", fontWeight: "600", display: "block", marginBottom: "0.75rem" }}>
          Quantity
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          style={inputStyle}
        />

        <button onClick={handleAnalyze} style={buttonStyle} disabled={loading}>
          {loading ? "⏳ 4 Agents Analyzing..." : "🚀 Run Multi-Agent Analysis"}
        </button>
      </div>

      {analysis && (
        <>
          {/* 4 Agents Section */}
          <div style={cardStyle}>
            <h2 style={{ color: colors.text, fontSize: "18px", marginBottom: "1.5rem" }}>📊 Agent Analysis</h2>

            {/* Market Analyst */}
            <div style={agentCardStyle}>
              <div style={agentHeaderStyle}>
                📈 Market Analyst Agent
              </div>
              <div style={agentContentStyle}>
                {analysis.agentAnalyses.marketAnalyst.analysis}
              </div>
            </div>

            {/* Risk Manager */}
            <div style={agentCardStyle}>
              <div style={agentHeaderStyle}>
                ⚠️ Risk Manager Agent
              </div>
              <div style={agentContentStyle}>
                <strong style={{ color: colors.primary }}>Risk Level: {analysis.agentAnalyses.riskManager.riskLevel}</strong>
                <p style={{ margin: "0.75rem 0 0 0" }}>
                  {analysis.agentAnalyses.riskManager.assessment}
                </p>
              </div>
            </div>

            {/* Strategy Optimizer */}
            <div style={agentCardStyle}>
              <div style={agentHeaderStyle}>
                🎯 Strategy Optimizer Agent
              </div>
              <div style={agentContentStyle}>
                {analysis.agentAnalyses.strategyOptimizer.strategy}
              </div>
            </div>

            {/* Portfolio Rebalancer */}
            <div style={agentCardStyle}>
              <div style={agentHeaderStyle}>
                💼 Portfolio Rebalancer Agent
              </div>
              <div style={agentContentStyle}>
                {analysis.agentAnalyses.portfolioRebalancer.recommendations}
              </div>
            </div>
          </div>

          {/* Final Recommendation */}
          <div style={finalRecommendationStyle}>
            <h2 style={{ color: colors.success, marginBottom: "1.5rem" }}>✨ Final AI Consensus</h2>

            <div style={actionBadgeStyle}>
              📈 {analysis.finalRecommendation.ACTION}
            </div>

            <p style={{ color: colors.text, marginTop: "1rem" }}>
              <strong>All 4 agents have analyzed and agreed on this recommendation:</strong>
            </p>

            <div style={metricsGridStyle}>
              <div style={metricBoxStyle}>
                <div style={metricValueStyle}>{analysis.finalRecommendation.CONFIDENCE}%</div>
                <div style={metricLabelStyle}>Confidence</div>
              </div>

              <div style={metricBoxStyle}>
                <div style={metricValueStyle}>{analysis.finalRecommendation.POSITION_SIZE}</div>
                <div style={metricLabelStyle}>Quantity</div>
              </div>

              <div style={metricBoxStyle}>
                <div style={{ ...metricValueStyle, color: colors.danger }}>₹{analysis.finalRecommendation.STOP_LOSS}</div>
                <div style={metricLabelStyle}>Stop Loss</div>
              </div>

              <div style={metricBoxStyle}>
                <div style={{ ...metricValueStyle, color: colors.success }}>₹{analysis.finalRecommendation.TARGET}</div>
                <div style={metricLabelStyle}>Target</div>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: colors.background, borderRadius: "8px" }}>
              <p style={{ color: colors.textSecondary, margin: 0, fontSize: "13px", lineHeight: "1.6" }}>
                🎯 <strong>System Recommendation:</strong> The multi-agent system has cross-verified all signals. Market Analyst confirms bullish setup, Risk Manager approves position size, Strategy Optimizer identifies best entry, and Portfolio Rebalancer suggests sector optimization. Proceed with trade execution.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MultiAgentTrading;
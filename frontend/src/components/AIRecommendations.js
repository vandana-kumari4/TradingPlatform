import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import designSystem from "../styles/designSystem";
import {
  Zap,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Loader,
} from "lucide-react";
import { Card, Select, Button, Badge, EmptyState } from "./UI";

export const AIRecommendations = () => {
  const { isDark } = useTheme();
  const { colors, spacing, typography, radius, shadow, transitions } = designSystem;

  const [selectedStock, setSelectedStock] = useState("INFY");
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const stocks = ["INFY", "TCS", "HDFCBANK", "WIPRO", "RELIANCE", "SBIN"];

  const getMockRecommendation = (symbol) => {
    const mockData = {
      INFY: {
        symbol: "INFY",
        currentPrice: 1550,
        targetPrice: 1650,
        expectedReturn: 6.45,
        action: "BUY",
        confidence: 82,
        riskLevel: "LOW",
        reasons: [
          {
            title: "Technical Setup",
            description: "RSI at 35 indicates oversold condition. Strong support at ₹1500 level with bullish divergence.",
          },
          {
            title: "Fundamental Strength",
            description: "P/E ratio 22.5 is reasonable for IT sector. Strong earnings growth and stable dividend policy.",
          },
          {
            title: "Market Sentiment",
            description: "Positive news flow. Institutional buying interest. Technical setup forming golden cross.",
          },
          {
            title: "Risk Mitigation",
            description: "Low volatility. Risk-reward ratio 1:2. Clear support and resistance levels defined.",
          },
        ],
        insight:
          "INFY shows strong technical setup with oversold RSI and positive sentiment. Entry point is attractive for medium-term gains. Recommend accumulating on dips.",
      },
      TCS: {
        symbol: "TCS",
        currentPrice: 3400,
        targetPrice: 3600,
        expectedReturn: 5.88,
        action: "HOLD",
        confidence: 65,
        riskLevel: "MEDIUM",
        reasons: [
          {
            title: "Technical Analysis",
            description: "RSI at 42, consolidating near moving averages. No clear breakout signal yet.",
          },
          {
            title: "Fundamental Health",
            description: "Strong earnings, but valuation is fair. No major catalyst visible in near term.",
          },
          {
            title: "Market Outlook",
            description: "Neutral sentiment with mixed signals. Awaiting quarterly results for direction.",
          },
          {
            title: "Risk Assessment",
            description: "Medium volatility. Wait for clearer direction before initiating new positions.",
          },
        ],
        insight:
          "TCS is fairly valued. Current price reflects most positives. Recommend waiting for clearer technical breakout or dip before fresh entry.",
      },
      HDFCBANK: {
        symbol: "HDFCBANK",
        currentPrice: 1550,
        targetPrice: 1450,
        expectedReturn: -6.45,
        action: "SELL",
        confidence: 71,
        riskLevel: "MEDIUM",
        reasons: [
          {
            title: "Technical Weakness",
            description: "Price touching upper Bollinger Band. Overbought condition on hourly charts.",
          },
          {
            title: "Valuation Concern",
            description: "Good fundamentals but price stretched. Premium to sector average widening.",
          },
          {
            title: "Sector Headwinds",
            description: "Negative sector sentiment affecting banking stocks. Rate hike expectations cooling.",
          },
          {
            title: "Profit Booking",
            description: "Opportunity at resistance levels. Strong support at ₹1500. Risk-reward favoring sells.",
          },
        ],
        insight:
          "HDFCBANK is overbought near resistance. Sell signals forming with sector weakness. Recommend booking profits or waiting for support.",
      },
      WIPRO: {
        symbol: "WIPRO",
        currentPrice: 450,
        targetPrice: 500,
        expectedReturn: 11.11,
        action: "BUY",
        confidence: 79,
        riskLevel: "LOW",
        reasons: [
          {
            title: "Technical Breakout",
            description: "Bullish MACD crossover. RSI at 28 shows strong buy signal. Volume surge confirming.",
          },
          {
            title: "Valuation Discount",
            description: "Trading at discount to peers. Strong dividend yield. Good dividend history.",
          },
          {
            title: "Recovery Signals",
            description: "Recovering from oversold levels. Positive recovery signals on multiple timeframes.",
          },
          {
            title: "Risk Control",
            description: "Low risk entry with strong support at ₹430. Clear risk-reward setup 1:1.5.",
          },
        ],
        insight:
          "WIPRO offers excellent buying opportunity at current levels. Strong technical and fundamental support. Recommend accumulating in tranches.",
      },
      RELIANCE: {
        symbol: "RELIANCE",
        currentPrice: 2100,
        targetPrice: 2250,
        expectedReturn: 7.14,
        action: "BUY",
        confidence: 75,
        riskLevel: "MEDIUM",
        reasons: [
          {
            title: "Bullish Trend",
            description: "Bullish trend intact. Golden cross on moving averages. Strong momentum building.",
          },
          {
            title: "Strong Fundamentals",
            description: "Strong quarterly results. Robust dividend policy. Expansion plans on track.",
          },
          {
            title: "Sector Recovery",
            description: "Positive outlook on energy sector recovery. Geopolitical tailwinds supporting.",
          },
          {
            title: "Medium-term Play",
            description: "Medium risk but good risk-reward for long-term. Support levels holding strong.",
          },
        ],
        insight:
          "RELIANCE shows strong fundamentals with positive technical setup. Good for medium to long-term holding. Recommend hold for existing and buy on dips.",
      },
      SBIN: {
        symbol: "SBIN",
        currentPrice: 580,
        targetPrice: 640,
        expectedReturn: 10.34,
        action: "BUY",
        confidence: 80,
        riskLevel: "LOW",
        reasons: [
          {
            title: "Breakout Confirmed",
            description: "Strong breakout above resistance. Volume surge confirming the move. Momentum strong.",
          },
          {
            title: "Business Strength",
            description: "Bank showing strong credit growth and NIM expansion. Deposit growth healthy.",
          },
          {
            title: "Sector Uptrend",
            description: "Banking sector in uptrend with positive headlines. RBI policy supportive.",
          },
          {
            title: "Low Volatility",
            description: "Low volatility with strong support systems. Clear uptrend channel forming.",
          },
        ],
        insight:
          "SBIN is in strong uptrend with fundamental tailwinds. Breakout confirmed with volume support. Recommend accumulating on minor dips.",
      },
    };

    return mockData[symbol] || mockData.INFY;
  };

  const handleGetRecommendation = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRecommendation(getMockRecommendation(selectedStock));
      setLoading(false);
    }, 1500);
  };

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

  const inputCardStyle = {
    backgroundColor: colors.bgPrimary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    boxShadow: shadow.xs,
  };

  const inputLabelStyle = {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    display: "block",
  };

  const inputGroupStyle = {
    display: "flex",
    gap: spacing.lg,
    alignItems: "flex-end",
    marginBottom: spacing.lg,
  };

  const recommendationContainerStyle = {
    backgroundColor: colors.bgPrimary,
    border: `2px solid ${colors.primary}`,
    borderRadius: radius.lg,
    padding: spacing.xl,
    boxShadow: shadow.md,
  };

  const headerActionStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottom: `1px solid ${colors.border}`,
  };

  const actionBadgeStyle = (action) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: spacing.sm,
    padding: `${spacing.md} ${spacing.lg}`,
    borderRadius: radius.lg,
    fontWeight: 700,
    fontSize: "18px",
    color: "white",
    backgroundColor:
      action === "BUY"
        ? colors.success
        : action === "SELL"
        ? colors.error
        : colors.warning,
  });

  const symbolStyle = {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  };

  const confidenceSectionStyle = {
    backgroundColor: colors.bgSecondary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  };

  const confidenceHeaderStyle = {
    fontSize: "12px",
    fontWeight: 600,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
  };

  const confidenceBarContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: spacing.md,
  };

  const confidenceBarStyle = {
    flex: 1,
    height: "8px",
    backgroundColor: colors.border,
    borderRadius: radius.full,
    overflow: "hidden",
  };

  const confidenceFillStyle = (confidence) => ({
    height: "100%",
    width: `${confidence}%`,
    backgroundColor:
      confidence > 70 ? colors.success : confidence > 40 ? colors.warning : colors.error,
    transition: transitions.base,
  });

  const confidenceValueStyle = {
    fontSize: "16px",
    fontWeight: 700,
    color: colors.textPrimary,
    minWidth: "50px",
  };

  const metricsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: spacing.lg,
    marginBottom: spacing.xl,
  };

  const metricBoxStyle = {
    backgroundColor: colors.bgSecondary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    textAlign: "center",
  };

  const metricValueStyle = {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.sm,
  };

  const metricLabelStyle = {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: 500,
  };

  const reasonsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: spacing.lg,
    marginBottom: spacing.xl,
  };

  const reasonCardStyle = {
    backgroundColor: colors.bgSecondary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
  };

  const reasonTitleStyle = {
    ...typography.bodyLarge,
    fontWeight: 600,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  };

  const reasonDescStyle = {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: "1.6",
  };

  const insightBoxStyle = {
    backgroundColor: `${colors.primary}10`,
    border: `2px solid ${colors.primary}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
  };

  const insightLabelStyle = {
    ...typography.label,
    color: colors.primary,
    marginBottom: spacing.sm,
  };

  const insightTextStyle = {
    ...typography.bodyLarge,
    color: colors.textPrimary,
    lineHeight: "1.8",
  };

  const loadingContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: `${spacing["3xl"]} ${spacing.xl}`,
    gap: spacing.lg,
  };

  const spinnerStyle = {
    animation: "spin 1s linear infinite",
  };

  // COMPONENT
  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={contentStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h1 style={headerTitleStyle}>AI Stock Recommendations</h1>
          <p style={headerSubtitleStyle}>
            Claude AI analyzes technical, fundamental, and sentiment data to provide
            actionable recommendations
          </p>
        </div>

        {/* INPUT SECTION */}
        <div style={inputCardStyle}>
          <div style={inputGroupStyle}>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <label style={inputLabelStyle}>Select Stock Symbol</label>
              <Select
                options={stocks.map((stock) => ({
                  value: stock,
                  label: stock,
                }))}
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                fullWidth
              />
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={handleGetRecommendation}
              disabled={loading}
              icon={loading ? Loader : Zap}
            >
              {loading ? "Analyzing..." : "Get Recommendation"}
            </Button>
          </div>
        </div>

        {/* EMPTY STATE */}
        {!recommendation && !loading && (
          <EmptyState
            icon={Zap}
            title="Ready to analyze"
            description="Select a stock and click 'Get Recommendation' to get AI-powered investment insights"
            actionLabel="Get Started"
            onAction={handleGetRecommendation}
          />
        )}

        {/* LOADING STATE */}
        {loading && (
          <div style={recommendationContainerStyle}>
            <div style={loadingContainerStyle}>
              <Loader size={48} color={colors.primary} style={spinnerStyle} />
              <p style={{ ...typography.bodyLarge, color: colors.textSecondary }}>
                Claude AI is analyzing the stock...
              </p>
              <div
                style={{
                  fontSize: "12px",
                  color: colors.textTertiary,
                  textAlign: "center",
                }}
              >
                Analyzing technical indicators, fundamentals, and market sentiment
              </div>
            </div>
          </div>
        )}

        {/* RECOMMENDATION RESULT */}
        {recommendation && !loading && (
          <div style={recommendationContainerStyle}>
            {/* HEADER */}
            <div style={headerActionStyle}>
              <div>
                <h2 style={symbolStyle}>{recommendation.symbol}</h2>
                <div style={{ display: "flex", gap: spacing.sm, alignItems: "center" }}>
                  <span style={{ ...typography.bodyLarge, color: colors.textSecondary }}>
                    Current: ₹{recommendation.currentPrice}
                  </span>
                  <span style={{ ...typography.bodyLarge, color: colors.textSecondary }}>
                    →
                  </span>
                  <span style={{ ...typography.bodyLarge, color: colors.success }}>
                    Target: ₹{recommendation.targetPrice}
                  </span>
                </div>
              </div>
              <div style={actionBadgeStyle(recommendation.action)}>
                {recommendation.action === "BUY" ? (
                  <TrendingUp size={20} />
                ) : recommendation.action === "SELL" ? (
                  <TrendingDown size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                {recommendation.action}
              </div>
            </div>

            {/* CONFIDENCE */}
            <div style={confidenceSectionStyle}>
              <div style={confidenceHeaderStyle}>AI Confidence Score</div>
              <div style={confidenceBarContainerStyle}>
                <div style={confidenceBarStyle}>
                  <div style={confidenceFillStyle(recommendation.confidence)} />
                </div>
                <div style={confidenceValueStyle}>{recommendation.confidence}%</div>
              </div>
            </div>

            {/* KEY METRICS */}
            <div style={metricsGridStyle}>
              <div style={metricBoxStyle}>
                <div style={metricValueStyle}>₹{recommendation.targetPrice}</div>
                <div style={metricLabelStyle}>Target Price</div>
              </div>
              <div style={metricBoxStyle}>
                <div
                  style={{
                    ...metricValueStyle,
                    color:
                      recommendation.expectedReturn > 0 ? colors.success : colors.error,
                  }}
                >
                  {recommendation.expectedReturn > 0 ? "+" : ""}
                  {recommendation.expectedReturn.toFixed(2)}%
                </div>
                <div style={metricLabelStyle}>Expected Return</div>
              </div>
              <div style={metricBoxStyle}>
                <div style={metricValueStyle}>
                  <Badge
                    variant={
                      recommendation.riskLevel === "LOW"
                        ? "success"
                        : recommendation.riskLevel === "MEDIUM"
                        ? "warning"
                        : "error"
                    }
                    size="md"
                  >
                    {recommendation.riskLevel}
                  </Badge>
                </div>
                <div style={metricLabelStyle}>Risk Level</div>
              </div>
            </div>

            {/* REASONS */}
            <div>
              <h3 style={{ ...typography.h3, color: colors.textPrimary, marginBottom: spacing.lg }}>
                Why This Recommendation?
              </h3>
              <div style={reasonsGridStyle}>
                {recommendation.reasons.map((reason, idx) => (
                  <div key={idx} style={reasonCardStyle}>
                    <div style={reasonTitleStyle}>{reason.title}</div>
                    <div style={reasonDescStyle}>{reason.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* INSIGHT */}
            <div style={insightBoxStyle}>
              <div style={insightLabelStyle}>
                <CheckCircle size={14} style={{ marginRight: spacing.xs }} />
                Claude AI Insight
              </div>
              <p style={insightTextStyle}>{recommendation.insight}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendations;
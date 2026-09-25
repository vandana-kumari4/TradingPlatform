const express = require("express");
const Anthropic = require("@anthropic-ai/sdk");

const router = express.Router();
const client = new Anthropic();

// Mock market data
const marketData = {
  INFY: { price: 1550, rsi: 35, trend: "bullish", sentiment: "positive", volume: 2500000 },
  TCS: { price: 3400, rsi: 42, trend: "neutral", sentiment: "neutral", volume: 1800000 },
  HDFCBANK: { price: 1550, rsi: 45, trend: "bearish", sentiment: "negative", volume: 3200000 },
  WIPRO: { price: 450, rsi: 28, trend: "bullish", sentiment: "positive", volume: 1500000 },
  RELIANCE: { price: 2100, rsi: 52, trend: "neutral", sentiment: "positive", volume: 2000000 },
  SBIN: { price: 580, rsi: 38, trend: "bullish", sentiment: "positive", volume: 2800000 },
};

// Market Analyst Agent
const marketAnalystAgent = async (symbol) => {
  const data = marketData[symbol];
  
  const prompt = `As a Market Analyst Agent, analyze ${symbol}:
Price: ₹${data.price}, RSI: ${data.rsi}, Trend: ${data.trend}, Sentiment: ${data.sentiment}

Provide technical analysis in 2-3 sentences. Focus on: trend strength, momentum, entry/exit signals.
Keep response concise and actionable.`;

  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 300,
    messages: [{ role: "user", content: prompt }],
  });

  return {
    agent: "Market Analyst",
    analysis: message.content[0].text,
  };
};

// Risk Manager Agent
const riskManagerAgent = async (symbol, quantity, portfolioValue) => {
  const data = marketData[symbol];
  const tradeValue = data.price * quantity;
  const riskPercentage = (tradeValue / portfolioValue) * 100;

  const prompt = `As a Risk Manager Agent, assess risk for ${symbol}:
Trade Value: ₹${tradeValue}, Portfolio: ₹${portfolioValue}, Risk %: ${riskPercentage.toFixed(2)}%
RSI: ${data.rsi}, Volume: ${data.volume}

Provide risk assessment (LOW/MEDIUM/HIGH) and recommended position size.
Keep response concise.`;

  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 300,
    messages: [{ role: "user", content: prompt }],
  });

  return {
    agent: "Risk Manager",
    assessment: message.content[0].text,
    riskLevel: riskPercentage > 10 ? "HIGH" : riskPercentage > 5 ? "MEDIUM" : "LOW",
  };
};

// Strategy Optimizer Agent
const strategyOptimizerAgent = async (symbol) => {
  const data = marketData[symbol];

  const prompt = `As a Strategy Optimizer Agent, recommend best strategy for ${symbol}:
Trend: ${data.trend}, RSI: ${data.rsi}, Sentiment: ${data.sentiment}

Suggest ONE best strategy from: SMA Crossover, RSI Divergence, Bollinger Bounce, Momentum Trade
Explain why this strategy works best for current conditions (2-3 sentences).`;

  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 300,
    messages: [{ role: "user", content: prompt }],
  });

  return {
    agent: "Strategy Optimizer",
    strategy: message.content[0].text,
  };
};

// Portfolio Rebalancer Agent
const portfolioRebalancerAgent = async (portfolio) => {
  const prompt = `As a Portfolio Rebalancer Agent, review this portfolio:
Holdings: ${JSON.stringify(portfolio)}

Suggest 2-3 rebalancing moves to optimize:
1. Risk distribution
2. Sector concentration
3. Profit-taking opportunities

Keep suggestions actionable and concise.`;

  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 300,
    messages: [{ role: "user", content: prompt }],
  });

  return {
    agent: "Portfolio Rebalancer",
    recommendations: message.content[0].text,
  };
};

// Multi-Agent System Orchestrator
router.post("/analyze", async (req, res) => {
  try {
    const { symbol, quantity, portfolioValue, portfolio } = req.body;

    if (!marketData[symbol]) {
      return res.status(400).json({ error: "Stock not found" });
    }

    // Run all 4 agents in parallel
    const [marketAnalysis, riskAssessment, strategyOptimization, portfolioRebalancing] = await Promise.all([
      marketAnalystAgent(symbol),
      riskManagerAgent(symbol, quantity, portfolioValue),
      strategyOptimizerAgent(symbol),
      portfolioRebalancerAgent(portfolio),
    ]);

    // Generate final recommendation from all agents
    const finalPrompt = `Based on these 4 agent analyses:

Market Analysis: ${marketAnalysis.analysis}
Risk Assessment: ${riskAssessment.assessment}
Strategy: ${strategyOptimization.strategy}
Portfolio Rebalancing: ${portfolioRebalancing.recommendations}

Provide ONE final action recommendation:
- ACTION: BUY/SELL/HOLD
- CONFIDENCE: 70-95%
- POSITION_SIZE: quantity
- STOP_LOSS: price
- TARGET: price

Format as JSON only.`;

    const finalMessage = await client.messages.create({
      model: "claude-opus-4-1",
      max_tokens: 400,
      messages: [{ role: "user", content: finalPrompt }],
    });

    const finalRecommendation = JSON.parse(finalMessage.content[0].text);

    res.json({
      success: true,
      symbol,
      agentAnalyses: {
        marketAnalyst: marketAnalysis,
        riskManager: riskAssessment,
        strategyOptimizer: strategyOptimization,
        portfolioRebalancer: portfolioRebalancing,
      },
      finalRecommendation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
const express = require("express");
const Anthropic = require("@anthropic-ai/sdk");

const router = express.Router();
const client = new Anthropic();

// Mock stock data
const stockData = {
  INFY: {
    currentPrice: 1550,
    high52Week: 1850,
    low52Week: 1200,
    marketCap: 650000,
    pe: 22.5,
    volume: 2500000,
    rsi: 35,
    macd: "Bullish",
    bollingerStatus: "Near Lower Band",
    sentiment: "Positive",
  },
  TCS: {
    currentPrice: 3400,
    high52Week: 4200,
    low52Week: 2800,
    marketCap: 1200000,
    pe: 28.3,
    volume: 1800000,
    rsi: 42,
    macd: "Neutral",
    bollingerStatus: "Middle",
    sentiment: "Neutral",
  },
  HDFCBANK: {
    currentPrice: 1550,
    high52Week: 1900,
    low52Week: 1300,
    marketCap: 950000,
    pe: 18.5,
    volume: 3200000,
    rsi: 45,
    macd: "Bearish",
    bollingerStatus: "Near Upper Band",
    sentiment: "Negative",
  },
  WIPRO: {
    currentPrice: 450,
    high52Week: 650,
    low52Week: 380,
    marketCap: 200000,
    pe: 15.2,
    volume: 1500000,
    rsi: 28,
    macd: "Bullish",
    bollingerStatus: "Oversold",
    sentiment: "Positive",
  },
  RELIANCE: {
    currentPrice: 2100,
    high52Week: 2800,
    low52Week: 1900,
    marketCap: 1750000,
    pe: 25.8,
    volume: 2000000,
    rsi: 52,
    macd: "Neutral",
    bollingerStatus: "Middle",
    sentiment: "Positive",
  },
  SBIN: {
    currentPrice: 580,
    high52Week: 750,
    low52Week: 520,
    marketCap: 550000,
    pe: 11.5,
    volume: 2800000,
    rsi: 38,
    macd: "Bullish",
    bollingerStatus: "Lower Band",
    sentiment: "Positive",
  },
};

// Get AI Recommendation
router.post("/analyze", async (req, res) => {
  try {
    const { symbol } = req.body;

    if (!stockData[symbol]) {
      return res.status(400).json({ error: "Stock not found" });
    }

    const stock = stockData[symbol];

    // Create Claude prompt
    const prompt = `
You are an expert stock analyst. Analyze the following stock data and provide a trading recommendation.

Stock: ${symbol}
Current Price: ₹${stock.currentPrice}
52-Week High: ₹${stock.high52Week}
52-Week Low: ₹${stock.low52Week}
Market Cap: ₹${stock.marketCap} Cr
P/E Ratio: ${stock.pe}
Volume: ${stock.volume.toLocaleString()} shares
RSI (14): ${stock.rsi}
MACD Signal: ${stock.macd}
Bollinger Bands: ${stock.bollingerStatus}
Market Sentiment: ${stock.sentiment}

Provide your analysis in JSON format with these exact fields:
{
  "action": "BUY" or "SELL" or "HOLD",
  "confidence": 65-95 (confidence percentage),
  "targetPrice": (predicted price in 3 months),
  "expectedReturn": (percentage return),
  "riskLevel": "LOW" or "MEDIUM" or "HIGH",
  "reasons": [
    {"title": "Technical Analysis", "description": "brief explanation"},
    {"title": "Fundamental Analysis", "description": "brief explanation"},
    {"title": "Market Sentiment", "description": "brief explanation"},
    {"title": "Risk Assessment", "description": "brief explanation"}
  ],
  "insight": "Brief AI insight about this stock in 1-2 sentences"
}

Respond ONLY with valid JSON, no other text.
    `;

    // Call Claude API
    const message = await client.messages.create({
      model: "claude-opus-4-1",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Parse Claude's response
    const responseText = message.content[0].text;
    const recommendation = JSON.parse(responseText);

    // Add additional data
    const finalRecommendation = {
      symbol,
      currentPrice: stock.currentPrice,
      ...recommendation,
    };

    res.json({
      success: true,
      recommendation: finalRecommendation,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get multiple stocks analysis
router.post("/analyze-portfolio", async (req, res) => {
  try {
    const { symbols } = req.body;

    const recommendations = [];

    for (const symbol of symbols) {
      if (!stockData[symbol]) continue;

      const stock = stockData[symbol];

      const prompt = `
Analyze ${symbol} briefly. Current Price: ₹${stock.currentPrice}, RSI: ${stock.rsi}, Sentiment: ${stock.sentiment}.

Respond ONLY with JSON:
{
  "action": "BUY" or "SELL" or "HOLD",
  "confidence": 65-90,
  "expectedReturn": (percentage),
  "riskLevel": "LOW" or "MEDIUM" or "HIGH"
}
      `;

      const message = await client.messages.create({
        model: "claude-opus-4-1",
        max_tokens: 500,
        messages: [{ role: "user", content: prompt }],
      });

      const recommendation = JSON.parse(message.content[0].text);
      recommendations.push({
        symbol,
        currentPrice: stock.currentPrice,
        ...recommendation,
      });
    }

    res.json({
      success: true,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
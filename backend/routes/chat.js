const express = require("express");
const router = express.Router();

const STOCKS = {
  INFY: { price: 1550, pe: 22.5, sector: "IT" },
  TCS: { price: 3400, pe: 18.2, sector: "IT" },
  HDFCBANK: { price: 1550, pe: 25.3, sector: "Banking" },
  WIPRO: { price: 450, pe: 16.8, sector: "IT" },
  RELIANCE: { price: 2100, pe: 20.1, sector: "Energy" },
};

const generateResponse = (message) => {
  const msg = message.toLowerCase();

  if (msg.includes("price")) {
    const stocks = Object.keys(STOCKS);
    return `Current prices: ${stocks.map(s => `${s} - ₹${STOCKS[s].price}`).join(", ")}`;
  }

  if (msg.includes("buy") || msg.includes("should i")) {
    return "📈 Based on current market trends: INFY and TCS show strong growth potential. Consider a 70% portfolio allocation to IT sector.";
  }

  if (msg.includes("portfolio")) {
    return "💼 Recommended portfolio:\n- 40% IT (INFY, TCS)\n- 30% Banking (HDFCBANK)\n- 20% Energy (RELIANCE)\n- 10% Cash";
  }

  if (msg.includes("risk")) {
    return "⚠️ Risk Tips:\n1. Use stop-loss (2-3%)\n2. Diversify sectors\n3. Keep 20% defensive\n4. Never over-invest";
  }

  if (msg.includes("market")) {
    return "📊 Market Insight: Nifty 50 at 44,500. Banking consolidating. IT showing strength. Consider dip buying.";
  }

  return "💡 Ask about: Stock prices, Portfolio advice, Risk management, Market trends";
};

router.post("/", (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message required" });
  res.json({ reply: generateResponse(message) });
});

module.exports = router;
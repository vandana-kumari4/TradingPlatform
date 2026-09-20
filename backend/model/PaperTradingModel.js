const mongoose = require("mongoose");

const paperTradingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  virtualBalance: { type: Number, default: 1000000 },
  trades: [
    {
      symbol: String,
      type: String, // "BUY" or "SELL"
      quantity: Number,
      entryPrice: Number,
      exitPrice: { type: Number, default: null },
      entryDate: Date,
      exitDate: { type: Date, default: null },
      status: { type: String, default: "OPEN" }, // OPEN or CLOSED
      profitLoss: { type: Number, default: 0 },
      profitLossPercentage: { type: Number, default: 0 },
    },
  ],
  totalTrades: { type: Number, default: 0 },
  winningTrades: { type: Number, default: 0 },
  losingTrades: { type: Number, default: 0 },
  winRate: { type: Number, default: 0 },
  totalProfitLoss: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const PaperTradingModel = mongoose.model("paperTrading", paperTradingSchema);

module.exports = { PaperTradingModel };
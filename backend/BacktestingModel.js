const mongoose = require("mongoose");

const backtestingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  strategyName: String,
  symbol: String,
  startDate: Date,
  endDate: Date,
  initialCapital: Number,
  finalCapital: Number,
  totalReturn: Number,
  returnPercentage: Number,
  maxDrawdown: Number,
  sharpeRatio: Number,
  winRate: Number,
  totalTrades: Number,
  winningTrades: Number,
  losingTrades: Number,
  averageWin: Number,
  averageLoss: Number,
  profitFactor: Number,
  trades: [
    {
      date: Date,
      type: String,
      price: Number,
      quantity: Number,
    },
  ],
  parameters: {
    movingAverage1: Number,
    movingAverage2: Number,
    rsiPeriod: Number,
    stopLoss: Number,
    takeProfit: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

const BacktestingModel = mongoose.model("backtesting", backtestingSchema);

module.exports = { BacktestingModel };
const express = require("express");
const { PaperTradingModel } = require("../model/PaperTradingModel");
const { BacktestingModel } = require("../model/BacktestingModel");
const { calculateBacktest } = require("../services/backtestingService");

const router = express.Router();

// Get Paper Trading Portfolio
router.get("/portfolio/:userId", async (req, res) => {
  try {
    let portfolio = await PaperTradingModel.findOne({ userId: req.params.userId });

    if (!portfolio) {
      portfolio = new PaperTradingModel({ userId: req.params.userId });
      await portfolio.save();
    }

    res.json({
      success: true,
      portfolio: {
        userId: portfolio.userId,
        virtualBalance: portfolio.virtualBalance,
        totalTrades: portfolio.totalTrades,
        winRate: portfolio.winRate,
        totalProfitLoss: portfolio.totalProfitLoss,
        openTrades: portfolio.trades.filter(t => t.status === "OPEN"),
        closedTrades: portfolio.trades.filter(t => t.status === "CLOSED"),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Place Paper Trade
router.post("/trade", async (req, res) => {
  try {
    const { userId, symbol, type, quantity, entryPrice } = req.body;

    let portfolio = await PaperTradingModel.findOne({ userId });
    if (!portfolio) {
      portfolio = new PaperTradingModel({ userId });
    }

    const tradeValue = quantity * entryPrice;

    if (type === "BUY" && tradeValue > portfolio.virtualBalance) {
      return res.status(400).json({ error: "Insufficient virtual balance" });
    }

    const trade = {
      symbol,
      type,
      quantity,
      entryPrice,
      entryDate: new Date(),
      status: "OPEN",
    };

    portfolio.trades.push(trade);
    portfolio.totalTrades += 1;

    if (type === "BUY") {
      portfolio.virtualBalance -= tradeValue;
    }

    await portfolio.save();

    res.json({
      success: true,
      message: "Paper trade executed",
      trade,
      remainingBalance: portfolio.virtualBalance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Close Paper Trade
router.post("/close-trade", async (req, res) => {
  try {
    const { userId, tradeId, exitPrice } = req.body;

    const portfolio = await PaperTradingModel.findOne({ userId });
    const trade = portfolio.trades.id(tradeId);

    if (!trade) {
      return res.status(404).json({ error: "Trade not found" });
    }

    trade.exitPrice = exitPrice;
    trade.exitDate = new Date();
    trade.status = "CLOSED";

    const profitLoss = (exitPrice - trade.entryPrice) * trade.quantity;
    const profitLossPercentage = ((exitPrice - trade.entryPrice) / trade.entryPrice) * 100;

    trade.profitLoss = profitLoss;
    trade.profitLossPercentage = profitLossPercentage;

    if (profitLoss > 0) {
      portfolio.winningTrades += 1;
    } else {
      portfolio.losingTrades += 1;
    }

    portfolio.totalProfitLoss += profitLoss;
    portfolio.virtualBalance += trade.quantity * exitPrice;
    portfolio.winRate = (portfolio.winningTrades / portfolio.totalTrades) * 100;

    await portfolio.save();

    res.json({
      success: true,
      message: "Trade closed",
      trade,
      profitLoss,
      profitLossPercentage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Run Backtest
router.post("/backtest", async (req, res) => {
  try {
    const { userId, strategyName, symbol, historicalData, strategy } = req.body;

    const results = calculateBacktest(historicalData, strategy);

    const backtest = new BacktestingModel({
      userId,
      strategyName,
      symbol,
      startDate: strategy.startDate,
      endDate: strategy.endDate,
      initialCapital: strategy.initialCapital,
      finalCapital: results.finalCapital,
      totalReturn: results.totalReturn,
      returnPercentage: results.returnPercentage,
      winRate: results.winRate,
      totalTrades: results.totalTrades,
      winningTrades: results.winningTrades,
      losingTrades: results.losingTrades,
      sharpeRatio: results.sharpeRatio,
      trades: results.trades,
      parameters: strategy.parameters,
    });

    await backtest.save();

    res.json({
      success: true,
      message: "Backtest completed",
      results: {
        strategyName,
        symbol,
        initialCapital: strategy.initialCapital,
        finalCapital: results.finalCapital,
        totalReturn: results.totalReturn,
        returnPercentage: results.returnPercentage,
        winRate: results.winRate,
        totalTrades: results.totalTrades,
        winningTrades: results.winningTrades,
        losingTrades: results.losingTrades,
        sharpeRatio: results.sharpeRatio,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Backtest History
router.get("/backtest-history/:userId", async (req, res) => {
  try {
    const backtests = await BacktestingModel.find({ userId: req.params.userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      backtests,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
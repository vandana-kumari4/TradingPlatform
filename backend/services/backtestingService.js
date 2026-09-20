// Simple backtesting calculator
const calculateBacktest = (historicalData, strategy) => {
  let capital = strategy.initialCapital;
  let position = null;
  let trades = [];
  let winningTrades = 0;
  let losingTrades = 0;

  for (let i = 0; i < historicalData.length; i++) {
    const candle = historicalData[i];
    const sma12 = calculateSMA(historicalData.slice(Math.max(0, i - 11), i + 1), 12);
    const sma26 = calculateSMA(historicalData.slice(Math.max(0, i - 25), i + 1), 26);

    // Trading Logic: SMA Crossover
    if (sma12 > sma26 && !position) {
      // BUY Signal
      position = {
        type: "BUY",
        entryPrice: candle.close,
        entryDate: candle.date,
        quantity: Math.floor(capital / candle.close),
      };
    } else if (sma12 < sma26 && position && position.type === "BUY") {
      // SELL Signal
      const exitPrice = candle.close;
      const profitLoss = (exitPrice - position.entryPrice) * position.quantity;
      const profitLossPercentage = ((exitPrice - position.entryPrice) / position.entryPrice) * 100;

      trades.push({
        ...position,
        exitPrice,
        exitDate: candle.date,
        profitLoss,
        profitLossPercentage,
      });

      if (profitLoss > 0) {
        winningTrades++;
      } else {
        losingTrades++;
      }

      capital += profitLoss;
      position = null;
    }
  }

  const totalTrades = trades.length;
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  const totalReturn = capital - strategy.initialCapital;
  const returnPercentage = (totalReturn / strategy.initialCapital) * 100;

  // Calculate Sharpe Ratio (simplified)
  const returns = trades.map(t => t.profitLossPercentage);
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length || 0;
  const variance = returns.reduce((a, b) => a + Math.pow(b - avgReturn, 2), 0) / returns.length || 1;
  const sharpeRatio = (avgReturn / Math.sqrt(variance)) * Math.sqrt(252);

  return {
    finalCapital: capital,
    totalReturn,
    returnPercentage,
    winRate,
    totalTrades,
    winningTrades,
    losingTrades,
    sharpeRatio: isFinite(sharpeRatio) ? sharpeRatio.toFixed(2) : 0,
    trades,
  };
};

// Calculate Simple Moving Average
const calculateSMA = (data, period) => {
  if (data.length < period) return 0;
  const sum = data.slice(-period).reduce((a, b) => a + b.close, 0);
  return sum / period;
};

module.exports = { calculateBacktest };
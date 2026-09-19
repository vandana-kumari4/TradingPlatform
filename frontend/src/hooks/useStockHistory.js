import { useState, useEffect } from "react";

const FINNHUB_API_KEY = process.env.REACT_APP_FINNHUB_KEY;
const FINNHUB_BASE = "https://finnhub.io/api/v1";

export const useStockHistory = (symbol, resolution = "D") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchHistory = async () => {
      try {
        const now = Math.floor(Date.now() / 1000);
        const oneMonthAgo = now - 30 * 24 * 60 * 60; // 30 days

        const response = await fetch(
          `${FINNHUB_BASE}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${oneMonthAgo}&to=${now}&token=${FINNHUB_API_KEY}`
        );
        const result = await response.json();

        if (result.c) {
          const chartData = result.c.map((close, i) => ({
            time: new Date(result.t[i] * 1000).toLocaleDateString("en-IN"),
            price: parseFloat(close.toFixed(2)),
            open: parseFloat(result.o[i].toFixed(2)),
            high: parseFloat(result.h[i].toFixed(2)),
            low: parseFloat(result.l[i].toFixed(2)),
            volume: result.v[i],
          }));
          setData(chartData);
        }
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [symbol, resolution]);

  return { data, loading, error };
};

export default useStockHistory;
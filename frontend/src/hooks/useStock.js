import { useState, useEffect } from "react";

const FINNHUB_API_KEY = process.env.REACT_APP_FINNHUB_KEY;
const FINNHUB_BASE = "https://finnhub.io/api/v1";

export const useStock = (symbol) => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchQuote = async () => {
      try {
        const response = await fetch(
          `${FINNHUB_BASE}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
        );
        const data = await response.json();
        setQuote(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setQuote(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [symbol]);

  return { quote, loading, error };
};
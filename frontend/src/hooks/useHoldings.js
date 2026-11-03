import { useState, useEffect } from "react";

export const useHoldings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHoldings();
  }, []);

  const fetchHoldings = async () => {
    setLoading(true);
    setError("");

    try {
      console.log("Fetching holdings...");
      
      const response = await fetch("http://localhost:4000/allHoldings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data received:", data);

      if (Array.isArray(data)) {
        setHoldings(data);
        console.log("Holdings set:", data);
      } else {
        setHoldings([]);
      }

    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
      setHoldings([]);
    } finally {
      setLoading(false);
    }
  };

  return { holdings, loading, error, refetch: fetchHoldings };
};
import { useState, useEffect } from "react";

export const usePositions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:4000/allPositions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setPositions(data);
      } else {
        setPositions([]);
      }
    } catch (err) {
      setError(err.message);
      setPositions([]);
    } finally {
      setLoading(false);
    }
  };

  return { positions, loading, error, refetch: fetchPositions };
};
import { useState, useEffect } from "react";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      console.log("Fetching orders...");
      
      const response = await fetch((process.env.REACT_APP_API_URL || "http://localhost:4000") + "/allOrders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Orders response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Orders data received:", data);

      if (Array.isArray(data)) {
        setOrders(data);
      } else if (data.data && Array.isArray(data.data)) {
        setOrders(data.data);
      } else if (data.orders && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }

    } catch (err) {
      console.error("Orders fetch error:", err);
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData) => {
    try {
      const response = await fetch((process.env.REACT_APP_API_URL || "http://localhost:4000") + "/newOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        await fetchOrders();
        return { success: true };
      }
    } catch (err) {
      console.error("Create order error:", err);
      return { success: false, error: err.message };
    }
  };

  return { orders, loading, error, refetch: fetchOrders, createOrder };
};
// src/pages/MetalPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const metalConfigs = {
  XAU: { name: "Gold", color: "#FFD700", gradient: "linear-gradient(145deg, #fff8dc, #ffe066)" },
  XAG: { name: "Silver", color: "#C0C0C0", gradient: "linear-gradient(145deg, #f0f8ff, #dcdcdc)" },
  XPT: { name: "Platinum", color: "#E5E4E2", gradient: "linear-gradient(145deg, #c0c0c0, #a0a0a0)" },
  XPD: { name: "Palladium", color: "#888888", gradient: "linear-gradient(145deg, #e0e0e0, #cfcfcf)" },
};

// API from .env
const API_KEY = import.meta.env.VITE_METAL_API_KEY;
const BASE_CURRENCY = import.meta.env.VITE_BASE_CURRENCY || "INR";
const BASE_URL = `https://api.metalpriceapi.com/v1/latest?base=${BASE_CURRENCY}`;

export default function MetalPage() {
  const { code } = useParams();
  const metal = metalConfigs[code] || { name: code, color: "#555", gradient: "#f0f0f0" };

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMetalDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}&api_key=${API_KEY}&currencies=${code}`);
      const data = await res.json();
      const price = data.rates?.[`${BASE_CURRENCY}${code}`];

      if (!price) throw new Error("No price data available");

      setDetails({
        price,
        base: BASE_CURRENCY,
        lastUpdate: data.timestamp ? new Date(data.timestamp * 1000) : new Date(),
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetalDetails();
  }, [code]);

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading {metal.name} details...</p>;

  if (error)
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          padding: "1rem",
          border: "1px solid #f5c2c7",
          backgroundColor: "#f8d7da",
          color: "#842029",
          borderRadius: "8px",
          maxWidth: "500px",
          margin: "2rem auto",
        }}
      >
        <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Oops! Something went wrong.</p>
        <p>Error: {error}</p>
        <button
          onClick={fetchMetalDetails}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            border: "none",
            background: metal.color,
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Retry
        </button>
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "15px",
        background: metal.gradient,
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1rem", color: metal.color }}>
        {metal.name} ({code})
      </h1>
      <p style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
        ₹{details.price.toFixed(2)}
      </p>
      <p style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <strong>Base Currency:</strong> {details.base}
      </p>
      <p style={{ textAlign: "center" }}>
        <strong>Last Updated:</strong> {details.lastUpdate.toLocaleString()}
      </p>
    </div>
  );
}

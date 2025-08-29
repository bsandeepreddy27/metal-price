// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import goldImg from "../assets/gold.png";
import silverImg from "../assets/silver.png";
import platinumImg from "../assets/platinum.png";
import palladiumImg from "../assets/palladium.png";

// .env API
const API_KEY = import.meta.env.VITE_METAL_API_KEY;
const BASE_CURRENCY = import.meta.env.VITE_BASE_CURRENCY || "INR";
const BASE_URL = `https://api.metalpriceapi.com/v1/latest?base=${BASE_CURRENCY}`;

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const metals = [
    { code: "XAU", label: "Gold", color: "#FFD700", img: goldImg },
    { code: "XAG", label: "Silver", color: "#C0C0C0", img: silverImg },
    { code: "XPT", label: "Platinum", color: "#4B4B4B", img: platinumImg }, // darker color for visibility
    { code: "XPD", label: "Palladium", color: "#888888", img: palladiumImg },
  ];

  const getCodeByName = (name) => {
    const metal = metals.find((m) => m.label.toLowerCase() === name.toLowerCase());
    return metal ? metal.code : null;
  };

  const handleSearch = async () => {
    if (!search) return;
    const code = getCodeByName(search);
    if (!code) {
      setError("Metal not found");
      setDetails(null);
      return;
    }

    setLoading(true);
    setError(null);
    setDetails(null);
    try {
      const res = await fetch(`${BASE_URL}&api_key=${API_KEY}&currencies=${code}`);
      const data = await res.json();
      const rate = data.rates?.[`${BASE_CURRENCY}${code}`];

      if (rate) {
        setDetails({
          name: search,
          code,
          price: rate,
          base: BASE_CURRENCY,
          lastUpdate: data.timestamp ? new Date(data.timestamp * 1000) : new Date(),
        });
      } else {
        setError("No data available");
      }
    } catch (err) {
      setError("Failed to fetch price");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#333" }}>Metal Prices</h1>

      {/* Search input */}
      <div style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Enter metal name (Gold, Silver...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            marginLeft: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "none",
            background: "#333",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Search Result Details */}
      {details && (
        <div
          style={{
            border: `2px solid #333`,
            borderRadius: "15px",
            padding: "1.5rem",
            maxWidth: "400px",
            margin: "0 auto 2rem",
            background: "#f9f9f9",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "1rem", color: "#222" }}>
            {details.name} ({details.code})
          </h2>
          <p><strong>Price:</strong> ₹{details.price.toFixed(2)}</p>
          <p><strong>Base Currency:</strong> {details.base}</p>
          <p><strong>Last Updated:</strong> {details.lastUpdate.toLocaleString()}</p>
        </div>
      )}

      {/* Metal cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        {metals.map((metal) => (
          <div
            key={metal.code}
            onClick={() => navigate(`/metal/${metal.code}`)}
            style={{
              borderRadius: "15px",
              width: "180px",
              background: "#fff",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              cursor: "pointer",
              overflow: "hidden",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
            }}
          >
            <div
              style={{
                background: metal.color,
                padding: "0.8rem",
                textAlign: "center",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {metal.label}
            </div>
            <div style={{ padding: "1rem", textAlign: "center" }}>
              <img
                src={metal.img}
                alt={metal.label}
                style={{ width: "50px", height: "50px", marginBottom: "0.5rem" }}
              />
              <p style={{ color: "#555", marginBottom: "0.5rem" }}>Click to view details</p>
              <span
                style={{
                  display: "inline-block",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "5px",
                  background: "#f0f0f0",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {metal.code}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

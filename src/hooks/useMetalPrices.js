// src/hooks/useMetalPrices.js
import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_METAL_API_KEY;
const BASE_CURRENCY = import.meta.env.VITE_BASE_CURRENCY || 'INR';

export default function useMetalPrices(query) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchPrices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=${BASE_CURRENCY}&currencies=${query}`
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [query]);

  return { data, loading, error };
}

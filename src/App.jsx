// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MetalPage from "./pages/MetalPage"; // single reusable page

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="metal/:code" element={<MetalPage />} />
      </Routes>
    </Router>
  );
}

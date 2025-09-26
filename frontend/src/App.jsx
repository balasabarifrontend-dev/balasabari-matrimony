import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./components/common/Navbar";
import Banner from "./components/common/Banner";
import Footer from "./components/common/Footer";

// Pages
import HomePage from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import UpgradePage from "./pages/UpgradePage";
import ServicesPage from "./pages/ServicesPage";
import Contact from "./pages/Contact";

import "./index.css"; // Tailwind CSS

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ✅ Navbar always visible */}
      <Navbar />

      {/* ✅ Banner always visible */}
      <Banner />

      {/* ✅ Page Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Other Pages */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/upgrade" element={<UpgradePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<Contact />} />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <div className="flex justify-center items-center h-[60vh] text-2xl font-semibold text-red-600">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </main>

      {/* ✅ Footer always visible */}
      <Footer />
    </div>
  );
}

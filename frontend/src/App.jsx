import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Banner from "./components/common/Banner";
import Footer from "./components/common/Footer";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import MainLayout from "./layout/MainLayout";

// Pages
import HomePage from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import SearchPage from "./pages/SearchPage";
import UpgradePage from "./pages/UpgradePage";
import ServicesPage from "./pages/ServicesPage";
import Contact from "./pages/Contact";
import AdminDashboard from "./components/admin/AdminDashBoard";

import "./index.css";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null); // store logged-in user info
  const navigate = useNavigate();

  useEffect(() => {
    // Load user from localStorage on app start
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        user={user}
        onLogin={() => setShowLogin(true)}
        onRegister={() => setShowRegister(true)}
        onLogout={handleLogout}
      />

      {/* Banner */}
      <Banner onGetStarted={() => setShowRegister(true)} />

      {/* Page Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* <Route
            path="/search"
            element={
              <MainLayout onLogin={() => setShowLogin(true)} onRegister={() => setShowRegister(true)}>
                <SearchPage />
              </MainLayout>
            }
          /> */}

          <Route
            path="/upgrade"
            element={
              <MainLayout onLogin={() => setShowLogin(true)} onRegister={() => setShowRegister(true)}>
                <UpgradePage />
              </MainLayout>
            }
          />

          <Route
            path="/services"
            element={
              <MainLayout onLogin={() => setShowLogin(true)} onRegister={() => setShowRegister(true)}>
                <ServicesPage />
              </MainLayout>
            }
          />

          <Route path="/contact" element={<Contact />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<RegisterPage onRegisterSuccess={handleLoginSuccess} />} />

          {/* Admin Panel */}
          <Route
            path="/admin"
            element={
              user?.role === "ADMIN" ? (
                <MainLayout onLogin={() => setShowLogin(true)} onRegister={() => setShowRegister(true)}>
                  <AdminDashboard />
                </MainLayout>
              ) : (
                <div className="text-center mt-20 text-red-600 font-bold">
                  Access Denied. Admins Only.
                </div>
              )
            }
          />

          {/* 404 Fallback */}
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

      {/* Footer */}
      <Footer />

      {/* ======= Modals ======= */}
{showLogin && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center animate-fadeIn">
    <div className="relative bg-white rounded-2xl shadow-2xl w-auto max-w-[95vw] p-8 my-8 mx-4 transform scale-100 transition-all duration-300">
      <button
        onClick={() => setShowLogin(false)}
        className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
      >
        ✕
      </button>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  </div>
)}

{showRegister && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center overflow-y-auto animate-fadeIn">
    <div className="relative bg-white rounded-2xl shadow-2xl w-auto max-w-[95vw] my-8 mx-4 transform scale-100 transition-all duration-300">
      <button
        onClick={() => setShowRegister(false)}
        className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
      >
        ✕
      </button>
      <RegisterForm onRegisterSuccess={handleLoginSuccess} isInModal={true} />
    </div>
  </div>
)}
    </div>
  );
}

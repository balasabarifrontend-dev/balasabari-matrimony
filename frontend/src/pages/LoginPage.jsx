// src/pages/LoginPage.jsx
import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-100 via-yellow-50 to-red-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}

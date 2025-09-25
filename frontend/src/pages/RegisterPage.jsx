import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12">
        <RegisterForm />
      </main>

      <Footer />
    </div>
  );
}

// RegisterPage.jsx
import React from "react";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-start justify-center bg-gradient-to-br from-red-100 via-yellow-50 to-red-50 py-12">
      <RegisterForm />
    </main>
  );
}

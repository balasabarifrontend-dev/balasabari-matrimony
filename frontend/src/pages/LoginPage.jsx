import React from "react";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-yellow-50 to-red-50 py-12">
      <LoginForm className=" max-w-lg" />
    </main>
  );
}
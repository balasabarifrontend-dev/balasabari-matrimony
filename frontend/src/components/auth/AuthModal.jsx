import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RegisterForm from "./RegisterForm"; // your RegisterForm component
import Input from "../ui/Input"; // your Input component
import Button from "../ui/Button"; // your Button component

export default function AuthModal({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-8 relative animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
          aria-label="Close"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {isRegister ? (
          <RegisterForm onSwitch={() => setIsRegister(false)} onClose={onClose} />
        ) : (
          <LoginFormContent onClose={onClose} onSwitch={() => setIsRegister(true)} />
        )}
      </div>
    </div>
  );
}

// Separate login form content
function LoginFormContent({ onClose, onSwitch }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/auth/login", form);
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        onClose();
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Welcome Back</h2>
      <p className="text-gray-600 text-center mb-6">
        Please log in to access your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}

        <Button
          type="submit"
          fullWidth
          variant="primary"
          disabled={loading}
          className="font-semibold text-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <p className="text-center text-gray-600 mt-4 text-sm">
        Don’t have an account?{" "}
        <span
          className="text-red-600 font-semibold cursor-pointer hover:underline"
          onClick={onSwitch}
        >
          Register Now
        </span>
      </p>
    </>
  );
}

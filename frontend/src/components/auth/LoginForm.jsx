import React, { useState } from "react";
import axios from "../../api/axios"; // your axios instance
import { useNavigate, Link } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginForm({ onRegister }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, form);

      if (res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        navigate("/"); // Redirect to homepage
      } else {
        alert("Login failed. Try again!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.error || "Login failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 mx-auto">
      {/* Brand */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">BalaSabari Matrimony</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back! Please login to continue.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      {/* Links */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span
          className="cursor-pointer hover:text-red-500 font-medium"
          onClick={onRegister}
        >
          Create an account
        </span>
        <Link to="/forgot-password" className="hover:text-red-500">
          Forgot password?
        </Link>
      </div>
    </div>
  );
}

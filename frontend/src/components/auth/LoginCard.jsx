import React, { useState } from "react";
import axios from "axios";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginCard({ onRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/auth/login", form);

      // Successful login
      alert("Login successful!");
      localStorage.setItem("userRegistered", "true");
      window.location.href = "/dashboard"; // redirect after login
    } catch (err) {
      if (err.response?.status === 404) {
        alert("User not found! Please register.");
        onRegister(); // open register modal
      } else {
        alert(err.response?.data?.error || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-red-600">
        Login To Get Started
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
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
        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? "Logging in..." : "Login Now"}
        </Button>
      </form>
      <p className="mt-3 text-sm text-gray-600">
        Not registered?{" "}
        <button
          onClick={onRegister}
          className="text-red-600 font-semibold hover:underline"
        >
          Register here
        </button>
      </p>
    </div>
  );
}

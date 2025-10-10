import React, { useState } from "react";
import { authService } from "../../services/AuthService";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginForm({ onLoginSuccess, onRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await authService.login(form);
      if (result.token && result.user) {
        authService.setSession(result.token, result.user);
        onLoginSuccess(result.user);
      } else {
        setError("Login failed - no token received");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-600">BalaSabari Matrimony</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back! Please login to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email address" required disabled={loading} />
          <Input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required disabled={loading} />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}

          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 text-sm text-gray-600">
          <button type="button" className="hover:text-red-500 font-medium" onClick={onRegister}>
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
}

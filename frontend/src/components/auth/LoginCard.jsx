// src/components/auth/LoginCard.jsx
import React, { useState } from "react";
import { authService } from "../../services/AuthService";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginCard({ onRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear error when user types
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await authService.login(form);
      
      if (result.token && result.user) {
        // Use authService session management
        authService.setSession(result.token, result.user);
        
        // Redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        setError(result.message || "Login failed - no token received");
      }
    } catch (err) {
      console.error("Login error:", err);
      
      // Enhanced error handling for your backend
      if (err.status === 404 || err.message?.includes("not found")) {
        setError("User not found! Please register.");
        if (onRegister) onRegister();
      } else if (err.status === 401) {
        setError("Invalid email or password");
      } else {
        setError(err.message || "Login failed. Please try again.");
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
          placeholder="Email address"
          required
          disabled={loading}
          autoComplete="email"
        />
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          disabled={loading}
          autoComplete="current-password"
        />
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          disabled={loading}
          className="py-2"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : (
            "Login Now"
          )}
        </Button>
      </form>
      
      <p className="mt-3 text-sm text-gray-600 text-center">
        Not registered?{" "}
        <button
          onClick={onRegister}
          className="text-red-600 font-semibold hover:underline focus:outline-none"
          disabled={loading}
        >
          Register here
        </button>
      </p>
    </div>
  );
}
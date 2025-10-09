// src/components/auth/AuthModal.jsx
import React, { useState, useEffect } from "react";
import { XMarkIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/AuthService";
import RegisterForm from "./RegisterForm";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function AuthModal({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl relative animate-slideUp max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "auto", maxWidth: "95vw" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition z-10 p-1 rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {isRegister ? (
          <RegisterForm 
            onSwitch={() => setIsRegister(false)} 
            onClose={onClose} 
            isInModal={true} 
          />
        ) : (
          <LoginFormContent 
            onClose={onClose} 
            onSwitch={() => setIsRegister(true)} 
          />
        )}
      </div>
    </div>
  );
}

// Enhanced Login Form Component
function LoginFormContent({ onClose, onSwitch }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await authService.login(form);
      
      if (result.token && result.user) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        
        // Show success message
        console.log("Login successful:", result.user);
        
        onClose();
        navigate("/dashboard");
      } else {
        setError(result.message || "Login failed - no token received");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || err.error || "Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Welcome Back</h2>
      <p className="text-gray-600 text-center mb-6">
        Please log in to access your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
          autoComplete="email"
        />
        
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
            autoComplete="current-password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm animate-shake">
            <strong>Error:</strong> {error}
          </div>
        )}

        <Button
          type="submit"
          fullWidth
          variant="primary"
          disabled={loading}
          className="font-semibold text-lg py-3"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-red-600 font-semibold hover:underline focus:outline-none"
            disabled={loading}
          >
            Register Now
          </button>
        </p>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
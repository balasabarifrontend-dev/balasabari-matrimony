import React, { useState } from "react";
import axios from "axios";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function RegisterCard() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Map frontend fields to backend fields
    const payload = {
      fullName: form.name,
      email: form.email,
      password: form.password,
      gender: "Male", // 👈 default gender for quick card
      mobile: "",     // backend expects mobile, leave blank or add input if needed
      age: "",        // backend expects age, leave blank or add input if needed
      religion: "",
      caste: "",
      location: "",
    };

    try {
      await axios.post(import.meta.env.VITE_API_URL + "/auth/register", payload);

      alert("Registered successfully!");
      window.location.href = "/login"; // redirect to login
    } catch (err) {
      console.error("RegisterCard error:", err);
      alert(
        err.response?.data?.error || "Registration failed. Please try again."
      );
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
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
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
          {loading ? "Registering..." : "Login Now"}
        </Button>
      </form>
    </div>
  );
}
import React, { useState } from "react";
import axios from "axios";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    // Step 1
    name: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    password: "",

    // Step 2
    religion: "",
    caste: "",
    motherTongue: "",
    education: "",
    occupation: "",
    income: "",

    // Step 3
    country: "",
    state: "",
    city: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Map frontend fields to backend fields
    const payload = {
      fullName: form.name,
      gender: form.gender,
      age: form.dob ? new Date().getFullYear() - new Date(form.dob).getFullYear() : "",
      email: form.email,
      mobile: form.phone,
      password: form.password,
      religion: form.religion,
      caste: form.caste,
      location: [form.city, form.state, form.country].filter(Boolean).join(", "),
      // You can add other fields if your backend supports them
    };

    try {
      await axios.post(import.meta.env.VITE_API_URL + "/api/auth", payload);
      alert("Registered successfully!");
      window.location.href = "/login";
    } catch (err) {
      console.error("RegisterForm error:", err);
      alert(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
        Create Your Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <Input type="date" name="dob" value={form.dob} onChange={handleChange} required />
            <Input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <Input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
            <Input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <Input name="religion" placeholder="Religion" value={form.religion} onChange={handleChange} required />
            <Input name="caste" placeholder="Caste / Community" value={form.caste} onChange={handleChange} required />
            <Input name="motherTongue" placeholder="Mother Tongue" value={form.motherTongue} onChange={handleChange} required />
            <Input name="education" placeholder="Education" value={form.education} onChange={handleChange} required />
            <Input name="occupation" placeholder="Occupation" value={form.occupation} onChange={handleChange} required />
            <Input name="income" placeholder="Annual Income" value={form.income} onChange={handleChange} required />
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <Input name="country" placeholder="Country" value={form.country} onChange={handleChange} required />
            <Input name="state" placeholder="State" value={form.state} onChange={handleChange} required />
            <Input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          {step > 1 && (
            <Button type="button" variant="secondary" onClick={prevStep}>
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button type="button" variant="primary" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Submitting..." : "Register"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
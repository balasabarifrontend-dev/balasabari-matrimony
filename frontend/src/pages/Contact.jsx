// src/pages/Contact.jsx - UPDATED
import React, { useState } from "react";
import { contactService } from "../services/contactService";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await contactService.submitContact(form);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left Section - Contact Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions or need help? Reach out to us using the form or the details below.
          </p>
          <ul className="space-y-4 text-gray-700">
            <li>
              <span className="font-semibold">📍 Address:</span> 123 Business St, Chennai, India
            </li>
            <li>
              <span className="font-semibold">📞 Phone:</span> +91 98765 43210
            </li>
            <li>
              <span className="font-semibold">✉️ Email:</span> support@balasabarimatrimony.com
            </li>
          </ul>
          <div className="mt-8">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.31349991532!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzU3LjciTiA4MMKwMTYnMTQuNiJF!5e0!3m2!1sen!2sin!4v1688567890000!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="bg-white shadow-md rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h3>
          
          {submitted && (
            <div className="p-4 bg-green-100 text-green-700 rounded mb-4">
              ✅ Thank you! Your message has been sent successfully.
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded mb-4">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <Input
              label="Phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                required
                disabled={loading}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              ></textarea>
            </div>
            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
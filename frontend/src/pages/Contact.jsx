import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
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
              <span className="font-semibold">✉️ Email:</span> support@example.com
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
              ✅ Thank you! Your message has been sent.
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
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
            <Button type="submit" variant="primary" fullWidth>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}


// import React, { useState } from "react";
// import Input from "../components/ui/Input";
// import Button from "../components/ui/Button";

// export default function Contact() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Mock contact form submitted:", form);
//     setSubmitted(true);

//     // Reset after submit
//     setForm({ name: "", email: "", phone: "", message: "" });
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12">
//       {/* ✅ Title */}
//       <h1 className="text-3xl font-bold text-center text-red-700 mb-8">
//         Contact Us
//       </h1>

//       {/* ✅ Grid: Info + Form */}
//       <div className="grid md:grid-cols-2 gap-8">
//         {/* ✅ Left: Company Info */}
//         <div className="bg-white shadow p-6 rounded-xl">
//           <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
//           <p className="text-gray-600 mb-6">
//             We’re here to help you find your perfect match. Reach out anytime!
//           </p>

//           <ul className="space-y-4 text-gray-700">
//             <li>
//               <strong>📍 Address:</strong> Matrimony Towers, Anna Salai, Chennai
//             </li>
//             <li>
//               <strong>📞 Phone:</strong> +91 98765 43210
//             </li>
//             <li>
//               <strong>📧 Email:</strong> support@yourmatrimony.com
//             </li>
//             <li>
//               <strong>⏰ Working Hours:</strong> Mon - Sat, 9:00 AM - 7:00 PM
//             </li>
//           </ul>
//         </div>

//         {/* ✅ Right: Contact Form */}
//         <div className="bg-white shadow p-6 rounded-xl">
//           <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>

//           {submitted ? (
//             <div className="p-4 bg-green-100 text-green-700 rounded mb-4">
//               ✅ Thank you! Your message has been sent. (Mock only)
//             </div>
//           ) : null}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="Your Name"
//               required
//             />
//             <Input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="Your Email"
//               required
//             />
//             <Input
//               type="tel"
//               name="phone"
//               value={form.phone}
//               onChange={handleChange}
//               placeholder="Your Phone Number"
//               required
//             />
//             <textarea
//               name="message"
//               value={form.message}
//               onChange={handleChange}
//               placeholder="Your Message"
//               rows="4"
//               className="w-full p-3 border rounded focus:ring-2 focus:ring-red-500"
//               required
//             />

//             <Button type="submit" variant="primary" fullWidth>
//               Send Message
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

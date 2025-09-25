// // src/pages/Home.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// import Navbar from "../components/common/Navbar";
// import Banner from "../components/common/Banner";
// import CategoryNav from "../components/common/CategoryNav";
// import RegisterCard from "../components/auth/RegisterCard";
// import FilterSidebar from "../components/profiles/FilterSidebar";
// import ProfilesGrid from "../components/profiles/ProfilesGrid";

// export default function Home() {
//   return (
//     <div className="w-full min-h-screen flex flex-col bg-gray-50">
//       {/* ✅ Navbar */}
//       <Navbar />

//       {/* ✅ Banner */}
//       <Banner />

//       {/* ✅ Categories Navigation */}
//       <CategoryNav />

//       {/* ✅ Main Content */}
//       <main className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6 py-8 px-2">
//         {/* Left Sidebar */}
//         <aside className="lg:col-span-1 space-y-6">
//           <RegisterCard />
//           <FilterSidebar />
//         </aside>

//         {/* Right Content */}
//         <section className="lg:col-span-3">
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">
//             Tamil Brides & Grooms
//           </h2>
//           <ProfilesGrid />
//         </section>
//       </main>

//       {/* ✅ About Section */}
//       <section className="bg-white py-12 px-6 md:px-12">
//         <div className="max-w-6xl mx-auto text-center">
//           <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
//             About Tamil Matrimony
//           </h3>
//           <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
//             Tamil Matrimony is dedicated to helping Tamil families find the
//             perfect match. Trusted by thousands of families worldwide, we bring
//             tradition and technology together to make matchmaking simple, safe,
//             and successful.
//           </p>
//         </div>
//       </section>

//       {/* ✅ Footer */}
//       <footer className="w-full bg-gray-900 text-gray-300 py-10 mt-auto">
//         <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
//           {/* Quick Links */}
//           <div>
//             <h4 className="text-lg font-semibold mb-3 text-white">Quick Links</h4>
//             <ul className="space-y-2 text-sm">
//               <li><Link to="/">Home</Link></li>
//               <li><Link to="/register">Register</Link></li>
//               <li><Link to="/login">Login</Link></li>
//               <li><Link to="/search">Search</Link></li>
//               <li><Link to="/contact">Contact Us</Link></li>
//             </ul>
//           </div>

//           {/* Services */}
//           <div>
//             <h4 className="text-lg font-semibold mb-3 text-white">Services</h4>
//             <ul className="space-y-2 text-sm">
//               <li><a href="#" className="hover:text-red-400">Brides</a></li>
//               <li><a href="#" className="hover:text-red-400">Grooms</a></li>
//               <li><a href="#" className="hover:text-red-400">Premium Plans</a></li>
//               <li><a href="#" className="hover:text-red-400">Help & Support</a></li>
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h4 className="text-lg font-semibold mb-3 text-white">Company</h4>
//             <ul className="space-y-2 text-sm">
//               <li><a href="#" className="hover:text-red-400">About Us</a></li>
//               <li><a href="#" className="hover:text-red-400">Careers</a></li>
//               <li><a href="#" className="hover:text-red-400">Privacy Policy</a></li>
//               <li><a href="#" className="hover:text-red-400">Terms & Conditions</a></li>
//             </ul>
//           </div>

//           {/* Social Media */}
//           <div>
//             <h4 className="text-lg font-semibold mb-3 text-white">Follow Us</h4>
//             <div className="flex space-x-4">
//               <a href="#" className="hover:text-red-400">Facebook</a>
//               <a href="#" className="hover:text-red-400">Twitter</a>
//               <a href="#" className="hover:text-red-400">Instagram</a>
//               <a href="#" className="hover:text-red-400">LinkedIn</a>
//             </div>
//           </div>
//         </div>

//         <div className="text-center mt-8 text-sm border-t border-gray-700 pt-4">
//           &copy; {new Date().getFullYear()} Tamil Matrimony. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }

// src/pages/Home.jsx
// src/pages/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Banner from "../components/common/Banner";
import CategoryNav from "../components/common/CategoryNav";
import RegisterCard from "../components/auth/RegisterCard";
import FilterSidebar from "../components/profiles/FilterSidebar";
import ProfilesGrid from "../components/profiles/ProfilesGrid";
import { mockProfiles } from "../config/mockData";
import Button from "../components/ui/Button";

export default function Home() {
  const [selectedType, setSelectedType] = useState(""); // "" = all, male, female

  // ✅ Filter mockProfiles based on gender
  const filteredProfiles = mockProfiles.filter((p) => {
    if (!selectedType) return true; // show all
    if (selectedType === "male") return p.gender?.toLowerCase() === "male";
    if (selectedType === "female") return p.gender?.toLowerCase() === "female";
    return true;
  });

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Banner */}
      <Banner />

      {/* ✅ Categories Navigation */}
      <CategoryNav />

      {/* ✅ Main Content */}
      <main className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6 py-8 px-2">
        {/* Left Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <RegisterCard />
          <FilterSidebar />
        </aside>

        {/* Right Content */}
        <section className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Tamil Brides & Grooms
          </h2>

          {/* ✅ Bride/Groom filter buttons */}
          <div className="flex gap-4 mb-6">
            {/* <Button
              variant={selectedType === "" ? "primary" : "outline"}
              onClick={() => setSelectedType("")}
            >
              All
            </Button> */}
            <Button
              variant={selectedType === "female" ? "primary" : "outline"}
              onClick={() => setSelectedType("female")}
            >
              Brides
            </Button>
            <Button
              variant={selectedType === "male" ? "primary" : "outline"}
              onClick={() => setSelectedType("male")}
            >
              Grooms
            </Button>
          </div>

          {/* ✅ Profile Grid */}
          <ProfilesGrid profiles={filteredProfiles} />
        </section>
      </main>

      {/* ✅ About Section */}
      <section className="bg-white py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
            About Tamil Matrimony
          </h3>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Tamil Matrimony is dedicated to helping Tamil families find the
            perfect match. Trusted by thousands of families worldwide, we bring
            tradition and technology together to make matchmaking simple, safe,
            and successful.
          </p>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="w-full bg-gray-900 text-gray-300 py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-400">Brides</a></li>
              <li><a href="#" className="hover:text-red-400">Grooms</a></li>
              <li><a href="#" className="hover:text-red-400">Premium Plans</a></li>
              <li><a href="#" className="hover:text-red-400">Help & Support</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-400">About Us</a></li>
              <li><a href="#" className="hover:text-red-400">Careers</a></li>
              <li><a href="#" className="hover:text-red-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-400">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-400">Facebook</a>
              <a href="#" className="hover:text-red-400">Twitter</a>
              <a href="#" className="hover:text-red-400">Instagram</a>
              <a href="#" className="hover:text-red-400">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-sm border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} Tamil Matrimony. All rights reserved.
        </div>
      </footer>
    </div>
  );
}


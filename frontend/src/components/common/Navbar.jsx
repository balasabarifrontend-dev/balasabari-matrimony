// src/components/common/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { navLinks } from "../../config/footerLinks";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav
      className="bg-red-600 text-white shadow-md sticky top-0 z-50"
      role="navigation"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">
          <Link to="/">BalaSabari Matrimony</Link>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 font-medium text-lg">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`hover:text-yellow-300 ${
                  location.pathname === link.path
                    ? "text-yellow-300 font-bold"
                    : ""
                }`}
                aria-current={
                  location.pathname === link.path ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-3">
          <Link
            to="/login"
            className="px-4 py-1 bg-yellow-400 text-red-900 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-1 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-red-900 transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <XMarkIcon className="w-7 h-7" />
          ) : (
            <Bars3Icon className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-3 space-y-3 px-6 pb-4 bg-red-700 rounded-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block hover:text-yellow-300 ${
                location.pathname === link.path
                  ? "text-yellow-300 font-bold"
                  : ""
              }`}
              aria-current={
                location.pathname === link.path ? "page" : undefined
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Buttons */}
          <div className="flex space-x-3 pt-3">
            <Link
              to="/login"
              className="flex-1 text-center px-4 py-2 bg-yellow-400 text-red-900 rounded-lg font-semibold hover:bg-yellow-500 transition"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="flex-1 text-center px-4 py-2 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-red-900 transition"
              onClick={() => setOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

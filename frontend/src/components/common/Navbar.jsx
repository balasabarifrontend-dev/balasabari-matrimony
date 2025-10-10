import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserIcon, 
  HeartIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import { navLinks } from "../../config/footerLinks";
import Logo from "../../assets/Logo.jpg";

export default function Navbar({ onLogin, onRegister }) {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const location = useNavigate();

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setOpen(false);
    setUserDropdown(false);
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
    setOpen(false);
    setUserDropdown(false);
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200 text-gray-800" 
          : "bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white shadow-lg"
      }`}>
        {/* Top decorative strip */}
        <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>
        
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          {/* ===== Logo ===== */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src={Logo}
                alt="BalaSabari Matrimony Logo"
                className="w-12 h-12 rounded-full object-cover border-3 border-yellow-400 shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <Link
              to="/"
              className={`text-2xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent ${
                scrolled ? "text-red-600" : ""
              } group-hover:scale-105 transition-transform duration-300`}
            >
              BalaSabari Matrimony
            </Link>
          </div>

          {/* ===== Desktop Menu ===== */}
          <ul className="hidden lg:flex space-x-10 font-semibold text-lg">
            {navLinks.map((link) => (
              <li key={link.path} className="relative group">
                <Link
                  to={link.path}
                  className={`relative py-2 transition-all duration-300 ${
                    location.pathname === link.path
                      ? "text-yellow-400 font-bold"
                      : scrolled ? "text-gray-700 hover:text-red-600" : "text-white hover:text-yellow-300"
                  }`}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full ${
                    location.pathname === link.path ? "w-full" : ""
                  }`}></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* ===== Desktop Auth Buttons ===== */}
          <div className="hidden md:flex space-x-4 items-center">
            {isLoggedIn ? (
              <div className="flex items-center space-x-6">
                {/* Notification Icons */}
                <div className="flex space-x-4">
                  <button className={`p-2 rounded-full transition-all duration-300 hover:scale-110 relative ${
                    scrolled ? "bg-gray-100 hover:bg-yellow-100 text-gray-700" : "bg-white/10 hover:bg-white/20 text-white"
                  }`}>
                    <BellIcon className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">3</span>
                  </button>
                  <button className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                    scrolled ? "bg-gray-100 hover:bg-yellow-100 text-gray-700" : "bg-white/10 hover:bg-white/20 text-white"
                  }`}>
                    <ChatBubbleLeftRightIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* User Profile with Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdown(!userDropdown)}
                    className="flex items-center space-x-3 bg-white/10 rounded-full pl-1 pr-4 py-1 border-2 border-yellow-400/30 hover:border-yellow-400 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {getInitials(user?.name)}
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className={`font-semibold ${scrolled ? "text-gray-800" : "text-white"}`}>
                        Hi, {user?.name?.split(' ')[0] || "User"}
                      </span>
                      <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${
                        userDropdown ? "rotate-180" : ""
                      } ${scrolled ? "text-gray-600" : "text-yellow-300"}`} />
                    </div>
                  </button>

                  {/* User Dropdown Menu */}
                  {userDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 py-2 z-50 animate-fadeIn">
                      <div className="p-4 border-b border-gray-100">
                        <p className="font-semibold text-gray-800">{user?.name}</p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                      <button
                        onClick={handleProfile}
                        className="w-full px-4 py-3 text-left hover:bg-yellow-50 text-gray-700 font-medium transition-colors flex items-center space-x-3"
                      >
                        <UserIcon className="w-5 h-5" />
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left hover:bg-red-50 text-red-600 font-medium transition-colors flex items-center space-x-3 border-t border-gray-100"
                      >
                        <span>🚪</span>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex space-x-4 items-center">
                {/* Quick Stats */}
                <div className={`text-sm font-medium ${scrolled ? "text-gray-600" : "text-yellow-100"}`}>
                  <HeartIcon className="w-5 h-5 inline mr-1 text-red-400" />
                  500+ Matches
                </div>
                
                {/* Auth Buttons */}
                <button
                  onClick={onLogin}
                  className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-900 rounded-full font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Login
                </button>
                <button
                  onClick={onRegister}
                  className={`px-8 py-3 rounded-full font-bold transition-all duration-300 border-2 ${
                    scrolled 
                      ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white" 
                      : "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-red-900"
                  } hover:scale-105 shadow-lg hover:shadow-xl`}
                >
                  Register Free
                </button>
              </div>
            )}
          </div>

          {/* ===== Mobile Menu Toggle ===== */}
          <button
            className={`md:hidden p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
              scrolled ? "bg-gray-100 text-gray-700" : "bg-white/10 text-white"
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* ===== Mobile Menu ===== */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            scrolled ? "bg-white/95 backdrop-blur-xl" : "bg-gradient-to-b from-red-700 via-red-600 to-red-500"
          } ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-6 py-6 space-y-6">
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-4 text-lg font-semibold transition-all duration-300 border-l-4 pl-6 ${
                  location.pathname === link.path
                    ? "text-yellow-400 border-yellow-400 bg-white/10 rounded-r-xl"
                    : scrolled 
                      ? "text-gray-700 border-transparent hover:text-red-600 hover:border-red-600 hover:bg-red-50" 
                      : "text-white border-transparent hover:text-yellow-300 hover:border-yellow-300 hover:bg-white/5"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* User Info if logged in */}
            {isLoggedIn && (
              <div className="pt-6 border-t border-white/20">
                <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {getInitials(user?.name)}
                  </div>
                  <div>
                    <p className={`font-bold text-lg ${scrolled ? "text-gray-800" : "text-white"}`}>
                      {user?.name || "User"}
                    </p>
                    <p className={`text-sm ${scrolled ? "text-gray-600" : "text-yellow-100"}`}>
                      Premium Member
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Buttons - Conditional */}
            <div className="pt-6 border-t border-white/20 space-y-4">
              {isLoggedIn ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handleProfile}
                      className="flex items-center justify-center space-x-2 px-4 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-900 rounded-2xl font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg"
                    >
                      <UserIcon className="w-6 h-6" />
                      <span>My Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className={`px-4 py-4 rounded-2xl font-bold transition-all duration-300 border-2 ${
                        scrolled 
                          ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white" 
                          : "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-red-900"
                      }`}
                    >
                      Logout
                    </button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-3 gap-2">
                    <button className={`p-3 rounded-xl text-center transition-all ${
                      scrolled ? "bg-gray-100 hover:bg-yellow-100 text-gray-700" : "bg-white/10 hover:bg-white/20 text-white"
                    }`}>
                      <BellIcon className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-xs">Alerts</span>
                    </button>
                    <button className={`p-3 rounded-xl text-center transition-all ${
                      scrolled ? "bg-gray-100 hover:bg-yellow-100 text-gray-700" : "bg-white/10 hover:bg-white/20 text-white"
                    }`}>
                      <ChatBubbleLeftRightIcon className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-xs">Messages</span>
                    </button>
                    <button className={`p-3 rounded-xl text-center transition-all ${
                      scrolled ? "bg-gray-100 hover:bg-yellow-100 text-gray-700" : "bg-white/10 hover:bg-white/20 text-white"
                    }`}>
                      <HeartIcon className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-xs">Matches</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className={`text-center p-4 rounded-2xl ${
                    scrolled ? "bg-yellow-50 text-gray-700" : "bg-white/10 text-yellow-100"
                  }`}>
                    <HeartIcon className="w-8 h-8 mx-auto mb-2 text-red-400" />
                    <p className="font-semibold">Join 500+ Successful Matches</p>
                    <p className="text-sm opacity-80">Start your journey today</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        onLogin();
                        setOpen(false);
                      }}
                      className="px-4 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-900 rounded-2xl font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        onRegister();
                        setOpen(false);
                      }}
                      className={`px-4 py-4 rounded-2xl font-bold transition-all duration-300 border-2 ${
                        scrolled 
                          ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white" 
                          : "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-red-900"
                      }`}
                    >
                      Register
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>

      {/* Close dropdown when clicking outside */}
      {userDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setUserDropdown(false)}
        ></div>
      )}
    </>
  );
}
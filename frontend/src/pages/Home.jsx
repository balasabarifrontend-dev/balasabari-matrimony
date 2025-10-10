import React, { useState, useEffect } from "react";
import CategoryNav from "../components/common/CategoryNav";
import FilterSidebar from "../components/profiles/FilterSidebar";
import LoginCard from "../components/auth/LoginCard";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const isModalOpen = showLogin || showRegister;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    setShowLogin(false);
    setIsLoggedIn(true);
  };

  const handleViewAllProfiles = () => {
    if (isLoggedIn) {
      navigate("/profiles");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="w-full flex flex-col relative overflow-hidden min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Page Content with blur when modal open */}
      <div
        className={`transition-all duration-500 ${
          isModalOpen ? "blur-sm scale-[0.99] opacity-90" : ""
        } relative z-10`}
      >
        {/* Category Navigation */}
        <CategoryNav />

        {/* Main Content */}
        <main className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8 py-12 px-4 sm:px-6 lg:px-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            <LoginCard
              onLogin={() => setShowLogin(true)}
              onRegister={() => setShowRegister(true)}
            />
            <FilterSidebar />
          </aside>

          {/* Main Content Area */}
          <section className="lg:col-span-3">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent mb-6">
                Find Your Perfect Match
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Join thousands of Tamil singles in their journey to find lifelong partners. 
                Where tradition meets modern matchmaking.
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Successful Matches</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-red-600 mb-2">10K+</div>
                <div className="text-gray-600 font-medium">Verified Profiles</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-red-600 mb-2">50+</div>
                <div className="text-gray-600 font-medium">Cities Worldwide</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-red-600 mb-2">99%</div>
                <div className="text-gray-600 font-medium">Satisfied Families</div>
              </div>
            </div>

            {/* Main CTA Section */}
            <div className="bg-gradient-to-br from-white to-red-50 rounded-3xl shadow-2xl p-8 md:p-12 border border-red-100 mb-12">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Ready to Start Your Journey?
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Create your profile in minutes and connect with compatible Tamil brides and grooms from around the world.
                  </p>
                </div>
                
                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                  <div className="text-center group">
                    <div className="bg-gradient-to-br from-red-500 to-yellow-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-3xl text-white">👰</span>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">Verified Profiles</h4>
                    <p className="text-gray-600 text-sm">100% authentic Tamil singles with verified backgrounds</p>
                  </div>
                  <div className="text-center group">
                    <div className="bg-gradient-to-br from-red-500 to-yellow-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-3xl text-white">🔒</span>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">Safe & Private</h4>
                    <p className="text-gray-600 text-sm">Your privacy and security are our top priority</p>
                  </div>
                  <div className="text-center group">
                    <div className="bg-gradient-to-br from-red-500 to-yellow-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-3xl text-white">💖</span>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">Smart Matching</h4>
                    <p className="text-gray-600 text-sm">Advanced algorithms to find your perfect match</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {!isLoggedIn ? (
                    <>
                      <button
                        onClick={() => setShowRegister(true)}
                        className="bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-4 rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2"
                      >
                        <span>Start Free Today</span>
                        <span className="text-xl">🎯</span>
                      </button>
                      <button
                        onClick={() => setShowLogin(true)}
                        className="bg-white text-red-600 border-2 border-red-600 px-12 py-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        Sign In
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleViewAllProfiles}
                      className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-12 py-4 rounded-2xl hover:from-red-700 hover:to-yellow-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2"
                    >
                      <span>Browse All Profiles</span>
                      <span className="text-xl">👥</span>
                    </button>
                  )}
                </div>

                <p className="text-center text-gray-500 mt-6 text-sm">
                  {!isLoggedIn ? "Join thousands of happy families who found their perfect match" : "Discover your perfect match from thousands of verified profiles"}
                </p>
              </div>
            </div>

            {/* Testimonial Preview */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-red-100">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Success Stories
                </h3>
                <p className="text-gray-600">Hear from couples who found their life partners</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-2xl p-6 border-l-4 border-red-500">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                      R
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Rajesh & Priya</h4>
                      <p className="text-sm text-gray-600">Married: 2023</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "BalaSabari Matrimony helped us find each other. The platform made it so easy to connect with like-minded individuals."
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-2xl p-6 border-l-4 border-yellow-500">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Suresh & Lakshmi</h4>
                      <p className="text-sm text-gray-600">Married: 2024</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "We found our perfect match within weeks! The verification process gave us confidence in the platform."
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* About Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 py-16 px-6 md:px-12 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by Tamil Families Worldwide
            </h3>
            <p className="text-xl text-red-100 leading-relaxed max-w-4xl mx-auto mb-8">
              For over a decade, BalaSabari Matrimony has been connecting Tamil families across the globe. 
              Our commitment to authenticity, privacy, and successful matchmaking has made us the preferred choice.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-red-200">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">25+</div>
                <div className="text-red-200">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-red-200">Success Rate</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex justify-center items-center animate-fadeIn">
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 transform scale-100 transition-all duration-300">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
            >
              ✕
            </button>
            <LoginForm 
              onLoginSuccess={handleLoginSuccess}
              onRegister={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex justify-center items-center overflow-y-auto animate-fadeIn">
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 my-8 transform scale-100 transition-all duration-300">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 z-10"
            >
              ✕
            </button>
            <RegisterForm 
              onRegisterSuccess={handleLoginSuccess} 
              onLogin={() => {
                setShowRegister(false);
                setShowLogin(true);
              }}
              isInModal={true} 
            />
          </div>
        </div>
      )}

      {/* Add custom animations to CSS */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
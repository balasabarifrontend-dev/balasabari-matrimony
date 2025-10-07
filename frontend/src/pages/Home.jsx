import React, { useState } from "react";
import CategoryNav from "../components/common/CategoryNav";
import FilterSidebar from "../components/profiles/FilterSidebar";
import ProfilesGrid from "../components/profiles/ProfilesGrid";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import LoginCard from "../components/auth/LoginCard";

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const isModalOpen = showLogin || showRegister;

  // ADD THIS FUNCTION
  const handleLoginSuccess = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setShowLogin(false);
    window.location.reload(); // or you can use navigate to dashboard
  };

  return (
    <div className="w-full flex flex-col relative overflow-hidden">
      {/* Page Content with blur when modal open */}
      <div
        className={`transition-all duration-300 ${
          isModalOpen ? "blur-md scale-[0.98] opacity-80" : ""
        }`}
      >
        {/* Category Navigation */}
        <CategoryNav />

        {/* Main Content */}
        <main className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6 py-8 px-2">
          <aside className="lg:col-span-1 space-y-6">
            <LoginCard
              onLogin={() => setShowLogin(true)}
              onRegister={() => setShowRegister(true)}
            />
            <FilterSidebar />
          </aside>

          <section className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Tamil Brides & Grooms
            </h2>
            <ProfilesGrid />
          </section>
        </main>

        {/* About Section */}
        <section className="bg-white py-12 px-6 md:px-12">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
              About Tamil Matrimony
            </h3>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Tamil Matrimony is dedicated to helping Tamil families find the
              perfect match. Trusted by thousands of families worldwide, we
              bring tradition and technology together to make matchmaking
              simple, safe, and successful.
            </p>
          </div>
        </section>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center animate-fadeIn">
          <div className="relative bg-white rounded-2xl shadow-2xl w-auto max-w-[95vw] p-8 my-8 mx-4 transform scale-100 transition-all duration-300">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>
            {/* PASS handleLoginSuccess HERE */}
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center overflow-y-auto animate-fadeIn">
          <div className="relative bg-white rounded-2xl shadow-2xl w-auto max-w-[95vw] my-8 mx-4 transform scale-100 transition-all duration-300">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
            >
              ✕
            </button>
            {/* PASS handleLoginSuccess HERE */}
            <RegisterForm onRegisterSuccess={handleLoginSuccess} isInModal={true} />
          </div>
        </div>
      )}
    </div>
  );
}
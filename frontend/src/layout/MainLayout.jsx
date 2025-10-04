import React from "react";
import { useLocation } from "react-router-dom";
import LoginCard from "../components/auth/LoginCard";
import FilterSidebar from "../components/profiles/FilterSidebar";

export default function MainLayout({ children, onLogin, onRegister }) {
  const location = useLocation();

  // Hide sidebar on contact page
  const hideSidebar = location.pathname === "/contact";

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6 py-8 px-2">
      {/* Sidebar (hidden on contact) */}
      {!hideSidebar && (
        <aside className="lg:col-span-1 space-y-6">
          <LoginCard onLogin={onLogin} onRegister={onRegister} />
          <FilterSidebar />
        </aside>
      )}

      {/* Main content */}
      <section className={`${hideSidebar ? "lg:col-span-4" : "lg:col-span-3"}`}>
        {children}
      </section>
    </div>
  );
}

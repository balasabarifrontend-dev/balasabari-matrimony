import React from "react";
import CategoryNav from "../components/common/CategoryNav";
import RegisterCard from "../components/auth/RegisterCard";
import FilterSidebar from "../components/profiles/FilterSidebar";
import ProfilesGrid from "../components/profiles/ProfilesGrid";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      {/* Categories Navigation */}
      <CategoryNav />

      {/* Main Content */}
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
            perfect match. Trusted by thousands of families worldwide, we bring
            tradition and technology together to make matchmaking simple, safe,
            and successful.
          </p>
        </div>
      </section>
    </div>
  );
}
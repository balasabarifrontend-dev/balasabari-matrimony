import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import ProfileCard from "./ProfileCard";

export default function ProfilesGrid() {
  const [profiles, setProfiles] = useState([]);
  const [filter, setFilter] = useState("all");
  const [religionFilter, setReligionFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("/profiles") // Remove the base URL since axios already has it
      .then((response) => {
        console.log("API response:", response.data);
        
        // Handle paginated response structure
        const data = response.data;
        
        if (data.profiles && Array.isArray(data.profiles)) {
          // Backend returns { profiles: [], currentPage: 0, ... }
          setProfiles(data.profiles);
        } else if (Array.isArray(data)) {
          // If it's directly an array (fallback)
          setProfiles(data);
        } else if (data.content && Array.isArray(data.content)) {
          // Alternative pagination structure
          setProfiles(data.content);
        } else {
          console.warn("Unexpected response format:", data);
          setProfiles([]);
        }
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
        setError("Failed to load profiles");
        setLoading(false);
      });
  }, []);

  const filteredProfiles = profiles.filter((p) => {
    const genderMatch =
      filter === "all"
        ? true
        : filter === "brides"
        ? p.gender === "Female"
        : p.gender === "Male";

    const religionMatch =
      religionFilter === "all" ? true : p.religion === religionFilter;

    return genderMatch && religionMatch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profiles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold mb-6 text-red-600">
          Tamil Brides & Grooms
        </h3>

        {/* Religion Filter */}
        <div className="flex gap-3 mb-4 flex-wrap">
          {["all", "Hindu", "Muslim", "Christian"].map((rel) => (
            <button
              key={rel}
              onClick={() => setReligionFilter(rel === "all" ? "all" : rel)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                religionFilter === (rel === "all" ? "all" : rel)
                  ? "bg-red-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {rel === "all" ? "All Religions" : rel}
            </button>
          ))}
        </div>

        {/* Gender Filter */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={() => setFilter("brides")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              filter === "brides"
                ? "bg-red-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Brides
          </button>
          <button
            onClick={() => setFilter("grooms")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              filter === "grooms"
                ? "bg-red-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Grooms
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              filter === "all"
                ? "bg-red-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Profiles
          </button>
        </div>

        {!Array.isArray(filteredProfiles) || filteredProfiles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No profiles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((p) => (
              <ProfileCard key={p.id} profile={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
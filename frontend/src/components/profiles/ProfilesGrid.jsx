import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router-dom";

export default function ProfilesGrid() {
  const [profiles, setProfiles] = useState([]);
  const [filter, setFilter] = useState("all");
  const [religionFilter, setReligionFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log("Token in localStorage:", token);

      try {
        console.log("🔄 Making API request to /profiles...");
        
        const response = await api.get("/profiles");
        console.log("✅ FULL API response:", response);
        
        const data = response.data;
        
        // Handle different response structures
        let profilesData = [];
        if (data.profiles && Array.isArray(data.profiles)) {
          profilesData = data.profiles;
        } else if (Array.isArray(data)) {
          profilesData = data;
        } else if (data.content && Array.isArray(data.content)) {
          profilesData = data.content;
        } else {
          console.log("❌ No profiles found in response structure:", data);
          profilesData = [];
        }

        console.log("📊 Profiles to set:", profilesData);
        setProfiles(profilesData);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching profiles:", err);
        setError("Failed to load profiles");
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter((p) => {
    if (!p || typeof p !== 'object') return false;
    
    const genderMatch =
      filter === "all" ? true : 
      filter === "brides" ? p.gender === "Female" : 
      p.gender === "Male";
      
    const religionMatch = religionFilter === "all" ? true : p.religion === religionFilter;
    
    return genderMatch && religionMatch;
  });

  console.log("🎯 Filtered profiles count:", filteredProfiles.length);

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

  if (error && profiles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <div className="space-y-4">
          <p className="text-gray-600">Please log in to view profiles</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
          >
            Retry
          </button>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
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
          {["brides", "grooms", "all"].map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                filter === g
                  ? "bg-red-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>

        {filteredProfiles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No profiles found matching your criteria.</p>
            {!localStorage.getItem("token") && (
              <p className="text-red-600">Please log in to view all available profiles.</p>
            )}
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
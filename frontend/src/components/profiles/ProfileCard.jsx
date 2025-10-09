// src/components/profiles/ProfileCard.jsx
import React, { useState } from "react";
import { profileService } from "../../services/profileService";

export default function ProfileCard({ profile }) {
  const [loading, setLoading] = useState(false);

  const handleExpressInterest = async () => {
    setLoading(true);
    try {
      // Implement express interest functionality
      console.log("Expressing interest in profile:", profile.id);
      // await profileService.expressInterest(profile.id);
      alert("Interest expressed successfully!");
    } catch (err) {
      console.error("Error expressing interest:", err);
      alert(err.message || "Failed to express interest");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    // Implement message functionality
    console.log("Sending message to profile:", profile.id);
    alert("Message feature coming soon!");
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300 border border-gray-200">
      {/* Profile Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Profile Image */}
        {profile.image ? (
          <img
            src={profile.image}
            alt={profile.fullName || profile.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-red-200"
          />
        ) : (
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center text-red-600 font-bold text-xl border-2 border-red-200">
            {profile.fullName?.[0] || profile.name?.[0] || "?"}
          </div>
        )}
        
        {/* Basic Info */}
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 text-lg mb-1">
            {profile.fullName || profile.name}
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            {profile.age} yrs • {profile.location || profile.district || "Location not specified"}
          </p>
          <div className="flex flex-wrap gap-2">
            <span
              className={`text-xs inline-block px-3 py-1 rounded-full ${
                profile.gender === "Female"
                  ? "bg-pink-100 text-pink-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {profile.gender || "Unknown"}
            </span>
            {profile.religion && (
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {profile.religion}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Information Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
        {/* Only show most important fields to avoid clutter */}
        {profile.education && (
          <div>
            <strong className="text-gray-600 text-xs">Education:</strong>
            <div className="text-gray-800 text-sm truncate">{profile.education}</div>
          </div>
        )}
        
        {profile.occupation && (
          <div>
            <strong className="text-gray-600 text-xs">Occupation:</strong>
            <div className="text-gray-800 text-sm truncate">{profile.occupation}</div>
          </div>
        )}
        
        {profile.caste && (
          <div>
            <strong className="text-gray-600 text-xs">Caste:</strong>
            <div className="text-gray-800 text-sm">{profile.caste}</div>
          </div>
        )}
        
        {profile.maritalStatus && (
          <div>
            <strong className="text-gray-600 text-xs">Status:</strong>
            <div className="text-gray-800 text-sm">{profile.maritalStatus}</div>
          </div>
        )}
      </div>

      {/* About Section (truncated) */}
      {profile.about && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <strong className="text-gray-600 text-xs block mb-1">About:</strong>
          <p className="text-gray-700 text-sm line-clamp-2">
            {profile.about}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
        <button 
          onClick={handleExpressInterest}
          disabled={loading}
          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? "..." : "Express Interest"}
        </button>
        <button 
          onClick={handleSendMessage}
          className="flex-1 border border-red-600 text-red-600 py-2 rounded-lg hover:bg-red-50 transition-colors font-semibold text-sm"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
// src/components/profiles/ProfileCard.jsx
import React, { useState } from "react";
import { profileService } from "../../services/profileService";

export default function ProfileCard({ profile }) {
  const [loading, setLoading] = useState(false);

  const handleExpressInterest = async () => {
    setLoading(true);
    try {
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
    console.log("Sending message to profile:", profile.id);
    alert("Message feature coming soon!");
  };

  // Get display name (fallback to different name fields)
  const displayName = profile.fullName || profile.name || "Unknown";
  
  // Get location (fallback to different location fields)
  const displayLocation = profile.location || `${profile.district || ""}, ${profile.state || "Tamil Nadu"}`.trim();
  
  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
      {/* Profile Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
        {profile.profile_image ? (
          <img
            src={profile.profile_image}
            alt={displayName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className={`w-full h-full flex items-center justify-center text-4xl font-bold text-gray-600 ${
            profile.profile_image ? 'hidden' : 'flex'
          }`}
          style={{
            background: profile.gender === "Female" 
              ? 'linear-gradient(135deg, #fce7f3, #fbcfe8)' 
              : 'linear-gradient(135deg, #dbeafe, #bfdbfe)'
          }}
        >
          {getInitials(displayName)}
        </div>
        
        {/* Religion Badge */}
        {profile.religion && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
            {profile.religion}
          </div>
        )}
        
        {/* Age Badge */}
        <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
          {profile.age} yrs
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-5">
        {/* Name and Basic Info */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{displayName}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
            <span className="flex items-center gap-1">
              📍 {displayLocation || "Tamil Nadu"}
            </span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              profile.gender === "Female" 
                ? "bg-pink-100 text-pink-700" 
                : "bg-blue-100 text-blue-700"
            }`}>
              {profile.gender || "Unknown"}
            </span>
          </div>
        </div>

        {/* Detailed Information Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          {profile.education && (
            <div className="space-y-1">
              <div className="text-gray-500 text-xs font-medium">Education</div>
              <div className="text-gray-800 font-semibold truncate">{profile.education}</div>
            </div>
          )}
          
          {profile.occupation && (
            <div className="space-y-1">
              <div className="text-gray-500 text-xs font-medium">Profession</div>
              <div className="text-gray-800 font-semibold truncate">{profile.occupation}</div>
            </div>
          )}
          
          {profile.annualIncome && (
            <div className="space-y-1">
              <div className="text-gray-500 text-xs font-medium">Income</div>
              <div className="text-gray-800 font-semibold">{profile.annualIncome}</div>
            </div>
          )}
          
          {profile.caste && (
            <div className="space-y-1">
              <div className="text-gray-500 text-xs font-medium">Caste</div>
              <div className="text-gray-800 font-semibold">
                {profile.caste}
                {profile.subcaste && ` (${profile.subcaste})`}
              </div>
            </div>
          )}
        </div>

        {/* Additional Details */}
        <div className="flex flex-wrap gap-2 mb-4">
          {profile.maritalStatus && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
              {profile.maritalStatus}
            </span>
          )}
          {profile.familyStatus && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
              {profile.familyStatus}
            </span>
          )}
          {profile.familyType && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
              {profile.familyType}
            </span>
          )}
        </div>

        {/* About Section */}
        {profile.about && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="text-gray-500 text-xs font-medium mb-2">About</div>
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
              {profile.about}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
          <button 
            onClick={handleExpressInterest}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 font-semibold text-sm disabled:opacity-50 flex items-center justify-center shadow-md hover:shadow-lg"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              "Express Interest 💖"
            )}
          </button>
          <button 
            onClick={handleSendMessage}
            className="flex-1 border-2 border-red-600 text-red-600 py-3 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg"
          >
            Send Message 💌
          </button>
        </div>
      </div>
    </div>
  );
}
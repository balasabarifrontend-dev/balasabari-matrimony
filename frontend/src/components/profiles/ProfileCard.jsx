import React from "react";

export default function ProfileCard({ profile }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300 border border-gray-200">
      {/* Profile Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Profile Image */}
        {profile.image ? (
          <img
            src={profile.image}
            alt={profile.fullName || profile.name}
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-xl">
            {profile.fullName?.[0] || profile.name?.[0] || "?"}
          </div>
        )}
        
        {/* Basic Info */}
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 text-lg">
            {profile.fullName || profile.name}
          </h4>
          <p className="text-sm text-gray-600">
            {profile.age} yrs • {profile.location || profile.district || "Unknown"}
          </p>
          <span
            className={`text-xs inline-block mt-1 px-3 py-1 rounded-full ${
              profile.gender === "Female"
                ? "bg-pink-100 text-pink-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {profile.gender || "Unknown"}
          </span>
        </div>
      </div>

      {/* Detailed Information Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
        {/* Personal Details */}
        {profile.religion && (
          <div>
            <strong className="text-gray-600">Religion:</strong>
            <div className="text-gray-800">{profile.religion}</div>
          </div>
        )}
        
        {profile.caste && (
          <div>
            <strong className="text-gray-600">Caste:</strong>
            <div className="text-gray-800">{profile.caste}</div>
          </div>
        )}
        
        {profile.subcaste && (
          <div>
            <strong className="text-gray-600">Subcaste:</strong>
            <div className="text-gray-800">{profile.subcaste}</div>
          </div>
        )}
        
        {profile.maritalStatus && (
          <div>
            <strong className="text-gray-600">Marital Status:</strong>
            <div className="text-gray-800">{profile.maritalStatus}</div>
          </div>
        )}
        
        {profile.height && (
          <div>
            <strong className="text-gray-600">Height:</strong>
            <div className="text-gray-800">{profile.height}</div>
          </div>
        )}
        
        {profile.dob && (
          <div>
            <strong className="text-gray-600">Date of Birth:</strong>
            <div className="text-gray-800">{profile.dob}</div>
          </div>
        )}

        {/* Professional Details */}
        {profile.education && (
          <div>
            <strong className="text-gray-600">Education:</strong>
            <div className="text-gray-800">{profile.education}</div>
          </div>
        )}
        
        {profile.occupation && (
          <div>
            <strong className="text-gray-600">Occupation:</strong>
            <div className="text-gray-800">{profile.occupation}</div>
          </div>
        )}
        
        {profile.employedIn && (
          <div>
            <strong className="text-gray-600">Employed In:</strong>
            <div className="text-gray-800">{profile.employedIn}</div>
          </div>
        )}
        
        {profile.annualIncome && (
          <div>
            <strong className="text-gray-600">Annual Income:</strong>
            <div className="text-gray-800">{profile.annualIncome}</div>
          </div>
        )}
        
        {profile.specialization && (
          <div>
            <strong className="text-gray-600">Specialization:</strong>
            <div className="text-gray-800">{profile.specialization}</div>
          </div>
        )}

        {/* Family Details */}
        {profile.familyStatus && (
          <div>
            <strong className="text-gray-600">Family Status:</strong>
            <div className="text-gray-800">{profile.familyStatus}</div>
          </div>
        )}
        
        {profile.familyType && (
          <div>
            <strong className="text-gray-600">Family Type:</strong>
            <div className="text-gray-800">{profile.familyType}</div>
          </div>
        )}

        {/* Location Details */}
        {profile.district && (
          <div>
            <strong className="text-gray-600">District:</strong>
            <div className="text-gray-800">{profile.district}</div>
          </div>
        )}
        
        {profile.state && (
          <div>
            <strong className="text-gray-600">State:</strong>
            <div className="text-gray-800">{profile.state}</div>
          </div>
        )}
        
        {profile.country && (
          <div>
            <strong className="text-gray-600">Country:</strong>
            <div className="text-gray-800">{profile.country}</div>
          </div>
        )}
        
        {profile.pincode && (
          <div>
            <strong className="text-gray-600">Pincode:</strong>
            <div className="text-gray-800">{profile.pincode}</div>
          </div>
        )}
      </div>

      {/* About Section */}
      {profile.about && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <strong className="text-gray-600 block mb-2">About:</strong>
          <p className="text-gray-700 text-sm">{profile.about}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
        <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm">
          Express Interest
        </button>
        <button className="flex-1 border border-red-600 text-red-600 py-2 rounded-lg hover:bg-red-50 transition-colors font-semibold text-sm">
          Send Message
        </button>
      </div>
    </div>
  );
}
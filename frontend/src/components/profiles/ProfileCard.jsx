import React from "react";

export default function ProfileCard({ profile }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-lg transition">
      {profile.image ? (
        <img
          src={profile.image}
          alt={profile.fullName || profile.name}
          className="w-24 h-24 mx-auto rounded-full object-cover"
        />
      ) : (
        <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
          {profile.fullName?.[0] || profile.name?.[0] || "?"}
        </div>
      )}

      <h4 className="mt-3 font-semibold text-gray-800">
        {profile.fullName || profile.name}
      </h4>
      <p className="text-sm text-gray-600">
        {profile.age} yrs • {profile.location}
      </p>

      <span
        className={`text-xs inline-block mt-2 px-3 py-1 rounded-full ${
          profile.gender === "Female"
            ? "bg-pink-100 text-pink-700"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {profile.gender}
      </span>
    </div>
  );
}
// import React from "react";

// export default function ProfileCard({ profile }) {
//   return (
//     <div className="border rounded-lg shadow bg-white p-4 text-center hover:shadow-lg transition">
//       <img
//         src={profile.photo}
//         alt={profile.name}
//         className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
//       />
//       <h2 className="text-xl font-semibold text-red-600">{profile.name}</h2>
//       <p className="text-gray-600">
//         {profile.age} years • {profile.location}
//       </p>
//       <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
//         View Profile
//       </button>
//     </div>
//   );
// }

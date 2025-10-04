import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "./ProfileCard";

export default function ProfilesGrid() {
  const [profiles, setProfiles] = useState([]);
  const [filter, setFilter] = useState("all"); // Gender filter
  const [religionFilter, setReligionFilter] = useState("all"); // Religion filter

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/profiles")
      .then((r) => {
        console.log("API response:", r.data);
        setProfiles(r.data.profiles || []);
      })
      .catch((e) => console.error(e));
  }, []);

  const filteredProfiles = profiles.filter((p) => {
    // Gender Filter
    const genderMatch =
      filter === "all"
        ? true
        : filter === "brides"
        ? p.gender === "Female"
        : p.gender === "Male";

    // Religion Filter
    const religionMatch =
      religionFilter === "all" ? true : p.religion === religionFilter;

    return genderMatch && religionMatch;
  });

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-red-600">
        Tamil Brides & Grooms
      </h3>

      {/* Religion Filter */}
      <div className="flex gap-3 mb-4">
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
      <div className="flex gap-3 mb-6">
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
      </div>

      {!Array.isArray(filteredProfiles) || filteredProfiles.length === 0 ? (
        <p className="text-gray-500">No profiles found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((p) => (
            <ProfileCard key={p.id} profile={p} />
          ))}
        </div>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { mockProfiles } from "../../config/mockData"; 

// export default function ProfilesList() {
//   const [profiles, setProfiles] = useState([]);
//   const [filter, setFilter] = useState("all"); 
//   const [religionFilter, setReligionFilter] = useState("all"); 

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         const res = await axios.get(import.meta.env.VITE_API_URL + "/profiles");
//         const data = res.data?.profiles || [];
//         setProfiles(Array.isArray(data) && data.length > 0 ? data : mockProfiles);
//       } catch (err) {
//         console.error("API error, loading mock data:", err);
//         setProfiles(mockProfiles);
//       }
//     };
//     fetchProfiles();
//   }, []);

//   const filteredProfiles = profiles.filter((p) => {
//     const genderMatch =
//       filter === "all"
//         ? true
//         : filter === "brides"
//         ? p.gender === "Female"
//         : p.gender === "Male";
//     const religionMatch =
//       religionFilter === "all" ? true : p.religion === religionFilter;
//     return genderMatch && religionMatch;
//   });

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-4xl font-extrabold mb-8 text-center text-red-600 tracking-wide">
//         Tamil Brides & Grooms
//       </h2>

//       {/* Filters */}
//       <div className="flex flex-wrap justify-center gap-3 mb-8">
//         {["all", "Hindu", "Muslim", "Christian"].map((rel) => (
//           <button
//             key={rel}
//             onClick={() => setReligionFilter(rel === "all" ? "all" : rel)}
//             className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
//               religionFilter === (rel === "all" ? "all" : rel)
//                 ? "bg-red-600 text-white shadow-lg scale-105"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
//             }`}
//           >
//             {rel === "all" ? "All Religions" : rel}
//           </button>
//         ))}
//       </div>
//       <div className="flex justify-center gap-3 mb-12">
//         <button
//           onClick={() => setFilter("brides")}
//           className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
//             filter === "brides"
//               ? "bg-red-600 text-white shadow-lg scale-105"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
//           }`}
//         >
//           Brides
//         </button>
//         <button
//           onClick={() => setFilter("grooms")}
//           className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
//             filter === "grooms"
//               ? "bg-red-600 text-white shadow-lg scale-105"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
//           }`}
//         >
//           Grooms
//         </button>
//       </div>

//       {!filteredProfiles.length ? (
//         <p className="text-gray-500 text-center text-lg">No profiles found</p>
//       ) : (
//         <div className="flex flex-col gap-10">
//           {filteredProfiles.map((p) => (
//             <div
//               key={p.id}
//               className="relative bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:scale-[1.02] transition-transform duration-300"
//             >
//               {/* Profile Image */}
//               <div className="w-40 h-40 flex-shrink-0 mx-auto sm:mx-0">
//                 <img
//                   src={p.image || `https://randomuser.me/api/portraits/${p.gender === "Female" ? "women" : "men"}/${p.id % 100}.jpg`}
//                   alt={p.name || "Profile"}
//                   className="w-full h-full object-cover rounded-full border-4 border-red-500 shadow-lg"
//                 />
//               </div>

//               {/* Details */}
//               <div className="flex-1 flex flex-col gap-4 text-gray-800">
//                 {/* Personal Info */}
//                 <div className="mb-2">
//                   <h3 className="text-xl font-bold text-red-600 mb-2">Personal Info</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                     <p><span className="font-semibold">Name:</span> {p.name || "-"}</p>
//                     <p><span className="font-semibold">Gender:</span> {p.gender || "-"}</p>
//                     <p><span className="font-semibold">Age:</span> {p.age || "-"}</p>
//                     <p><span className="font-semibold">Partner Age:</span> {p.partnerAge || `${p.partnerAgeFrom || "-"} - ${p.partnerAgeTo || "-"}`}</p>
//                     <p><span className="font-semibold">Religion:</span> {p.religion || "-"}</p>
//                     <p><span className="font-semibold">Caste:</span> {p.caste || p.manualCaste || "-"}</p>
//                     <p><span className="font-semibold">Sub Caste:</span> {p.subCaste || "-"}</p>
//                     <p><span className="font-semibold">Marital Status:</span> {p.maritalStatus || "-"}</p>
//                   </div>
//                 </div>

//                 {/* Family Info */}
//                 <div className="mb-2">
//                   <h3 className="text-xl font-bold text-red-600 mb-2">Family Info</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                     <p><span className="font-semibold">Family Status:</span> {p.familyStatus || "-"}</p>
//                     <p><span className="font-semibold">Family Type:</span> {p.familyType || "-"}</p>
//                   </div>
//                 </div>

//                 {/* Professional Info */}
//                 <div>
//                   <h3 className="text-xl font-bold text-red-600 mb-2">Professional Info</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                     <p><span className="font-semibold">Education:</span> {p.education || "-"}</p>
//                     <p><span className="font-semibold">Occupation:</span> {p.occupation || "-"}</p>
//                     <p><span className="font-semibold">Annual Income:</span> {p.annualIncome || `${p.annualIncomeFrom || "-"} - ${p.annualIncomeTo || "-"}`}</p>
//                     <p><span className="font-semibold">Location:</span> {p.location || "-"}</p>
//                     <p><span className="font-semibold">Height:</span> {p.height || "-"}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



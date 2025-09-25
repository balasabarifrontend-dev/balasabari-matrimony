// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProfileCard from "./ProfileCard";

// export default function ProfilesGrid() {
//   const [profiles, setProfiles] = useState([]);
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     axios
//       .get(import.meta.env.VITE_API_URL + "/profiles")
//       .then((r) => {
//         console.log("API response:", r.data);
//         setProfiles(r.data.profiles || []);
//       })
//       .catch((e) => console.error(e));
//   }, []);

//   const filteredProfiles =
//     filter === "all"
//       ? profiles
//       : profiles.filter((p) =>
//           filter === "brides"
//             ? (p.user?.gender || p.gender) === "Female"
//             : (p.user?.gender || p.gender) === "Male"
//         );

//   return (
//     <div>
//       <h3 className="text-xl font-semibold mb-4 text-red-600">
//         Tamil Brides & Grooms
//       </h3>

//       <div className="flex gap-3 mb-6">
//         <button
//           onClick={() => setFilter("brides")}
//           className={`px-4 py-2 rounded-md text-sm font-medium transition ${
//             filter === "brides"
//               ? "bg-red-600 text-white shadow"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//           }`}
//         >
//           Brides
//         </button>
//         <button
//           onClick={() => setFilter("grooms")}
//           className={`px-4 py-2 rounded-md text-sm font-medium transition ${
//             filter === "grooms"
//               ? "bg-red-600 text-white shadow"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//           }`}
//         >
//           Grooms
//         </button>
//       </div>

//       {!Array.isArray(filteredProfiles) || filteredProfiles.length === 0 ? (
//         <p className="text-gray-500">No profiles found</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProfiles.map((p) => (
//             <ProfileCard key={p.id} profile={p} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { mockProfiles } from "../../config/mockData";

export default function ProfilesGrid({ filters }) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    setProfiles(mockProfiles); // load mock data
  }, []);

  const filtered = profiles.filter((p) => {
    if (!p) return false;

    const matchesName =
      !filters?.name ||
      p.name.toLowerCase().includes(filters.name.toLowerCase());

    const matchesAge =
      !filters?.age || p.age === Number(filters.age);

    const matchesGender =
      !filters?.gender || p.gender === filters.gender;

    const matchesReligion =
      !filters?.religion || p.religion === filters.religion;

    const matchesMinAge =
      !filters?.minAge || p.age >= Number(filters.minAge);

    const matchesMaxAge =
      !filters?.maxAge || p.age <= Number(filters.maxAge);

    const matchesLocation =
      !filters?.location ||
      p.location.toLowerCase().includes(filters.location.toLowerCase());

    return (
      matchesName &&
      matchesAge &&
      matchesGender &&
      matchesReligion &&
      matchesMinAge &&
      matchesMaxAge &&
      matchesLocation
    );
  });

  return (
    <div>
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No profiles found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProfileCard key={p.id} profile={p} />
          ))}
        </div>
      )}
    </div>
  );
}





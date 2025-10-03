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

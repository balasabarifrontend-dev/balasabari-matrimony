import React, { useState } from "react";
import axios from "axios";

const casteOptions = {
  Brahmin: ["Iyer", "Iyengar", "Smartha", "Others"],
  Mudaliar: ["Thondaimandala", "Thiruvathira", "Saiva", "Others"],
  Nadar: ["Gramani", "Shanar", "Others"],
  Vanniyar: ["Padayatchi", "Gounder", "Others"],
  Muslim: ["Sunni", "Shia", "Others"],
  Christian: ["Roman Catholic", "CSI", "Pentecost", "Others"],
};

export default function FilterSidebar({ onSearch }) {
  const [filters, setFilters] = useState({
    gender: "",
    ageFrom: "",
    ageTo: "",
    partnerAgeFrom: "",
    partnerAgeTo: "",
    religion: "",
    caste: "",
    subCaste: "",
    manualCaste: "",
    maritalStatus: "",
    height: "",
    familyStatus: "",
    familyType: "",
    education: "",
    occupation: "",
    annualIncomeFrom: "",
    annualIncomeTo: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const change = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const apply = async () => {
    setLoading(true);
    try {
      const payload = {
        ...filters,
        caste: filters.caste === "Other" ? filters.manualCaste : filters.caste,
      };

      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/profiles/search",
        payload
      );
      if (onSearch) onSearch(res.data.profiles || res.data || []);
    } catch (e) {
      console.error("Filter search error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-h-screen overflow-y-auto">
      <h3 className="text-xl font-bold text-red-600 mb-6">Advanced Filters</h3>

      <div className="space-y-5">
        {/* Gender */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Gender</label>
          <select
            name="gender"
            value={filters.gender}
            onChange={change}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Any</option>
            <option value="Male">Groom</option>
            <option value="Female">Bride</option>
          </select>
        </div>

        {/* Age Range */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Age</label>
          <div className="flex gap-3">
            <input
              type="number"
              name="ageFrom"
              value={filters.ageFrom}
              onChange={change}
              placeholder="From"
              className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <input
              type="number"
              name="ageTo"
              value={filters.ageTo}
              onChange={change}
              placeholder="To"
              className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Partner Age Range */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Partner Age</label>
          <div className="flex gap-3">
            <input
              type="number"
              name="partnerAgeFrom"
              value={filters.partnerAgeFrom}
              onChange={change}
              placeholder="From"
              className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <input
              type="number"
              name="partnerAgeTo"
              value={filters.partnerAgeTo}
              onChange={change}
              placeholder="To"
              className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Religion */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Religion</label>
          <select
            name="religion"
            value={filters.religion}
            onChange={change}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Any</option>
            <option value="Hindu">Hindu</option>
            <option value="Christian">Christian</option>
            <option value="Muslim">Muslim</option>
          </select>
        </div>

        {/* Caste & Subcaste */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Caste</label>
          <select
            name="caste"
            value={filters.caste}
            onChange={change}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Any</option>
            {Object.keys(casteOptions).map((caste) => (
              <option key={caste} value={caste}>
                {caste}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>

          {filters.caste && filters.caste !== "Other" && (
            <select
              name="subCaste"
              value={filters.subCaste}
              onChange={change}
              className="w-full border rounded-lg p-2 mt-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Any</option>
              {casteOptions[filters.caste].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          )}

          {filters.caste === "Other" && (
            <input
              type="text"
              name="manualCaste"
              value={filters.manualCaste}
              onChange={change}
              placeholder="Enter your caste"
              className="w-full border rounded-lg p-2 mt-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          )}
        </div>

        {/* Marital Status */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Marital Status</label>
          <select
            name="maritalStatus"
            value={filters.maritalStatus}
            onChange={change}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Any</option>
            <option value="Never Married">Never Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        {/* Height */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Height (ft)</label>
          <input
            type="text"
            name="height"
            value={filters.height}
            onChange={change}
            placeholder="Eg: 5.5"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Family Status & Type */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Family Status</label>
          <input
            type="text"
            name="familyStatus"
            value={filters.familyStatus}
            onChange={change}
            placeholder="Eg: Middle Class"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Family Type</label>
          <input
            type="text"
            name="familyType"
            value={filters.familyType}
            onChange={change}
            placeholder="Eg: Joint / Nuclear"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Education */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Education</label>
          <input
            type="text"
            name="education"
            value={filters.education}
            onChange={change}
            placeholder="Eg: B.Tech, MBA"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Occupation</label>
          <input
            type="text"
            name="occupation"
            value={filters.occupation}
            onChange={change}
            placeholder="Eg: Software Engineer"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Annual Income */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Annual Income (Rs)</label>
          <div className="flex gap-3">
            <input
              type="number"
              name="annualIncomeFrom"
              value={filters.annualIncomeFrom}
              onChange={change}
              placeholder="From"
              className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <input
              type="number"
              name="annualIncomeTo"
              value={filters.annualIncomeTo}
              onChange={change}
              placeholder="To"
              className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={change}
            placeholder="City / District"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Apply Button */}
        <button
          onClick={apply}
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "Applying..." : "Apply Filters"}
        </button>
      </div>
    </div>
  );
}


// import React, { useState } from "react";
// import axios from "axios";

// const casteOptions = {
//   Brahmin: ["Iyer", "Iyengar", "Smartha", "Others"],
//   Mudaliar: ["Thondaimandala", "Thiruvathira", "Saiva", "Others"],
//   Nadar: ["Gramani", "Shanar", "Others"],
//   Vanniyar: ["Padayatchi", "Gounder", "Others"],
//   Muslim: ["Sunni", "Shia", "Others"],
//   Christian: ["Roman Catholic", "CSI", "Pentecost", "Others"],
// };

// export default function FilterSidebar({ onSearch }) {
//   const [filters, setFilters] = useState({
//     ageFrom: "",
//     ageTo: "",
//     religion: "",
//     caste: "",
//     subCaste: "",
//     manualCaste: "",
//     location: "",
//     education: "",
//     profession: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const change = (e) =>
//     setFilters({ ...filters, [e.target.name]: e.target.value });

//   const apply = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         ...filters,
//         caste: filters.caste === "Other" ? filters.manualCaste : filters.caste,
//       };

//       const res = await axios.post(
//         import.meta.env.VITE_API_URL + "/profiles/search",
//         payload
//       );
//       if (onSearch) onSearch(res.data.profiles || res.data || []);
//     } catch (e) {
//       console.error("Filter search error:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg">
//       <h3 className="font-semibold text-red-600 mb-4">Filters</h3>

//       <div className="space-y-4">
//         {/* Age */}
//         <div>
//           <label className="block text-sm font-medium">Age</label>
//           <div className="flex space-x-2 mt-1">
//             <input
//               type="number"
//               name="ageFrom"
//               value={filters.ageFrom}
//               onChange={change}
//               placeholder="From"
//               className="w-1/2 border p-2 rounded"
//             />
//             <input
//               type="number"
//               name="ageTo"
//               value={filters.ageTo}
//               onChange={change}
//               placeholder="To"
//               className="w-1/2 border p-2 rounded"
//             />
//           </div>
//         </div>

//         {/* Religion */}
//         <div>
//           <label className="block text-sm font-medium">Religion</label>
//           <select
//             name="religion"
//             value={filters.religion}
//             onChange={change}
//             className="w-full border p-2 rounded mt-1"
//           >
//             <option value="">Any</option>
//             <option value="Hindu">Hindu</option>
//             <option value="Christian">Christian</option>
//             <option value="Muslim">Muslim</option>
//           </select>
//         </div>

//         {/* Caste + Subcaste */}
//         <div>
//           <label className="block text-sm font-medium">Caste</label>
//           <select
//             name="caste"
//             value={filters.caste}
//             onChange={change}
//             className="w-full border p-2 rounded mt-1"
//           >
//             <option value="">Any</option>
//             {Object.keys(casteOptions).map((caste) => (
//               <option key={caste} value={caste}>
//                 {caste}
//               </option>
//             ))}
//             <option value="Other">Other</option>
//           </select>

//           {filters.caste && filters.caste !== "Other" && (
//             <select
//               name="subCaste"
//               value={filters.subCaste}
//               onChange={change}
//               className="w-full border p-2 rounded mt-2"
//             >
//               <option value="">Any</option>
//               {casteOptions[filters.caste].map((sub) => (
//                 <option key={sub} value={sub}>
//                   {sub}
//                 </option>
//               ))}
//             </select>
//           )}

//           {filters.caste === "Other" && (
//             <input
//               type="text"
//               name="manualCaste"
//               value={filters.manualCaste}
//               onChange={change}
//               placeholder="Enter your caste"
//               className="w-full border p-2 rounded mt-2"
//             />
//           )}
//         </div>

//         {/* Location */}
//         <div>
//           <label className="block text-sm font-medium">Location</label>
//           <input
//             type="text"
//             name="location"
//             value={filters.location}
//             onChange={change}
//             placeholder="City / District"
//             className="w-full border p-2 rounded mt-1"
//           />
//         </div>

//         {/* Education */}
//         <div>
//           <label className="block text-sm font-medium">Education</label>
//           <input
//             type="text"
//             name="education"
//             value={filters.education}
//             onChange={change}
//             placeholder="Eg: B.Tech, MBA"
//             className="w-full border p-2 rounded mt-1"
//           />
//         </div>

//         {/* Profession */}
//         <div>
//           <label className="block text-sm font-medium">Profession</label>
//           <input
//             type="text"
//             name="profession"
//             value={filters.profession}
//             onChange={change}
//             placeholder="Eg: Software Engineer"
//             className="w-full border p-2 rounded mt-1"
//           />
//         </div>

//         {/* Apply */}
//         <button
//           onClick={apply}
//           disabled={loading}
//           className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
//         >
//           {loading ? "Applying..." : "Apply Filters"}
//         </button>
//       </div>
//     </div>
//   );
// }

// src/components/profiles/FilterSidebar.jsx

// import React from "react";

// export default function FilterSidebar({ filters = {}, setFilters = () => {} }) {
//   const { minAge = "", maxAge = "", location = "", religion = "", gender = "" } = filters;

//   return (
//     <aside className="bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-gray-100">
//       {/* Title */}
//       <h3 className="text-xl font-bold text-gray-800 border-b pb-3">
//         Refine Your Search
//       </h3>

//       {/* Age Range */}
//       <div>
//         <label className="block text-gray-600 font-medium mb-2">Age Range</label>
//         <div className="flex gap-3">
//           <input
//             type="number"
//             placeholder="Min"
//             value={minAge}
//             onChange={(e) => setFilters({ ...filters, minAge: e.target.value })}
//             className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//           />
//           <input
//             type="number"
//             placeholder="Max"
//             value={maxAge}
//             onChange={(e) => setFilters({ ...filters, maxAge: e.target.value })}
//             className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>
//       </div>

//       {/* Gender */}
//       <div>
//         <label className="block text-gray-600 font-medium mb-2">Gender</label>
//         <select
//           value={gender}
//           onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//         >
//           <option value="">Any</option>
//           <option value="Male">Groom</option>
//           <option value="Female">Bride</option>
//         </select>
//       </div>

//       {/* Religion */}
//       <div>
//         <label className="block text-gray-600 font-medium mb-2">Religion</label>
//         <select
//           value={religion}
//           onChange={(e) => setFilters({ ...filters, religion: e.target.value })}
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//         >
//           <option value="">Any</option>
//           <option value="Hindu">Hindu</option>
//           <option value="Muslim">Muslim</option>
//           <option value="Christian">Christian</option>
//           <option value="Sikh">Sikh</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>

//       {/* Location */}
//       <div>
//         <label className="block text-gray-600 font-medium mb-2">Location</label>
//         <input
//           type="text"
//           placeholder="Enter city"
//           value={location}
//           onChange={(e) => setFilters({ ...filters, location: e.target.value })}
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//         />
//       </div>

//       {/* Apply Button */}
//       <button
//         onClick={() => console.log("Filters applied:", filters)}
//         className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
//       >
//         Apply Filters
//       </button>
//     </aside>
//   );
// }



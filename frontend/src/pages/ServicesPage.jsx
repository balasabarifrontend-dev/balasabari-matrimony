import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-red-700">
        Our Services
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="text-center text-gray-500">No services found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.id}
              className="border p-6 rounded-lg shadow hover:shadow-lg bg-white transition"
            >
              <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
              <p className="text-gray-600">{s.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// import React, { useState } from "react";
// import ProfilesGrid from "../components/profiles/ProfilesGrid";
// import FilterSidebar from "../components/profiles/FilterSidebar";
// import Input from "../components/ui/Input";
// import Select from "../components/ui/Select";
// import Button from "../components/ui/Button";
// import { mockProfiles } from "../config/mockData";

// export default function SearchPage() {
//   const [form, setForm] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     religion: "",
//   });

//   const [filters, setFilters] = useState({});
//   const [selectedType, setSelectedType] = useState(""); // ✅ Bride/Groom filter

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Searching with:", form);
//     alert("Search triggered! (Mock only)");
//   };

//   // ✅ Apply mock filtering
//   const filteredProfiles = mockProfiles.filter((p) => {
//     const ageMatch =
//       (!filters.minAge || p.age >= filters.minAge) &&
//       (!filters.maxAge || p.age <= filters.maxAge);

//     const locationMatch =
//       !filters.location ||
//       p.location.toLowerCase().includes(filters.location.toLowerCase());

//     const genderMatch =
//       !selectedType || p.gender?.toLowerCase() === selectedType.toLowerCase();

//     return ageMatch && locationMatch && genderMatch;
//   });

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* ✅ Title */}
//       <h1 className="text-3xl font-bold text-center mb-8 text-red-700">
//         Search Profiles
//       </h1>

//       {/* ✅ Search Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow mb-10"
//       >
//         <Input
//           type="text"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Name"
//         />
//         <Input
//           type="number"
//           name="age"
//           value={form.age}
//           onChange={handleChange}
//           placeholder="Age"
//         />

//         <Select name="gender" value={form.gender} onChange={handleChange}>
//           <option value="">Gender</option>
//           <option>Male</option>
//           <option>Female</option>
//         </Select>

//         <Select name="religion" value={form.religion} onChange={handleChange}>
//           <option value="">Religion</option>
//           <option>Hindu</option>
//           <option>Christian</option>
//           <option>Muslim</option>
//           <option>Other</option>
//         </Select>

//         <Button
//           type="submit"
//           variant="primary"
//           fullWidth
//           className="md:col-span-2"
//         >
//           Search
//         </Button>
//       </form>

//       {/* ✅ Bride/Groom Toggle */}
//       <div className="flex justify-center gap-4 mb-8">
//         <Button
//           variant={selectedType === "female" ? "primary" : "outline"}
//           onClick={() => setSelectedType("female")}
//         >
//           Brides
//         </Button>
//         <Button
//           variant={selectedType === "male" ? "primary" : "outline"}
//           onClick={() => setSelectedType("male")}
//         >
//           Grooms
//         </Button>
//         <Button
//           variant={!selectedType ? "primary" : "outline"}
//           onClick={() => setSelectedType("")}
//         >
//           All
//         </Button>
//       </div>

//       {/* ✅ Results with Sidebar */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         <aside className="lg:col-span-1">
//           <FilterSidebar filters={filters} setFilters={setFilters} />
//         </aside>
//         <section className="lg:col-span-3">
//           <ProfilesGrid profiles={filteredProfiles} />
//         </section>
//       </div>
//     </div>
//   );
// }



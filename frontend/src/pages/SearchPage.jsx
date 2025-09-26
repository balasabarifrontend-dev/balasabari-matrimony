import React, { useState } from "react";
import ProfilesGrid from "../components/profiles/ProfilesGrid";
import FilterSidebar from "../components/profiles/FilterSidebar";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";

export default function SearchPage() {
  // Unified filters state for both form and sidebar
  const [filters, setFilters] = useState({
    name: "",
    age: "",
    gender: "",
    religion: "",
    ageFrom: "",
    ageTo: "",
    caste: "",
    subCaste: "",
    manualCaste: "",
    location: "",
    education: "",
    profession: "",
  });

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can hook this to backend or pass filters to ProfilesGrid
    console.log("Searching with:", filters);
    // Optionally trigger search in ProfilesGrid via props or context
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-8 text-red-700">
        Search Profiles
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow mb-10"
      >
        <Input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <Input
          type="number"
          name="age"
          value={filters.age}
          onChange={handleChange}
          placeholder="Age"
        />

        <Select name="gender" value={filters.gender} onChange={handleChange}>
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </Select>

        <Select name="religion" value={filters.religion} onChange={handleChange}>
          <option value="">Religion</option>
          <option>Hindu</option>
          <option>Christian</option>
          <option>Muslim</option>
          <option>Other</option>
        </Select>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          className="md:col-span-2"
        >
          Search
        </Button>
      </form>

      {/* Results with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </aside>
        <section className="lg:col-span-3">
          <ProfilesGrid filters={filters} />
        </section>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import ProfilesGrid from "../components/profiles/ProfilesGrid";
// import FilterSidebar from "../components/profiles/FilterSidebar";
// import Input from "../components/ui/Input";
// import Select from "../components/ui/Select";
// import Button from "../components/ui/Button";

// export default function SearchPage() {
//   // ✅ Search form + filters
//   const [filters, setFilters] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     religion: "",
//     minAge: "",
//     maxAge: "",
//     location: "",
//   });

//   const handleChange = (e) =>
//     setFilters({ ...filters, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Searching with:", filters);
//     // No backend yet, filtering happens in ProfilesGrid
//   };

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
//           value={filters.name}
//           onChange={handleChange}
//           placeholder="Name"
//         />
//         <Input
//           type="number"
//           name="age"
//           value={filters.age}
//           onChange={handleChange}
//           placeholder="Age"
//         />

//         <Select name="gender" value={filters.gender} onChange={handleChange}>
//           <option value="">Gender</option>
//           <option>Male</option>
//           <option>Female</option>
//         </Select>

//         <Select name="religion" value={filters.religion} onChange={handleChange}>
//           <option value="">Religion</option>
//           <option>Hindu</option>
//           <option>Christian</option>
//           <option>Muslim</option>
//           <option>Sikh</option>
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

//       {/* ✅ Results with Sidebar */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         <aside className="lg:col-span-1">
//           <FilterSidebar filters={filters} setFilters={setFilters} />
//         </aside>
//         <section className="lg:col-span-3">
//           <ProfilesGrid filters={filters} />
//         </section>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { profileService } from "../../services/profileService";

// Comprehensive caste data based on your document
const casteData = {
  Hindu: {
    "Forward / General": [
      "Brahmin (Iyer)", "Brahmin (Iyengar)", "Brahmin (Smartha)", "Brahmin (Others)",
      "Mudaliar (Thondaimandala)", "Mudaliar (Saiva)", "Mudaliar (Others)",
      "Chettiar (Vellan)", "Chettiar (Elur)", "Chettiar (Others)",
      "Naidu (Balija)", "Naidu (Gavara)", "Naidu (Kamma)", "Naidu (Others)"
    ],
    "Backward Classes (BC)": [
      "Nadar (Hindu)", "Mudaliar (Sengunthar)", "Chettiar", "Naidu", 
      "Yadava / Konar", "Gounder (some subgroups)", "Vanniyar (some regions)"
    ],
    "Most Backward Classes (MBC)": [
      "Agamudayar", "Vanniyar / Vanniya Kula Kshatriya", "Isai Vellalar",
      "Devanga Chettiar", "Nadar (except Christian)", "Kallar", "Maravar", 
      "Agamudayar (Thevar)", "Gounder (Kongu Vellalar)", "Mudaliar (some subgroups)",
      "Naidu (some subgroups)", "Chettiar (some subgroups)", "Kuravar", "Oddar",
      "Vettuva Gounder", "Muthuraja", "Thottia Naicker", "Yadava / Konar"
    ],
    "Scheduled Castes (SC)": [
      "Adi Dravida", "Arunthathiyar", "Chakkiliyan", "Devendrakula Velalar",
      "Pallar", "Paraiyan (Parayar)", "Vannan", "Valluvan", "Thandan"
    ],
    "Scheduled Tribes (ST)": [
      "Kani", "Malayali", "Kattunayakan", "Paniyan", "Irular", 
      "Kurumban", "Thottiyan", "Toda", "Kota", "Malai Vedan"
    ]
  },
  Christian: {
    "Backward Classes (BC)": [
      "Anglo Indian", "Latin Catholic", "Nadar (Christian)", 
      "Vanniyar (Christian)", "Vellalar (Christian)", "Pillai (Christian)",
      "Gounder (Christian)", "Chettiar (Christian)", "Naidu (Christian)",
      "Reddy (Christian)", "Devar (Christian)", "Konar / Yadava (Christian)",
      "Isai Vellalar (Christian)"
    ],
    "Most Backward Classes (MBC)": [
      "Paravar (Christian)", "Mukkuvar (Christian)", "Nanjil Nadar (Christian)",
      "Latin Catholic (Fishermen groups)"
    ],
    "Other Christians": [
      "Adi Dravida (Christian)", "Parayar (Christian)", "Pallan (Christian)",
      "Arunthathiyar (Christian)", "Chakkiliyar (Christian)", "Vannan (Christian)"
    ]
  },
  Muslim: {
    "Backward Classes (BC)": [
      "Labbai / Labbai (Tamil Muslims)", "Rowther (Rawther / Ravuthar)",
      "Maraikkayar (Marakkayar / Maricar)", "Sheik (Shaikh)", "Syed (Sayyid)",
      "Pathan", "Dudekula / Pinjara", "All Muslims (general)"
    ],
    "Most Backward Classes (MBC)": [
      "Meenavar Muslims (Fisherfolk)", "Labbai (backward regions)",
      "Dudekula / Pinjara (some districts)", "Sheik (rural belts)"
    ]
  }
};

// Height options in feet
const heightOptions = Array.from({ length: 16 }, (_, i) => {
  const feet = 4 + Math.floor(i / 2);
  const inches = (i % 2) * 6;
  return `${feet}.${inches}`;
}).filter(height => {
  const [feet, inches] = height.split('.').map(Number);
  return (feet === 4 && inches >= 0) || (feet === 5) || (feet === 6 && inches <= 6) || (feet === 7 && inches <= 3);
});

// Marital status options
const maritalStatusOptions = [
  "Never Married",
  "Divorced",
  "Widowed",
  "Separated",
  "Awaiting Divorce"
];

export default function FilterSidebar({ onSearch }) {
  const [filters, setFilters] = useState({
    gender: "",
    ageFrom: "",
    ageTo: "",
    partnerAgeFrom: "",
    partnerAgeTo: "",
    religion: "",
    casteCategory: "",
    caste: "",
    subCaste: "",
    maritalStatus: "",
    heightFrom: "",
    heightTo: "",
    familyStatus: "",
    familyType: "",
    education: "",
    occupation: "",
    annualIncomeFrom: "",
    annualIncomeTo: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const change = (e) => {
    const { name, value } = e.target;
    setFilters(prev => {
      const newFilters = { ...prev, [name]: value };
      
      // Reset dependent fields when religion changes
      if (name === "religion") {
        newFilters.casteCategory = "";
        newFilters.caste = "";
        newFilters.subCaste = "";
      }
      
      // Reset caste when category changes
      if (name === "casteCategory") {
        newFilters.caste = "";
        newFilters.subCaste = "";
      }
      
      return newFilters;
    });
    // Clear error when user changes filters
    if (error) setError("");
  };

  const apply = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Prepare the payload for the search
      const searchPayload = {
        gender: filters.gender || undefined,
        ageFrom: filters.ageFrom ? parseInt(filters.ageFrom) : undefined,
        ageTo: filters.ageTo ? parseInt(filters.ageTo) : undefined,
        partnerAgeFrom: filters.partnerAgeFrom ? parseInt(filters.partnerAgeFrom) : undefined,
        partnerAgeTo: filters.partnerAgeTo ? parseInt(filters.partnerAgeTo) : undefined,
        religion: filters.religion || undefined,
        caste: filters.caste || undefined,
        subCaste: filters.subCaste || undefined,
        maritalStatus: filters.maritalStatus || undefined,
        heightFrom: filters.heightFrom ? parseFloat(filters.heightFrom) * 30.48 : undefined, // Convert to cm
        heightTo: filters.heightTo ? parseFloat(filters.heightTo) * 30.48 : undefined, // Convert to cm
        familyStatus: filters.familyStatus || undefined,
        familyType: filters.familyType || undefined,
        education: filters.education || undefined,
        occupation: filters.occupation || undefined,
        annualIncomeFrom: filters.annualIncomeFrom ? parseFloat(filters.annualIncomeFrom) : undefined,
        annualIncomeTo: filters.annualIncomeTo ? parseFloat(filters.annualIncomeTo) : undefined,
        location: filters.location || undefined,
      };

      console.log('🔍 Searching with filters:', searchPayload);

      // Use profileService for the search
      const result = await profileService.searchProfiles(searchPayload);
      
      console.log('✅ Search results:', result);
      
      if (onSearch) {
        // Pass the profiles array to the parent component
        onSearch(result.profiles || result.content || result || []);
      }
      
    } catch (err) {
      console.error("❌ Filter search error:", err);
      setError(err.message || "Search failed. Please try again.");
      
      // If search fails, call onSearch with empty array to clear results
      if (onSearch) {
        onSearch([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      gender: "",
      ageFrom: "",
      ageTo: "",
      partnerAgeFrom: "",
      partnerAgeTo: "",
      religion: "",
      casteCategory: "",
      caste: "",
      subCaste: "",
      maritalStatus: "",
      heightFrom: "",
      heightTo: "",
      familyStatus: "",
      familyType: "",
      education: "",
      occupation: "",
      annualIncomeFrom: "",
      annualIncomeTo: "",
      location: "",
    });
    setError("");
    
    // Clear search results when resetting
    if (onSearch) {
      onSearch([]);
    }
  };

  // Quick apply common filters
  const quickFilter = (type) => {
    let quickFilters = {};
    
    switch (type) {
      case 'recent':
        quickFilters = { sortBy: 'createdAt', sortDirection: 'desc' };
        break;
      case 'verified':
        quickFilters = { verified: true };
        break;
      case 'premium':
        quickFilters = { premium: true };
        break;
      default:
        return;
    }
    
    setLoading(true);
    setError("");
    
    profileService.searchProfiles(quickFilters)
      .then(result => {
        if (onSearch) {
          onSearch(result.profiles || result.content || result || []);
        }
      })
      .catch(err => {
        console.error("Quick filter error:", err);
        setError(err.message || "Filter failed");
      })
      .finally(() => setLoading(false));
  };

  // Get available caste categories based on selected religion
  const getCasteCategories = () => {
    if (!filters.religion || !casteData[filters.religion]) return [];
    return Object.keys(casteData[filters.religion]);
  };

  // Get available castes based on selected religion and category
  const getCastes = () => {
    if (!filters.religion || !filters.casteCategory || !casteData[filters.religion]) return [];
    return casteData[filters.religion][filters.casteCategory] || [];
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-red-600">Advanced Filters</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-gray-600 hover:text-red-600 underline transition-colors"
          disabled={loading}
        >
          Reset All
        </button>
      </div>

      {/* Quick Filters */}
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-3">Quick Filters</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => quickFilter('recent')}
            disabled={loading}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors disabled:opacity-50"
          >
            Recent
          </button>
          <button
            onClick={() => quickFilter('verified')}
            disabled={loading}
            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors disabled:opacity-50"
          >
            Verified
          </button>
          <button
            onClick={() => quickFilter('premium')}
            disabled={loading}
            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition-colors disabled:opacity-50"
          >
            Premium
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="space-y-5">
        {/* Gender */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Looking for</label>
          <select
            name="gender"
            value={filters.gender}
            onChange={change}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            disabled={loading}
          >
            <option value="">Any Gender</option>
            <option value="Male">Groom</option>
            <option value="Female">Bride</option>
          </select>
        </div>

        {/* Age Range */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Age Range</label>
          <div className="flex gap-3">
            <input
              type="number"
              name="ageFrom"
              value={filters.ageFrom}
              onChange={change}
              placeholder="From"
              min="18"
              max="80"
              className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={loading}
            />
            <input
              type="number"
              name="ageTo"
              value={filters.ageTo}
              onChange={change}
              placeholder="To"
              min="18"
              max="80"
              className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={loading}
            />
          </div>
        </div>

        {/* Partner Age Range */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Preferred Partner Age</label>
          <div className="flex gap-3">
            <input
              type="number"
              name="partnerAgeFrom"
              value={filters.partnerAgeFrom}
              onChange={change}
              placeholder="From"
              min="18"
              max="80"
              className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={loading}
            />
            <input
              type="number"
              name="partnerAgeTo"
              value={filters.partnerAgeTo}
              onChange={change}
              placeholder="To"
              min="18"
              max="80"
              className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={loading}
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
            disabled={loading}
          >
            <option value="">Any Religion</option>
            <option value="Hindu">Hindu</option>
            <option value="Christian">Christian</option>
            <option value="Muslim">Muslim</option>
          </select>
        </div>

        {/* Caste Category (only show if religion selected) */}
        {filters.religion && (
          <div>
            <label className="block font-medium text-gray-700 mb-2">Caste Category</label>
            <select
              name="casteCategory"
              value={filters.casteCategory}
              onChange={change}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={loading}
            >
              <option value="">Any Category</option>
              {getCasteCategories().map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        )}

        {/* Caste (only show if religion and category selected) */}
        {filters.religion && filters.casteCategory && (
          <div>
            <label className="block font-medium text-gray-700 mb-2">Caste</label>
            <select
              name="caste"
              value={filters.caste}
              onChange={change}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={loading}
            >
              <option value="">Any Caste</option>
              {getCastes().map(caste => (
                <option key={caste} value={caste}>{caste}</option>
              ))}
            </select>
          </div>
        )}

        {/* Sub Caste */}
        {filters.caste && (
          <div>
            <label className="block font-medium text-gray-700 mb-2">Sub Caste</label>
            <input
              type="text"
              name="subCaste"
              value={filters.subCaste}
              onChange={change}
              placeholder="Enter sub-caste"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={loading}
            />
          </div>
        )}

        {/* Marital Status */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Marital Status</label>
          <select
            name="maritalStatus"
            value={filters.maritalStatus}
            onChange={change}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            disabled={loading}
          >
            <option value="">Any Status</option>
            {maritalStatusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Height Range */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Height Range (feet)</label>
          <div className="flex gap-3">
            <select
              name="heightFrom"
              value={filters.heightFrom}
              onChange={change}
              className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={loading}
            >
              <option value="">Min Height</option>
              {heightOptions.map(height => (
                <option key={`from-${height}`} value={height}>{height} ft</option>
              ))}
            </select>
            <select
              name="heightTo"
              value={filters.heightTo}
              onChange={change}
              className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={loading}
            >
              <option value="">Max Height</option>
              {heightOptions.map(height => (
                <option key={`to-${height}`} value={height}>{height} ft</option>
              ))}
            </select>
          </div>
        </div>

        {/* Family Status & Type */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Family Status</label>
          <select
            name="familyStatus"
            value={filters.familyStatus}
            onChange={change}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            disabled={loading}
          >
            <option value="">Any Status</option>
            <option value="Middle Class">Middle Class</option>
            <option value="Upper Middle Class">Upper Middle Class</option>
            <option value="Rich">Rich</option>
            <option value="Affluent">Affluent</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Family Type</label>
          <select
            name="familyType"
            value={filters.familyType}
            onChange={change}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            disabled={loading}
          >
            <option value="">Any Type</option>
            <option value="Joint">Joint Family</option>
            <option value="Nuclear">Nuclear Family</option>
          </select>
        </div>

        {/* Education */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Education</label>
          <input
            type="text"
            name="education"
            value={filters.education}
            onChange={change}
            placeholder="Eg: B.Tech, MBA, Doctor"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            disabled={loading}
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
            placeholder="Eg: Software Engineer, Doctor, Business"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            disabled={loading}
          />
        </div>

        {/* Annual Income */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Annual Income (₹ Lakhs)</label>
          <div className="flex gap-3">
            <input
              type="number"
              name="annualIncomeFrom"
              value={filters.annualIncomeFrom}
              onChange={change}
              placeholder="From"
              className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={loading}
            />
            <input
              type="number"
              name="annualIncomeTo"
              value={filters.annualIncomeTo}
              onChange={change}
              placeholder="To"
              className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={loading}
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
            placeholder="City / District / State"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            disabled={loading}
          />
        </div>

        {/* Apply Button */}
        <button
          onClick={apply}
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50 font-semibold flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </>
          ) : (
            "Apply Filters & Search"
          )}
        </button>
      </div>
    </div>
  );
}
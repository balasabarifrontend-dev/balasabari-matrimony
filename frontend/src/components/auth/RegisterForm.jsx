import React, { useState } from "react";
import axios from "../../api/axios"; // your axios instance
import Stepper from "../ui/Stepper";
import StepperController from "../ui/StepperControl";
import FloatingInput from "../ui/FloatingInput";

export default function RegisterForm({ isInModal = false, onRegisterSuccess, onSwitch, onClose }) {
  // Better modal detection: if any modal-specific props are passed, assume it's in a modal
  const inModal = isInModal || !!onRegisterSuccess || !!onSwitch || !!onClose;
  
  console.log('=== REGISTERFORM RENDERED ===');
  console.log('isInModal prop:', isInModal);
  console.log('Modal detection - inModal:', inModal);
  console.log('Props received:', { isInModal, onRegisterSuccess, onSwitch, onClose });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    // Step 1 – Register
    name: "",
    mobile: "",
    password: "",

    // Step 2 – Basic Details
    gender: "",
    dob: "",
    age: "",
    partnerAgeMin: "",
    partnerAgeMax: "",
    email: "",

    // Step 3 – Religion
    religion: "",
    willingOtherCaste: false,
    caste: "",
    subcaste: "",
    dosham: "",

    // Step 4 – Personal
    maritalStatus: "",
    childrenCount: "",
    childrenWithYou: false,
    height: "",
    familyStatus: "",
    familyType: "",

    // Step 5 – Professional
    education: "",
    specialization: "",
    employedIn: "",
    occupation: "",
    annualIncome: "",
    district: "",
    pincode: "",
    state: "",
    country: "",
    photos: [],

    // Step 6 – About Yourself
    about: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheckbox = (e) =>
    setForm({ ...form, [e.target.name]: e.target.checked });

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, photos: files });
  };

  const steps = [
    "Register",
    "Basic Details",
    "Religion Details",
    "Personal Details",
    "Professional Details",
    "About Yourself",
  ];

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Step 1: Register User (Authentication) - only send required fields
    const userRegistrationData = {
      email: form.email,
      mobile: form.mobile,
      password: form.password,
      name: form.name
    };

    console.log('Step 1: Registering user with data:', userRegistrationData);
    console.log('API URL:', import.meta.env.VITE_API_URL + "/auth/register");

    // Register the user first
    const userResponse = await axios.post(
      import.meta.env.VITE_API_URL + "/auth/register", 
      userRegistrationData,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    console.log('User registration successful:', userResponse.data);
    
    // Step 2: Create Profile with the user ID
    const userId = userResponse.data.id;
    
    const profileData = {
      fullName: form.name,
      gender: form.gender,
      age: form.age || (form.dob ? new Date().getFullYear() - new Date(form.dob).getFullYear() : null),
      location: form.district || form.state || form.country,
      religion: form.religion,
      caste: form.caste,
      userId: userId,
      // Add all other profile fields
      dob: form.dob,
      partnerAgeMin: form.partnerAgeMin,
      partnerAgeMax: form.partnerAgeMax,
      subcaste: form.subcaste,
      dosham: form.dosham,
      willingOtherCaste: form.willingOtherCaste,
      maritalStatus: form.maritalStatus,
      childrenCount: form.childrenCount,
      childrenWithYou: form.childrenWithYou,
      height: form.height,
      familyStatus: form.familyStatus,
      familyType: form.familyType,
      education: form.education,
      specialization: form.specialization,
      employedIn: form.employedIn,
      occupation: form.occupation,
      annualIncome: form.annualIncome,
      district: form.district,
      pincode: form.pincode,
      state: form.state,
      country: form.country,
      about: form.about
    };

    console.log('Step 2: Creating profile:', profileData);

    // Create the profile
    const profileResponse = await axios.post(
      import.meta.env.VITE_API_URL + "/profiles", 
      profileData,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log('Profile creation successful:', profileResponse.data);
    alert("Registration completed successfully!");
    
    // Call success callback if provided
    if (onRegisterSuccess) {
      onRegisterSuccess(userResponse.data);
    }
    
    // Close modal if in modal
    if (onClose) {
      onClose();
    }

  } catch (err) {
    console.error('=== REGISTRATION ERROR DETAILS ===');
    console.error('Full error object:', err);
    console.error('Error message:', err.message);
    console.error('Error code:', err.code);
    console.error('Error config:', err.config);
    console.error('Error response status:', err.response?.status);
    console.error('Error response status text:', err.response?.statusText);
    console.error('Error response headers:', err.response?.headers);
    console.error('Error response data:', err.response?.data);
    console.error('Error request:', err.request);
    
    if (err.response?.data) {
      alert(`Registration failed (${err.response.status}): ${JSON.stringify(err.response.data, null, 2)}`);
    } else if (err.request) {
      alert("Registration failed: No response received from server. Check if backend is running.");
    } else {
      alert("Registration failed: " + err.message);
    }
  } finally {
    setLoading(false);
  }
};

  // Heading per step
  const getStepHeading = () => {
    if (step === 1) return "Register for Free";
    else if (step === 2) return "Personal Details";
    else if (step === 3) return "Religion Details";
    else if (step === 4) return "Personal Details";
    else if (step === 5) return "Professional Details";
    else if (step === 6) return "About Yourself";
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
        {getStepHeading()}
      </h2>

      {step > 1 && (
  <Stepper 
    steps={steps.slice(1)} 
    currentStep={step - 1} // map form step to stepper step
  />
)}

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
  <div className="flex flex-col gap-4">
    <FloatingInput
      label="Select a Profile for"
      name="profileFor"
      value={form.profileFor}
      onChange={handleChange}
      required
      select
    >
      <option value="">Myself</option>
      <option value="Son">Son</option>
      <option value="Daughter">Daughter</option>
      <option value="Brother">Brother</option>
      <option value="Sister">Sister</option>
      <option value="Relative">Relative</option>
      <option value="Friend">Friend</option>
    </FloatingInput>

    <FloatingInput
      label="Full Name"
      name="name"
      value={form.name}
      onChange={handleChange}
      required
      className="w-full"
    />
    <FloatingInput
      label="Mobile Number"
      name="mobile"
      value={form.mobile}
      onChange={handleChange}
      required
      className="w-full"
    />
    <FloatingInput
      label="Create Password"
      name="password"
      type="password"
      value={form.password}
      onChange={handleChange}
      required
      className="w-full"
    />
  </div>
)}

        {step === 2 && (
  <div className="flex flex-col gap-4">
    {/* Gender Radio */}
    <div className="flex items-center space-x-4">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={form.gender === "Male"}
          onChange={handleChange}
        />
        Male
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={form.gender === "Female"}
          onChange={handleChange}
        />
        Female
      </label>
    </div>

    <FloatingInput
      label="Date of Birth"
      name="dob"
      type="date"
      value={form.dob}
      onChange={handleChange}
      className="w-full"
    />

    <FloatingInput
      label="Age"
      name="age"
      type="number"
      value={form.age}
      onChange={handleChange}
      className="w-full"
    />

    {/* Partner Age side by side */}
    <div className="grid grid-cols-2 gap-4">
      <FloatingInput
        label="Preferred Min Age"
        name="partnerAgeMin"
        type="number"
        value={form.partnerAgeMin}
        onChange={handleChange}
        className="w-full"
      />
      <FloatingInput
        label="Preferred Max Age"
        name="partnerAgeMax"
        type="number"
        value={form.partnerAgeMax}
        onChange={handleChange}
        className="w-full"
      />
    </div>

    <FloatingInput
      label="Email ID"
      name="email"
      type="email"
      value={form.email}
      onChange={handleChange}
      className="w-full"
    />
  </div>
)}


{step === 3 && (
  <div className="flex flex-col gap-4">
    <FloatingInput
      label="Religion"
      name="religion"
      value={form.religion}
      onChange={handleChange}
      className="w-full"
      select
    >
      <option value="">Hindu</option>
      <option value="Muslim">Muslim</option>
      <option value="Christian">Christian</option>
      <option value="Other">Other</option>
    </FloatingInput>

    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="willingOtherCaste"
        checked={form.willingOtherCaste}
        onChange={handleCheckbox}
      />
      <label>Willing to marry from other caste?</label>
    </div>

    <FloatingInput
      label="Caste"
      name="caste"
      value={form.caste}
      onChange={handleChange}
      className="w-full"
      select
    >
      <option value="">OBC</option>
      <option value="BC">BC</option>
      <option value="MBC">MBC</option>
      <option value="SC">SC/ST</option>
      <option value="Other">Other</option>
    </FloatingInput>

    <FloatingInput
      label="Subcaste"
      name="subcaste"
      value={form.subcaste}
      onChange={handleChange}
      className="w-full"
      select
    >
      <option value="">Vanniyar</option>
      <option value="Caste2">Thevar</option>
      <option value="Caste3">Mudaliar</option>
      <option value="Caste4">Iyer</option>
      <option value="Caste5">Iyengar</option>
      <option value="Caste6">Gounder</option>
      <option value="Caste7">Nadar</option>
      <option value="Caste8">Chettiar</option>
      <option value="Caste9">Other</option>
    </FloatingInput>

    <div className="flex items-center space-x-4">
      <label className="text-gray-600">Dosham:</label>
      {["Yes", "No", "Don't Know"].map((val) => (
        <label key={val} className="flex items-center gap-1">
          <input
            type="radio"
            name="dosham"
            value={val}
            checked={form.dosham === val}
            onChange={handleChange}
          />
          {val}
        </label>
      ))}
    </div>
  </div>
)}


{step === 4 && (
  <div className="flex flex-col gap-4">
    {/* Marital Status */}
    <FloatingInput
      label="Marital Status"
      name="maritalStatus"
      value={form.maritalStatus}
      onChange={handleChange}
      className="w-full"
      select
    >
      <option value="Single">Single</option>
      <option value="Divorced">Divorced</option>
      <option value="Widowed">Widowed</option>
    </FloatingInput>

    {/* No. of Children - only for Divorced or Widowed */}
    {(form.maritalStatus === "Divorced" || form.maritalStatus === "Widowed") && (
      <FloatingInput
        label="No. of Children"
        name="childrenCount"
        value={form.childrenCount}
        onChange={handleChange}
        className="w-full"
        select
      >
        <option value="">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3+">3+</option>
      </FloatingInput>
    )}

    {/* Children living with you */}
    {form.childrenCount && parseInt(form.childrenCount) > 0 && (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="childrenWithYou"
          checked={form.childrenWithYou}
          onChange={handleCheckbox}
        />
        <label>Are children living with you?</label>
      </div>
    )}

    {/* Height input + dropdown */}
    <FloatingInput
      label="Height (ft)"
      name="height"
      value={form.height}
      onChange={handleChange}
      className="w-full"
      list="heights"
    />
    <datalist id="heights">
      {Array.from({ length: 31 }, (_, i) => 4 + i * 0.1).map((h) => (
        <option key={h.toFixed(1)} value={h.toFixed(1)} />
      ))}
    </datalist>

    {/* Family Status */}
    <FloatingInput
      label="Family Status"
      name="familyStatus"
      value={form.familyStatus}
      onChange={handleChange}
      className="w-full"
      select
    >
      <option value="">Middle Class</option>
      <option value="Upper Middle Class">Upper Middle Class</option>
      <option value="Rich">Rich</option>
    </FloatingInput>

    {/* Family Type */}
    <FloatingInput
      label="Family Type"
      name="familyType"
      value={form.familyType}
      onChange={handleChange}
      className="w-full"
      select
    >
      <option value="">Joint</option>
      <option value="Nuclear">Nuclear</option>
    </FloatingInput>
  </div>
)}




{step === 5 && (
  <div className="flex flex-col gap-4">
    <FloatingInput
      label="Highest Education"
      name="education"
      value={form.education}
      onChange={handleChange}
      className="w-full"
      select
    >
      <option value="">Education</option>
      <option value="High School">High School</option>
      <option value="Bachelor's">Bachelor's</option>
      <option value="Master's">Master's</option>
      <option value="PhD">PhD</option>
    </FloatingInput>

    <FloatingInput
      label="Specialization"
      name="specialization"
      value={form.specialization}
      onChange={handleChange}
      className="w-full"
    />

    <FloatingInput
      label="Employed In"
      name="employedIn"
      value={form.employedIn}
      onChange={handleChange}
      className="w-full"
      select
    >
      <option value="">Select Employment Type</option>
      <option value="Private">Private</option>
      <option value="Government">Government</option>
      <option value="Self-Employed">Self-Employed</option>
      <option value="Business">Business</option>
      <option value="Not Employed">Not Employed</option>
    </FloatingInput>

    <FloatingInput
      label="Occupation"
      name="occupation"
      value={form.occupation}
      onChange={handleChange}
      className="w-full"
    />

    <FloatingInput
      label="Annual Income (Rs)"
      name="annualIncome"
      value={form.annualIncome}
      onChange={handleChange}
      className="w-full"
      select
    >
      <option value="">Select Income Range</option>
      <option value="0-2 L">0-2 L</option>
      <option value="2-5 L">2-5 L</option>
      <option value="5-10 L">5-10 L</option>
      <option value="10 L+">10 L+</option>
    </FloatingInput>

    <FloatingInput
      label="District"
      name="district"
      value={form.district}
      onChange={handleChange}
      className="w-full"
    />
    <FloatingInput
      label="Pincode"
      name="pincode"
      value={form.pincode}
      onChange={handleChange}
      className="w-full"
    />
    <FloatingInput
      label="State"
      name="state"
      value={form.state}
      onChange={handleChange}
      className="w-full"
    />
    <FloatingInput
      label="Country"
      name="country"
      value={form.country}
      onChange={handleChange}
      className="w-full"
    />
  </div>
)}



{/* STEP 6 – About Yourself */}
{step === 6 && (
  <div className="flex flex-col gap-4">
    <FloatingInput
      label="About Yourself"
      name="about"
      value={form.about}
      onChange={handleChange}
      textarea
      className="w-full"
    />
    <div>
      <label className="block mb-2 font-medium text-gray-700">
        Upload Photos / Resume
      </label>
      <div className="relative border-dashed border-2 border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-red-500 transition">
        <input
          type="file"
          multiple
          accept="image/*,application/pdf"
          onChange={handlePhotoUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <p className="text-gray-500">Drag & drop files here or click to upload</p>
      </div>
      <div className="flex space-x-2 mt-2 flex-wrap">
        {form.photos.map((file, idx) => (
          <img
            key={idx}
            src={URL.createObjectURL(file)}
            alt="preview"
            className="w-24 h-24 object-cover rounded border"
          />
        ))}
      </div>
    </div>
  </div>
)}

        <StepperController
          currentStep={step}
          totalSteps={steps.length}
          onNext={nextStep}
          onPrev={prevStep}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </form>
    </div>
  );
}
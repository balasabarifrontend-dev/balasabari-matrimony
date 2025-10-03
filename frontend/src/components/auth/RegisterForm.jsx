import React, { useState } from "react";
import axios from "axios";
import Stepper from "../ui/Stepper";
import StepperController from "../ui/StepperControl";
import FloatingInput from "../ui/FloatingInput";

export default function RegisterForm() {
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

    const payload = { ...form };
    if (form.dob) {
      payload.age = new Date().getFullYear() - new Date(form.dob).getFullYear();
    }

    try {
      await axios.post(import.meta.env.VITE_API_URL + "/api/auth", payload);
      alert("Registered successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Registration failed");
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
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
        {getStepHeading()}
      </h2>

      {/* Show Stepper only for steps 2-6 */}
      {step > 1 && <Stepper steps={steps.slice(1)} currentStep={step} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1 – Register */}
        {step === 1 && (
          <div className="space-y-4">
            <FloatingInput
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <FloatingInput
              label="Mobile Number"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
            />
            <FloatingInput
              label="Create Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* STEP 2 – Basic Details */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FloatingInput
              label="Gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
            />
            <FloatingInput
              label="Date of Birth"
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
            />
            <FloatingInput
              label="Age"
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
            />
            <FloatingInput
              label="Partner Age Min"
              name="partnerAgeMin"
              type="number"
              value={form.partnerAgeMin}
              onChange={handleChange}
            />
            <FloatingInput
              label="Partner Age Max"
              name="partnerAgeMax"
              type="number"
              value={form.partnerAgeMax}
              onChange={handleChange}
            />
            <FloatingInput
              label="Email ID"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        )}

        {/* STEP 3 – Religion Details */}
        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FloatingInput
              label="Religion"
              name="religion"
              value={form.religion}
              onChange={handleChange}
            />
            <div className="flex items-center space-x-2 col-span-full">
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
            />
            <FloatingInput
              label="Subcaste"
              name="subcaste"
              value={form.subcaste}
              onChange={handleChange}
            />
            <div className="flex items-center space-x-4 col-span-full">
              <label className="text-gray-600">Dosham:</label>
              {["Yes", "No", "Don't Know"].map((val) => (
                <label key={val}>
                  <input
                    type="radio"
                    name="dosham"
                    value={val}
                    checked={form.dosham === val}
                    onChange={handleChange}
                  />{" "}
                  {val}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4 – Personal Details */}
        {step === 4 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FloatingInput
              label="Marital Status"
              name="maritalStatus"
              value={form.maritalStatus}
              onChange={handleChange}
            />
            <FloatingInput
              label="No. of Children"
              name="childrenCount"
              value={form.childrenCount}
              onChange={handleChange}
            />
            <div className="flex items-center space-x-2 col-span-full">
              <input
                type="checkbox"
                name="childrenWithYou"
                checked={form.childrenWithYou}
                onChange={handleCheckbox}
              />
              <label>Are children living with you?</label>
            </div>
            <FloatingInput
              label="Height (ft)"
              name="height"
              value={form.height}
              onChange={handleChange}
            />
            <FloatingInput
              label="Family Status"
              name="familyStatus"
              value={form.familyStatus}
              onChange={handleChange}
            />
            <FloatingInput
              label="Family Type"
              name="familyType"
              value={form.familyType}
              onChange={handleChange}
            />
          </div>
        )}

        {/* STEP 5 – Professional Details */}
        {step === 5 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FloatingInput
              label="Highest Education"
              name="education"
              value={form.education}
              onChange={handleChange}
            />
            <FloatingInput
              label="Specialization"
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
            />
            <FloatingInput
              label="Employed In"
              name="employedIn"
              value={form.employedIn}
              onChange={handleChange}
            />
            <FloatingInput
              label="Occupation"
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
            />
            <FloatingInput
              label="Annual Income (Rs)"
              name="annualIncome"
              value={form.annualIncome}
              onChange={handleChange}
            />
            <FloatingInput
              label="District"
              name="district"
              value={form.district}
              onChange={handleChange}
            />
            <FloatingInput
              label="Pincode"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
            <FloatingInput
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
            />
            <FloatingInput
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
            />
          </div>
        )}

        {/* STEP 6 – About Yourself */}
        {step === 6 && (
          <div className="space-y-4">
            <FloatingInput
              label="About Yourself"
              name="about"
              value={form.about}
              onChange={handleChange}
              textarea
            />
            <div className="mt-4">
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
                <p className="text-gray-500">
                  Drag & drop files here or click to upload
                </p>
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

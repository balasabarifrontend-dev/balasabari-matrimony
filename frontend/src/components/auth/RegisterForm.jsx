// src/components/forms/RegisterForm.jsx
import React, { useState } from "react";
import { authService } from "../../services/AuthService";
import Stepper from "../ui/Stepper";
import StepperController from "../ui/StepperControl";
import FloatingInput from "../ui/FloatingInput";

export default function RegisterForm({ isInModal = false, onRegisterSuccess, onSwitch, onClose }) {
  const inModal = isInModal || !!onRegisterSuccess || !!onSwitch || !!onClose;
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const [form, setForm] = useState({
    profileFor: "Myself",
    name: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "Male",
    dob: "",
    age: "",
    partnerAgeMin: "25",
    partnerAgeMax: "35",
    email: "",
    religion: "Hindu",
    willingOtherCaste: false,
    caste: "OBC",
    subcaste: "Vanniyar",
    dosham: "No",
    maritalStatus: "Single",
    childrenCount: "0",
    childrenWithYou: false,
    height: "5.6",
    familyStatus: "Middle Class",
    familyType: "Joint",
    education: "Bachelor's",
    specialization: "",
    employedIn: "Private",
    occupation: "",
    annualIncome: "5-10 L",
    district: "",
    pincode: "",
    state: "",
    country: "India",
    about: "",
    photos: [],
  });

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi (National Capital Territory of Delhi)", "Jammu and Kashmir", "Ladakh",
    "Lakshadweep", "Puducherry"
  ];

  const tamilNaduDistricts = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
    "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram",
    "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
    "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
    "Ramanathapuram", "Ranipet", "Salem", "Sivagangai", "Tenkasi",
    "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
    "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
    "Vellore", "Villupuram", "Virudhunagar"
  ];

  const steps = [
    "Register",
    "Basic Details",
    "Religion Details",
    "Personal Details",
    "Professional Details",
    "About Yourself",
  ];

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const formatMobileNumber = (value) => value.replace(/\D/g, '').slice(0, 10);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === 'mobile') processedValue = formatMobileNumber(value);
    setForm(prev => ({ ...prev, [name]: processedValue }));

    if (name === 'dob' && value) {
      const age = calculateAge(value);
      setForm(prev => ({ ...prev, age: age.toString() }));
    }

    if (validationErrors[name]) setValidationErrors(prev => ({ ...prev, [name]: '' }));
    if (error) setError("");
  };

  const handleCheckbox = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setError("");

    const validFiles = files.filter(file => {
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) { setError(`File ${file.name} too large`); return false; }
        return true;
      } else if (file.type === 'application/pdf') {
        if (file.size > 10 * 1024 * 1024) { setError(`File ${file.name} too large`); return false; }
        return true;
      } else { setError(`File ${file.name} not supported`); return false; }
    });

    if (validFiles.length > 0) setForm(prev => ({ ...prev, photos: [...prev.photos, ...validFiles] }));
  };

  const removePhoto = (index) => {
    setForm(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
  };

  const validateStep = (step) => {
    const errors = {};
    switch(step) {
      case 1:
        if (!form.name?.trim()) errors.name = "Full name is required";
        if (!form.mobile?.trim()) errors.mobile = "Mobile number is required";
        if (!form.password) errors.password = "Password is required";
        if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match";
        break;
      case 2:
        // if (!form.dob) errors.dob = "Date of birth required";
        if (!form.email?.trim()) errors.email = "Email required";
        break;
      case 3:
        if (!form.religion) errors.religion = "Religion required";
        if (!form.caste) errors.caste = "Caste required";
        if (!form.subcaste) errors.subcaste = "Subcaste required";
        break;
      case 4:
        if (!form.maritalStatus) errors.maritalStatus = "Marital status required";
        if (!form.height) errors.height = "Height required";
        if (!form.familyStatus) errors.familyStatus = "Family status required";
        if (!form.familyType) errors.familyType = "Family type required";
        break;
      case 5:
        if (!form.education) errors.education = "Education required";
        if (!form.employedIn) errors.employedIn = "Employment required";
        if (!form.annualIncome) errors.annualIncome = "Income required";
        if (!form.district?.trim()) errors.district = "District required";
        if (!form.state?.trim()) errors.state = "State required";
        break;
      case 6:
        if (!form.about?.trim()) errors.about = "About yourself required";
        break;
      default: break;
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) { setStep(s => s + 1); setError(""); } 
    else setError("Please fix errors");
  };

  const prevStep = () => { setStep(s => s - 1); setError(""); setValidationErrors({}); };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const registrationData = {
    name: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    mobile: form.mobile.replace(/\D/g, ''),
    password: form.password,
    profileFor: form.profileFor,
    gender: form.gender,
    dob: form.dob
  };

  console.log("🚀 Registration data:", registrationData);
  
  setLoading(true);
  setError("");
  
  try {
    // 1. Register user
    const userResult = await authService.register(registrationData);
    console.log("✅ User registered:", userResult);
    
    // 2. Create profile automatically
    const profileData = {
      fullName: form.name.trim(),
      gender: form.gender,
      age: parseInt(form.age) || calculateAge(form.dob),
      location: `${form.district || ''}, ${form.state || ''}, ${form.country || ''}`.trim(),
      religion: form.religion,
      caste: form.caste,
      dateOfBirth: form.dob,
      subcaste: form.subcaste,
      dosham: form.dosham,
      willingOtherCaste: form.willingOtherCaste,
      maritalStatus: form.maritalStatus,
      height: parseFloat(form.height),
      familyStatus: form.familyStatus,
      familyType: form.familyType,
      education: form.education,
      employedIn: form.employedIn,
      occupation: form.occupation,
      annualIncome: form.annualIncome,
      district: form.district,
      state: form.state,
      country: form.country,
      about: form.about
    };

    console.log("📝 Creating profile:", profileData);
    const profileResult = await authService.createProfile(profileData);
    console.log("✅ Profile created:", profileResult);

    // 3. Success
    if (onRegisterSuccess) onRegisterSuccess({ 
      user: userResult.user, 
      profile: profileResult, 
      token: userResult.token 
    });
    
    alert("Registration and profile creation successful!");
    
  } catch (err) {
    console.error("❌ Registration error:", err);
    setError(err.message || "Registration failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const getStepHeading = () => {
    const headings = {1:"Create Your Account",2:"Personal Details",3:"Religion & Community",4:"Family & Background",5:"Education & Career",6:"About Yourself"};
    return headings[step] || "Registration";
  };

  // const fillTestData = () => {
  //   setForm({...form, name:"Test User", mobile:"9876543210", password:"Test@123", confirmPassword:"Test@123", email:"test@example.com", dob:"1990-01-01", age:"34"});
  //   setError(""); setValidationErrors({});
  // };

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-red-600 mb-2">{getStepHeading()}</h2>
        <p className="text-gray-600 text-sm">Step {step} of {steps.length}</p>
        {/* {process.env.NODE_ENV==='development' && <button type="button" onClick={fillTestData} className="mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">Fill Test Data</button>} */}
      </div>

      {step>1 && <div className="mb-6"><Stepper steps={steps.slice(1)} currentStep={step-1} /></div>}
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4 animate-pulse">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1: Registration */}
        {step === 1 && (
          <div className="space-y-4">
            <FloatingInput
              label="Creating profile for"
              name="profileFor"
              value={form.profileFor}
              onChange={handleChange}
              required
              select
              error={validationErrors.profileFor}
            >
              <option value="Myself">Myself</option>
              <option value="Son">Son</option>
              <option value="Daughter">Daughter</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>
              <option value="Relative">Relative</option>
              <option value="Friend">Friend</option>
            </FloatingInput>

            <FloatingInput
              label="Full Name *"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              error={validationErrors.name}
              placeholder="Enter your full name"
            />

            <FloatingInput
              label="Mobile Number *"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
              type="tel"
              error={validationErrors.mobile}
              placeholder="10-digit mobile number"
              maxLength="10"
            />

            <FloatingInput
              label="Create Password *"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              error={validationErrors.password}
              placeholder="At least 6 characters with uppercase, lowercase & numbers"
            />

            <FloatingInput
              label="Confirm Password *"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              error={validationErrors.confirmPassword}
              placeholder="Re-enter your password"
            />
          </div>
        )}

        {/* Step 2: Basic Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
              <div className="flex items-center space-x-6">
                {["Male", "Female"].map(gender => (
                  <label key={gender} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={form.gender === gender}
                      onChange={handleChange}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <span className="text-gray-700">{gender}</span>
                  </label>
                ))}
              </div>
              {validationErrors.gender && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.gender}</p>
              )}
            </div>

            <FloatingInput
              label="Date of Birth *"
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              required
              error={validationErrors.dob}
            />

            <FloatingInput
              label="Age"
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              disabled
              className="bg-gray-100 cursor-not-allowed"
            />

            <div className="grid grid-cols-2 gap-4">
              <FloatingInput
                label="Preferred Min Age"
                name="partnerAgeMin"
                type="number"
                value={form.partnerAgeMin}
                onChange={handleChange}
                min="18"
                max="100"
                error={validationErrors.partnerAgeMin}
              />
              <FloatingInput
                label="Preferred Max Age"
                name="partnerAgeMax"
                type="number"
                value={form.partnerAgeMax}
                onChange={handleChange}
                min="18"
                max="100"
                error={validationErrors.partnerAgeMax}
              />
            </div>

            <FloatingInput
              label="Email ID *"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              error={validationErrors.email}
              placeholder="your.email@example.com"
            />
          </div>
        )}

        {/* Step 3: Religion Details */}
        {step === 3 && (
          <div className="space-y-4">
            <FloatingInput
              label="Religion *"
              name="religion"
              value={form.religion}
              onChange={handleChange}
              required
              select
              error={validationErrors.religion}
            >
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="Other">Other</option>
            </FloatingInput>

            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                name="willingOtherCaste"
                checked={form.willingOtherCaste}
                onChange={handleCheckbox}
                className="text-red-600 focus:ring-red-500"
              />
              <label className="text-gray-700">Willing to marry from other caste?</label>
            </div>

            <FloatingInput
              label="Caste *"
              name="caste"
              value={form.caste}
              onChange={handleChange}
              required
              select
              error={validationErrors.caste}
            >
              <option value="OBC">OBC</option>
              <option value="BC">BC</option>
              <option value="MBC">MBC</option>
              <option value="SC">SC/ST</option>
              <option value="Other">Other</option>
            </FloatingInput>

            <FloatingInput
              label="Subcaste *"
              name="subcaste"
              value={form.subcaste}
              onChange={handleChange}
              required
              select
              error={validationErrors.subcaste}
            >
              <option value="Vanniyar">Vanniyar</option>
              <option value="Thevar">Thevar</option>
              <option value="Mudaliar">Mudaliar</option>
              <option value="Iyer">Iyer</option>
              <option value="Iyengar">Iyengar</option>
              <option value="Gounder">Gounder</option>
              <option value="Nadar">Nadar</option>
              <option value="Chettiar">Chettiar</option>
              <option value="Other">Other</option>
            </FloatingInput>

            <div className="p-3 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">Dosham:</label>
              <div className="flex items-center space-x-4">
                {["Yes", "No", "Don't Know"].map((val) => (
                  <label key={val} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="dosham"
                      value={val}
                      checked={form.dosham === val}
                      onChange={handleChange}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <span className="text-gray-700">{val}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Personal Details */}
        {step === 4 && (
          <div className="space-y-4">
            <FloatingInput
              label="Marital Status *"
              name="maritalStatus"
              value={form.maritalStatus}
              onChange={handleChange}
              required
              select
              error={validationErrors.maritalStatus}
            >
              <option value="Single">Single</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </FloatingInput>

            {(form.maritalStatus === "Divorced" || form.maritalStatus === "Widowed") && (
              <FloatingInput
                label="No. of Children"
                name="childrenCount"
                value={form.childrenCount}
                onChange={handleChange}
                select
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3+</option>
              </FloatingInput>
            )}

            {form.childrenCount && parseInt(form.childrenCount) > 0 && (
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  name="childrenWithYou"
                  checked={form.childrenWithYou}
                  onChange={handleCheckbox}
                  className="text-red-600 focus:ring-red-500"
                />
                <label className="text-gray-700">Are children living with you?</label>
              </div>
            )}

            <FloatingInput
              label="Height (ft) *"
              name="height"
              value={form.height}
              onChange={handleChange}
              required
              error={validationErrors.height}
              list="heights"
              placeholder="Select or enter height"
            />
            <datalist id="heights">
              {Array.from({ length: 31 }, (_, i) => 4 + i * 0.1).map((h) => (
                <option key={h.toFixed(1)} value={h.toFixed(1)} />
              ))}
            </datalist>

            <FloatingInput
              label="Family Status *"
              name="familyStatus"
              value={form.familyStatus}
              onChange={handleChange}
              required
              select
              error={validationErrors.familyStatus}
            >
              <option value="Middle Class">Middle Class</option>
              <option value="Upper Middle Class">Upper Middle Class</option>
              <option value="Rich">Rich</option>
            </FloatingInput>

            <FloatingInput
              label="Family Type *"
              name="familyType"
              value={form.familyType}
              onChange={handleChange}
              required
              select
              error={validationErrors.familyType}
            >
              <option value="Joint">Joint Family</option>
              <option value="Nuclear">Nuclear Family</option>
            </FloatingInput>
          </div>
        )}

        {/* Step 5: Professional Details */}
        {step === 5 && (
          <div className="space-y-4">
            <FloatingInput
              label="Highest Education *"
              name="education"
              value={form.education}
              onChange={handleChange}
              required
              select
              error={validationErrors.education}
            >
              <option value="">-- Select Education --</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's Degree</option>
              <option value="Master's">Master's Degree</option>
              <option value="PhD">PhD</option>
            </FloatingInput>

            <FloatingInput
              label="Specialization"
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              placeholder="e.g., Computer Science, Business Administration"
            />

            <FloatingInput
              label="Employed In *"
              name="employedIn"
              value={form.employedIn}
              onChange={handleChange}
              required
              select
              error={validationErrors.employedIn}
            >
              <option value="">-- Select Employment --</option>
              <option value="Private">Private Sector</option>
              <option value="Government">Government Sector</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Business">Business</option>
              <option value="Not Employed">Not Employed</option>
            </FloatingInput>

            <FloatingInput
              label="Occupation"
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
              placeholder="e.g., Software Engineer, Doctor, Teacher"
            />

            <FloatingInput
              label="Annual Income (Rs) *"
              name="annualIncome"
              value={form.annualIncome}
              onChange={handleChange}
              required
              select
              error={validationErrors.annualIncome}
            >
              <option value="">-- Select Income --</option>
              <option value="0-2 L">0-2 Lakhs</option>
              <option value="2-5 L">2-5 Lakhs</option>
              <option value="5-10 L">5-10 Lakhs</option>
              <option value="10 L+">10 Lakhs+</option>
            </FloatingInput>

            {/* State Dropdown */}
            <FloatingInput
              label="State *"
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              select
              error={validationErrors.state}
            >
              <option value="">-- Select State / UT --</option>
              {indianStates.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </FloatingInput>

            {/* District Dropdown – Tamil Nadu only */}
            {form.state === "Tamil Nadu" && (
              <FloatingInput
                label="District *"
                name="district"
                value={form.district}
                onChange={handleChange}
                required
                select
                error={validationErrors.district}
              >
                <option value="">-- Select District --</option>
                {tamilNaduDistricts.map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </FloatingInput>
            )}

            {/* Free-text District for other states */}
            {form.state && form.state !== "Tamil Nadu" && (
              <FloatingInput
                label="District *"
                name="district"
                value={form.district}
                onChange={handleChange}
                required
                error={validationErrors.district}
                placeholder="Enter your district"
              />
            )}

            <FloatingInput
              label="Pincode"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="6-digit pincode"
              maxLength="6"
            />

            <FloatingInput
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Your country"
            />
          </div>
        )}

        {/* Step 6: About Yourself */}
        {step === 6 && (
          <div className="space-y-4">
            <FloatingInput
              label="About Yourself *"
              name="about"
              value={form.about}
              onChange={handleChange}
              required
              textarea
              error={validationErrors.about}
              placeholder="Tell us about yourself, your interests, family background, and what you're looking for in a partner (50-1000 characters)"
              rows="6"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photos / Resume (Optional)
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-red-500 transition-colors duration-200 bg-gray-50">
                <input
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-medium text-red-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, PDF up to 10MB
                </p>
              </div>

              {form.photos.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Uploaded files:</p>
                  <div className="flex flex-wrap gap-2">
                    {form.photos.map((file, idx) => (
                      <div key={idx} className="relative group">
                        {file.type.startsWith('image/') ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${idx + 1}`}
                            className="w-20 h-20 object-cover rounded border-2 border-gray-200 group-hover:border-red-500 transition-colors"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-100 border-2 border-gray-200 rounded flex items-center justify-center group-hover:border-red-500 transition-colors">
                            <span className="text-xs text-gray-600">PDF</span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <StepperController currentStep={step} totalSteps={steps.length} onNext={nextStep} onPrev={prevStep} onSubmit={handleSubmit} loading={loading} validationErrors={validationErrors} />

        {step===1 && onSwitch && (
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button type="button" onClick={onSwitch} className="text-red-600 hover:text-red-700 font-medium underline transition-colors">Sign In</button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

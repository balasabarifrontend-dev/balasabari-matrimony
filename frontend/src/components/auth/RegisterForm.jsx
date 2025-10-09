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

  // Enhanced initial state with better defaults
  const [form, setForm] = useState({
    // Step 1 – Register
    profileFor: "Myself",
    name: "",
    mobile: "",
    password: "",
    confirmPassword: "",

    // Step 2 – Basic Details
    gender: "Male",
    dob: "",
    age: "",
    partnerAgeMin: "25",
    partnerAgeMax: "35",
    email: "",

    // Step 3 – Religion
    religion: "Hindu",
    willingOtherCaste: false,
    caste: "OBC",
    subcaste: "Vanniyar",
    dosham: "No",

    // Step 4 – Personal
    maritalStatus: "Single",
    childrenCount: "0",
    childrenWithYou: false,
    height: "5.6",
    familyStatus: "Middle Class",
    familyType: "Joint",

    // Step 5 – Professional
    education: "Bachelor's",
    specialization: "",
    employedIn: "Private",
    occupation: "",
    annualIncome: "5-10 L",
    district: "",
    pincode: "",
    state: "",
    country: "India",

    // Step 6 – About Yourself
    about: "",
    photos: [],
  });

  // Enhanced validation with better error messages
  const validateStep = (step) => {
    const errors = {};

    switch (step) {
      case 1:
        if (!form.name?.trim()) {
          errors.name = "Full name is required";
        } else if (form.name.trim().length < 2) {
          errors.name = "Name must be at least 2 characters";
        }
        
        if (!form.mobile?.trim()) {
          errors.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(form.mobile.replace(/\D/g, ''))) {
          errors.mobile = "Please enter a valid 10-digit mobile number";
        }
        
        if (!form.password) {
          errors.password = "Password is required";
        } else if (form.password.length < 6) {
          errors.password = "Password must be at least 6 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
          errors.password = "Password should include uppercase, lowercase, and numbers";
        }
        
        if (!form.confirmPassword) {
          errors.confirmPassword = "Please confirm your password";
        } else if (form.password !== form.confirmPassword) {
          errors.confirmPassword = "Passwords do not match";
        }
        break;

      case 2:
        if (!form.gender) {
          errors.gender = "Please select your gender";
        }
        
        if (!form.dob) {
          errors.dob = "Date of birth is required";
        } else {
          const age = calculateAge(form.dob);
          if (age < 18) {
            errors.dob = "You must be at least 18 years old";
          } else if (age > 100) {
            errors.dob = "Please enter a valid date of birth";
          }
        }
        
        if (!form.email?.trim()) {
          errors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
          errors.email = "Please enter a valid email address";
        }
        
        if (form.partnerAgeMin && form.partnerAgeMax) {
          const min = parseInt(form.partnerAgeMin);
          const max = parseInt(form.partnerAgeMax);
          if (min >= max) {
            errors.partnerAgeMax = "Maximum age must be greater than minimum age";
          }
          if (min < 18) {
            errors.partnerAgeMin = "Minimum age must be at least 18";
          }
          if (max > 100) {
            errors.partnerAgeMax = "Please enter a reasonable maximum age";
          }
        }
        break;

      case 3:
        if (!form.religion) errors.religion = "Please select your religion";
        if (!form.caste) errors.caste = "Please select your caste";
        if (!form.subcaste) errors.subcaste = "Please select your subcaste";
        break;

      case 4:
        if (!form.maritalStatus) errors.maritalStatus = "Please select marital status";
        if (!form.height) errors.height = "Please enter your height";
        if (!form.familyStatus) errors.familyStatus = "Please select family status";
        if (!form.familyType) errors.familyType = "Please select family type";
        break;

      case 5:
        if (!form.education) errors.education = "Please select education level";
        if (!form.employedIn) errors.employedIn = "Please select employment status";
        if (!form.annualIncome) errors.annualIncome = "Please select income range";
        if (!form.district?.trim()) errors.district = "Please enter your district";
        if (!form.state?.trim()) errors.state = "Please enter your state";
        break;

      case 6:
        if (!form.about?.trim()) {
          errors.about = "Please tell us about yourself";
        } else if (form.about.trim().length < 50) {
          errors.about = "Please write at least 50 characters about yourself";
        } else if (form.about.trim().length > 1000) {
          errors.about = "About yourself should not exceed 1000 characters";
        }
        break;

      default:
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatMobileNumber = (value) => {
    const numbers = value.replace(/\D/g, '').slice(0, 10);
    return numbers;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    let processedValue = value;
    
    // Special handling for mobile number
    if (name === 'mobile') {
      processedValue = formatMobileNumber(value);
    }
    
    setForm(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Auto-calculate age when DOB changes
    if (name === 'dob' && value) {
      const age = calculateAge(value);
      setForm(prev => ({
        ...prev,
        age: age.toString()
      }));
    }

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear general error when user interacts with form
    if (error) {
      setError("");
    }
  };

  const handleCheckbox = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.checked
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setError(""); // Clear any previous errors

    const validFiles = files.filter(file => {
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) {
          setError(`File ${file.name} is too large. Maximum size is 5MB.`);
          return false;
        }
        return true;
      } else if (file.type === 'application/pdf') {
        if (file.size > 10 * 1024 * 1024) {
          setError(`File ${file.name} is too large. Maximum size is 10MB.`);
          return false;
        }
        return true;
      } else {
        setError(`File ${file.name} is not supported. Please upload images or PDF files.`);
        return false;
      }
    });

    if (validFiles.length > 0) {
      setForm(prev => ({
        ...prev,
        photos: [...prev.photos, ...validFiles]
      }));
    }
  };

  const removePhoto = (index) => {
    setForm(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const steps = [
    "Register",
    "Basic Details",
    "Religion Details",
    "Personal Details",
    "Professional Details",
    "About Yourself",
  ];

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


  const nextStep = () => {
    console.log('🔍 Next button clicked - Step:', step);
    console.log('🔍 Validation errors:', validationErrors);
    
    if (validateStep(step)) {
      console.log('✅ Step validation passed');
      setStep((s) => s + 1);
      setError("");
    } else {
      console.log('❌ Step validation failed');
      const errorFields = Object.keys(validationErrors).join(', ');
      setError(`Please fix the following: ${errorFields}`);
    }
  };

  const prevStep = () => {
    setStep((s) => s - 1);
    setError("");
    setValidationErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🚀 Starting registration process...');
    
    // Validate all steps before submission
    for (let i = 1; i <= steps.length; i++) {
      if (!validateStep(i)) {
        console.log(`❌ Validation failed at step ${i}`);
        setStep(i);
        setError("Please fix all validation errors before submitting.");
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      // Step 1: Register User
      const userRegistrationData = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        mobile: form.mobile.replace(/\D/g, ''),
        password: form.password,
        profileFor: form.profileFor,
        gender: form.gender,
        dateOfBirth: form.dob
      };

      console.log('🔄 Step 1: Registering user...', userRegistrationData);
      const userResult = await authService.register(userRegistrationData);
      console.log('✅ User registration successful:', userResult);

      // Store token immediately after registration
      if (userResult.token) {
        authService.setSession(userResult.token, userResult.user);
      }

      // Step 2: Create Profile
      const profileData = {
        fullName: form.name.trim(),
        gender: form.gender,
        age: parseInt(form.age) || calculateAge(form.dob),
        location: `${form.district || ''}, ${form.state || ''}, ${form.country || ''}`.trim(),
        religion: form.religion,
        caste: form.caste,
        dateOfBirth: form.dob,
        partnerAgeMin: form.partnerAgeMin ? parseInt(form.partnerAgeMin) : null,
        partnerAgeMax: form.partnerAgeMax ? parseInt(form.partnerAgeMax) : null,
        subcaste: form.subcaste,
        dosham: form.dosham,
        willingOtherCaste: form.willingOtherCaste,
        maritalStatus: form.maritalStatus,
        childrenCount: form.childrenCount ? parseInt(form.childrenCount) : 0,
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
        about: form.about.trim(),
        email: form.email.trim().toLowerCase(),
        mobile: form.mobile.replace(/\D/g, '')
      };

      console.log('🔄 Step 2: Creating profile...', profileData);
      const profileResult = await authService.createProfile(profileData);
      console.log('✅ Profile creation successful:', profileResult);
      
      // Step 3: Upload photos if any
      if (form.photos.length > 0) {
        console.log('🔄 Step 3: Uploading photos...');
        try {
          for (const photo of form.photos) {
            await authService.uploadPhoto(profileResult.id || profileResult.profileId, photo);
          }
          console.log('✅ Photos uploaded successfully');
        } catch (uploadError) {
          console.warn('⚠️ Photo upload failed, but registration completed:', uploadError);
          // Don't fail the entire registration if photo upload fails
        }
      }
      
      // Success handling
      console.log('🎉 Registration completed successfully!');
      
      if (onRegisterSuccess) {
        onRegisterSuccess({ 
          user: userResult.user, 
          profile: profileResult,
          token: userResult.token 
        });
      }
      
      if (onClose) {
        onClose();
      }

      // Show success message
      const successMessage = "Registration completed successfully! You can now explore matches.";
      console.log('✅', successMessage);
      
      if (!inModal) {
        // Redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        alert(successMessage);
        if (onSwitch) {
          onSwitch(); // Switch to login form
        }
      }

    } catch (err) {
      console.error('❌ Registration error:', err);
      
      let errorMessage = "Registration failed. Please try again.";
      
      if (err.error === 'VALIDATION_ERROR') {
        errorMessage = err.message;
      } else if (err.error === 'NETWORK_ERROR') {
        errorMessage = "Unable to connect to server. Please check your internet connection.";
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getStepHeading = () => {
    const headings = {
      1: "Create Your Account",
      2: "Personal Details", 
      3: "Religion & Community",
      4: "Family & Background",
      5: "Education & Career",
      6: "About Yourself"
    };
    return headings[step] || "Registration";
  };

  // Quick test function for development
  const fillTestData = () => {
    setForm({
      ...form,
      name: "Test User",
      mobile: "9876543210",
      password: "Test@123",
      confirmPassword: "Test@123",
      email: "test@example.com",
      dob: "1990-01-01",
      age: "34"
    });
    setError("");
    setValidationErrors({});
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          {getStepHeading()}
        </h2>
        <p className="text-gray-600 text-sm">
          Step {step} of {steps.length}
        </p>
        
        {/* Development helper - remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <button
            type="button"
            onClick={fillTestData}
            className="mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
          >
            Fill Test Data
          </button>
        )}
      </div>

      {step > 1 && (
        <div className="mb-6">
          <Stepper 
            steps={steps.slice(1)} 
            currentStep={step - 1}
          />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4 animate-pulse">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <strong>Please check the following:</strong>
          </div>
          <p className="mt-1">{error}</p>
        </div>
      )}

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

        <StepperController
          currentStep={step}
          totalSteps={steps.length}
          onNext={nextStep}
          onPrev={prevStep}
          onSubmit={handleSubmit}
          loading={loading}
          validationErrors={validationErrors}
        />

        {step === 1 && onSwitch && (
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitch}
                className="text-red-600 hover:text-red-700 font-medium underline transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
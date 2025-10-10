import api from "../api/axios";

export const authService = {
  login: async ({ email, password }) => {
    const res = await api.post("/auth/login", { email, password });
    // ✅ Make sure to set the token in localStorage
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    return res.data; // { token, user }
  },

  // register: async (userData) => {
  //   const res = await api.post("/auth/register", userData);
  //   // ✅ Make sure to set the token in localStorage
  //   if (res.data.token) {
  //     localStorage.setItem("token", res.data.token);
  //   }
  //   return res.data; // { token, user }
  // },
  // AuthService.js
// In AuthService.js - temporary debug version
register: async (userData) => {
  try {
    console.log("🔄 Sending registration data:", userData);
    
    // First test with debug endpoint
    console.log("🧪 Testing with debug endpoint...");
    try {
      const debugResponse = await api.post("/auth/register-debug", userData);
      console.log("✅ Debug endpoint response:", debugResponse.data);
    } catch (debugError) {
      console.error("❌ Debug endpoint error:", debugError);
    }
    
    // Then proceed with actual registration
    console.log("🚀 Proceeding with actual registration...");
    const res = await api.post("/auth/register", userData);
    console.log("✅ Registration successful:", res.data);
    
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }
    return res.data;
  } catch (error) {
    console.error("❌ AuthService registration error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    let errorMessage = "Registration failed";
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    } else if (error.message?.includes('dob')) {
      errorMessage = "Date of birth format is invalid. Please use YYYY-MM-DD format.";
    } else if (error.response?.status === 500) {
      errorMessage = "Server error. Please try again later.";
    } else if (error.response?.status === 409) {
      errorMessage = "Email or mobile number already registered.";
    }
    
    throw new Error(errorMessage);
  }
},

  createProfile: async (profileData) => {
    const res = await api.post("/profiles", profileData);
    return res.data; // { profileId, ... }
  },

  uploadPhoto: async (profileId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post(`/profiles/${profileId}/photos`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  setSession: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },

  getToken: () => localStorage.getItem("token"),

  getUser: () => JSON.parse(localStorage.getItem("user")),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
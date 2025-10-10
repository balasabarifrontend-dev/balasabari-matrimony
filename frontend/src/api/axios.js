// api/axios.js
import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically - FIXED VERSION
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("🔧 Axios Interceptor - Token:", token); // Debug log
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("🔧 Axios Interceptor - Headers:", config.headers); // Debug log
    }
    return config;
  },
  (error) => {
    console.error("🔧 Axios Interceptor - Request Error:", error);
    return Promise.reject(error);
  }
);

// Global error handler
api.interceptors.response.use(
  (response) => {
    console.log("🔧 Axios Interceptor - Response Success:", response.status);
    return response;
  },
  (error) => {
    console.error("🔧 Axios Interceptor - Response Error:", error.response?.status, error.response?.data);
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log("🛑 Authentication error - clearing tokens");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optional: redirect to login
      window.location.href = '/';
    }
    
    if (!error.response) {
      return Promise.reject({ error: "NETWORK_ERROR", message: "Cannot connect to server" });
    }
    return Promise.reject(error.response.data || error);
  }
);

export default api;
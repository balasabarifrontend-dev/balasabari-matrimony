// src/api/axios.js
import axios from "axios";

// Create a single Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api", // your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if you use cookies
});

// Optional: Add a request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get JWT token from localStorage
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add a response interceptor to handle errors globally

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      console.log("Unauthorized! Redirecting to login...");
      localStorage.removeItem("token");
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

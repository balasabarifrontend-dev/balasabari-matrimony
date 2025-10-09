// src/services/authService.js
import api from '../api/axios';

export const authService = {
  // Register user
  register: async (userData) => {
    try {
      const registerData = {
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
        password: userData.password,
        profileFor: userData.profileFor || 'Myself',
        gender: userData.gender,
        dateOfBirth: userData.dateOfBirth
      };

      console.log('🔄 Registering user:', { ...registerData, password: '***' });
      
      const response = await api.post('/auth/register', registerData);
      console.log('✅ Registration successful');
      return response.data;
    } catch (error) {
      console.error('❌ Registration error:', error);
      throw error.response?.data || { 
        error: 'REGISTRATION_FAILED', 
        message: 'Registration failed. Please try again.' 
      };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      console.log('🔄 Attempting login for:', credentials.email);
      
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      });
      
      console.log('✅ Login successful');
      return response.data;
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error.response?.data || { 
        error: 'LOGIN_FAILED', 
        message: 'Login failed. Please try again.' 
      };
    }
  },

  // Validate token
  validateToken: async () => {
    try {
      const response = await api.get('/auth/validate');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Token validation failed' };
    }
  },

  // Create profile
  createProfile: async (profileData) => {
    try {
      const response = await api.post('/profiles', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Profile creation failed' };
    }
  },

  // Upload photo
  uploadPhoto: async (profileId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post(`/profiles/${profileId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Photo upload failed' };
    }
  },

  // Session management
  setSession: (token, user) => {
    if (token) {
      localStorage.setItem('token', token);
      // Set default axios header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  clearSession: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
  },

  getStoredUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  }
};

export default authService;
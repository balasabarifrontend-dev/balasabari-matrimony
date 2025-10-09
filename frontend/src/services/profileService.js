// src/services/profileService.js
import api from '../api/axios';

export const profileService = {
  getAllProfiles: async (page = 0, size = 12, sortBy = 'createdAt', sortDirection = 'desc') => {
    try {
      const token = localStorage.getItem('token');
      
      console.log('🔐 Making request with token:', token ? 'Present' : 'Missing');
      
      if (!token) {
        throw { 
          error: 'NO_TOKEN', 
          message: 'Authentication required. Please login.',
          status: 401 
        };
      }

      const response = await api.get('/profiles', {
        params: { page, size, sortBy, sortDirection },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('✅ Profiles fetched successfully');
      return response.data;
      
    } catch (error) {
      console.error('❌ Profile fetch error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      // Handle specific error cases
      if (error.response?.status === 403) {
        throw { 
          error: 'FORBIDDEN', 
          message: 'Access denied. You do not have permission to view profiles.',
          status: 403,
          details: error.response?.data
        };
      } else if (error.response?.status === 401) {
        // Clear invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw { 
          error: 'UNAUTHORIZED', 
          message: 'Session expired. Please login again.',
          status: 401 
        };
      } else if (error.response?.status === 404) {
        throw { 
          error: 'NOT_FOUND', 
          message: 'Profiles endpoint not found.',
          status: 404 
        };
      }
      
      throw error.response?.data || { 
        error: 'NETWORK_ERROR', 
        message: 'Failed to fetch profiles. Please check your connection.' 
      };
    }
  },

  // Test endpoint accessibility
  testAccess: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/auth/validate', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || error.message 
      };
    }
  }
};
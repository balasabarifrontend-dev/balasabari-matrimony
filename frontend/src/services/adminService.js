// src/services/adminService.js
import api from '../api/axios';

export const adminService = {
  // Get all users with pagination
  getUsers: async (page = 0, size = 10, sortBy = 'id', sortDirection = 'asc') => {
    try {
      const response = await api.get('/admin/users', {
        params: { page, size, sortBy, sortDirection }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch users' };
    }
  },

  // Update user status
  updateUserStatus: async (userId, status) => {
    try {
      const response = await api.patch(`/admin/users/${userId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to update user status' };
    }
  },

  // Get statistics
  getStats: async () => {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch statistics' };
    }
  }
};
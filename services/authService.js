import apiService from './apiService';
import { API_ENDPOINTS } from '../config/api';

class AuthService {
  // User registration
  register = async (userData) => {
    try {
      console.log('🚀 Registering user:', userData);
      
      const response = await apiService.post(API_ENDPOINTS.AUTH.REGISTER, userData, {
        includeAuth: false // No auth token needed for registration
      });

      if (response.success) {
        // Save the token if registration includes auto-login
        if (response.data.token) {
          await apiService.setAuthToken(response.data.token);
        }
        
        console.log('✅ User registered successfully');
        return {
          success: true,
          data: response.data,
          message: 'Registration successful'
        };
      } else {
        console.error('❌ Registration failed:', response.error);
        return {
          success: false,
          error: response.error,
          message: response.error
        };
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Registration failed. Please try again.'
      };
    }
  };

  // User login
  login = async (credentials) => {
    try {
      console.log('🔐 Logging in user:', credentials.email);
      
      const response = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, credentials, {
        includeAuth: false // No auth token needed for login
      });

      if (response.success && response.data.token) {
        // Save the authentication token
        await apiService.setAuthToken(response.data.token);
        
        console.log('✅ User logged in successfully');
        return {
          success: true,
          data: response.data,
          message: 'Login successful'
        };
      } else {
        console.error('❌ Login failed:', response.error);
        return {
          success: false,
          error: response.error,
          message: response.error || 'Invalid credentials'
        };
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Login failed. Please try again.'
      };
    }
  };

  // Get current user info
  getCurrentUser = async () => {
    try {
      console.log('👤 Getting current user info');
      
      const response = await apiService.get(API_ENDPOINTS.AUTH.ME);

      if (response.success) {
        console.log('✅ Current user info retrieved');
        return {
          success: true,
          data: response.data,
          message: 'User info retrieved'
        };
      } else {
        console.error('❌ Failed to get user info:', response.error);
        return {
          success: false,
          error: response.error,
          message: response.error
        };
      }
    } catch (error) {
      console.error('❌ Get user info error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to get user info'
      };
    }
  };

  // Logout user
  logout = async () => {
    try {
      console.log('🚪 Logging out user');
      
      // Call logout endpoint if your backend has one
      const response = await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
      
      // Remove token regardless of backend response
      await apiService.removeAuthToken();
      
      console.log('✅ User logged out successfully');
      return {
        success: true,
        message: 'Logout successful'
      };
    } catch (error) {
      console.error('❌ Logout error:', error);
      
      // Still remove token even if backend call fails
      await apiService.removeAuthToken();
      
      return {
        success: true,
        message: 'Logout successful'
      };
    }
  };

  // Check if user is authenticated
  isAuthenticated = async () => {
    try {
      const token = await apiService.getAuthToken();
      return !!token;
    } catch (error) {
      console.error('❌ Auth check error:', error);
      return false;
    }
  };

  // Refresh authentication token
  refreshToken = async () => {
    try {
      console.log('🔄 Refreshing authentication token');
      
      const response = await apiService.post(API_ENDPOINTS.AUTH.REFRESH);

      if (response.success && response.data.token) {
        await apiService.setAuthToken(response.data.token);
        console.log('✅ Token refreshed successfully');
        return {
          success: true,
          data: response.data
        };
      } else {
        console.error('❌ Token refresh failed:', response.error);
        return {
          success: false,
          error: response.error
        };
      }
    } catch (error) {
      console.error('❌ Token refresh error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  };

  // Validate token
  validateToken = async () => {
    try {
      const response = await this.getCurrentUser();
      return response.success;
    } catch (error) {
      console.error('❌ Token validation error:', error);
      return false;
    }
  };
}

// Create and export a single instance
const authService = new AuthService();
export default authService; 
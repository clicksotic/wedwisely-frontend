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
        // Save the token if registration includes auto-login (handles data nesting)
        const tokens = response.data?.data?.tokens || response.data?.tokens;
        if (tokens?.accessToken) {
          await apiService.setAuthToken(tokens.accessToken);
        }
        
        console.log('✅ User registered successfully');
        return {
          success: true,
          data: response.data,
          status: response.status,
          message: 'Registration successful'
        };
      } else {
        console.error('❌ Registration failed:', response.error, response.data);
        return {
          success: false,
          error: response.error,
          data: response.data,
          status: response.status,
          message: response.error || 'Registration failed'
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
      console.log('�� Logging in user:', credentials.email);
      console.log('🔐 Password length:', credentials.password.length);
      console.log('🔐 Password chars:', credentials.password.split('').map(c => c.charCodeAt(0)));
      
      const response = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, credentials, {
        includeAuth: false // No auth token needed for login
      });

      console.log('🔐 Full response:', JSON.stringify(response, null, 2));

      // Check for nested data structure: response.data.data.tokens.accessToken
      const tokens = response.data?.data?.tokens || response.data?.tokens;
      const accessToken = tokens?.accessToken;

      if (response.success && accessToken) {
        // Save the authentication token
        await apiService.setAuthToken(accessToken);
        
        console.log('✅ User logged in successfully');
        return {
          success: true,
          data: response.data.data || response.data,
          message: 'Login successful'
        };
      } else {
        console.error('❌ Login failed:', response.error);
        console.error('❌ Response data:', response.data);
        console.error('❌ Tokens found:', !!tokens);
        console.error('❌ Access token found:', !!accessToken);
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
      
      const response = await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);

      // Clear the token regardless of response
      await apiService.clearAuthToken();
      
      if (response.success) {
        console.log('✅ User logged out successfully');
        return {
          success: true,
          message: 'Logout successful'
        };
      } else {
        console.log('⚠ Logout request failed, but token cleared locally');
        return {
          success: true,
          message: 'Logged out locally'
        };
      }
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Still clear the token even if request fails
      await apiService.clearAuthToken();
      return {
        success: true,
        message: 'Logged out locally'
      };
    }
  };

  // Refresh authentication token
  refreshToken = async () => {
    try {
      console.log('🔄 Refreshing authentication token');
      
      const response = await apiService.post(API_ENDPOINTS.AUTH.REFRESH);

      const tokens = response.data?.data?.tokens || response.data?.tokens;
      const accessToken = tokens?.accessToken;

      if (response.success && accessToken) {
        // Save the new token
        await apiService.setAuthToken(accessToken);
        
        console.log('✅ Token refreshed successfully');
        return {
          success: true,
          data: response.data.data || response.data,
          message: 'Token refreshed'
        };
      } else {
        console.error('❌ Token refresh failed:', response.error);
        return {
          success: false,
          error: response.error,
          message: response.error || 'Token refresh failed'
        };
      }
    } catch (error) {
      console.error('❌ Token refresh error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Token refresh failed'
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
}

// Create and export a single instance
const authService = new AuthService();
export default authService;
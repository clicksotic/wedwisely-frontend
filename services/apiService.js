import { getBaseURL, timeout } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'wedwisely_auth_token';

class ApiService {
  constructor() {
    this.baseURL = null; // Will be set dynamically
    this.timeout = timeout;
  }

  // Initialize the service with the best available baseURL
  initialize = async () => {
    if (!this.baseURL) {
      this.baseURL = await getBaseURL();
      console.log(`🚀 ApiService initialized with: ${this.baseURL}`);
    }
    return this.baseURL;
  };

  // Get auth token from storage
  getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  };

  // Set auth token in storage
  setAuthToken = async (token) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
      console.log('✅ Token saved to AsyncStorage');
    } catch (error) {
      console.error('Error saving auth token:', error);
    }
  };

  // Remove auth token from storage
  removeAuthToken = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      console.log('✅ Token removed from AsyncStorage');
    } catch (error) {
      console.error('Error removing auth token:', error);
    }
  };

  // Create headers for requests
  createHeaders = async (includeAuth = true) => {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (includeAuth) {
      const token = await this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  };

  // Make HTTP request
  async request(endpoint, options = {}) {
    // Ensure service is initialized
    await this.initialize();
    
    const url = `${this.baseURL}${endpoint}`;
    const headers = await this.createHeaders(options.includeAuth !== false);
    
    const config = {
      method: options.method || 'GET',
      headers,
      ...options,
    };

    // Add body for POST/PUT/PATCH requests
    if (options.body && ['POST', 'PUT', 'PATCH'].includes(config.method)) {
      config.body = JSON.stringify(options.body);
    }

    try {
      console.log(`🌐 API Request: ${config.method} ${url}`);
      
      const response = await fetch(url, config);
      const responseData = await response.json();

      console.log(`✅ API Response: ${response.status} ${url}`);

      // Handle successful responses
      if (response.ok) {
        return {
          success: true,
          data: responseData,
          status: response.status,
        };
      }

      // Handle error responses
      return {
        success: false,
        error: responseData.message || 'Request failed',
        status: response.status,
        data: responseData,
      };

    } catch (error) {
      console.error(`❌ API Error: ${url}`, error);
      
      return {
        success: false,
        error: error.message || 'Network error',
        status: 0,
        data: null,
      };
    }
  }

  // GET request
  get = (endpoint, options = {}) => {
    return this.request(endpoint, { ...options, method: 'GET' });
  };

  // POST request
  post = (endpoint, body, options = {}) => {
    return this.request(endpoint, { ...options, method: 'POST', body });
  };

  // PUT request
  put = (endpoint, body, options = {}) => {
    return this.request(endpoint, { ...options, method: 'PUT', body });
  };

  // PATCH request
  patch = (endpoint, body, options = {}) => {
    return this.request(endpoint, { ...options, method: 'PATCH', body });
  };

  // DELETE request
  delete = (endpoint, options = {}) => {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  };

  // Health check
  healthCheck = () => {
    return this.get('/health');
  };

  // Get environment info
  getEnvironment = () => {
    return this.get('/api/environment');
  };

  // Get database status
  getDatabaseStatus = () => {
    return this.get('/api/db/status');
  };

  // Test all available URLs to find the best one
  testAllURLs = async () => {
    const { getBaseURL } = await import('../config/api');
    const bestURL = await getBaseURL();
    console.log(`🏆 Best backend URL found: ${bestURL}`);
    return bestURL;
  };
}

// Create and export a single instance
const apiService = new ApiService();
export default apiService; 
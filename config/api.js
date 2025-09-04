// API Configuration for WedWisely Backend
const API_CONFIG = {
  // Development - manually set your IP here
  development: {
    baseURL: 'http://192.168.18.224:3000', // Change this to your system IP
    timeout: 10000,
  },
  
  // Production (update this with your actual production URL)
  production: {
    baseURL: 'https://your-production-backend.com',
    timeout: 15000,
  },
  
  // Staging (if you have one)
  staging: {
    baseURL: 'https://your-staging-backend.com',
    timeout: 12000,
  }
};

// Get current environment
const getCurrentConfig = () => {
  // You can change this to 'production' or 'staging' when deploying
  //const environment = _DEV_ ? 'development' : 'production';
  return API_CONFIG['development'];
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
    REFRESH: '/api/auth/refresh',
  },
  
  // User endpoints
  USERS: {
    ALL: '/api/users/all',
    PROFILE: '/api/users/profile',
    UPDATE: '/api/users/update',
    DELETE: '/api/users/delete',
  },
  
  // Profile endpoints
  PROFILES: {
    CREATE: '/api/profiles/create',
    UPDATE: '/api/profiles/update',
    DELETE: '/api/profiles/delete',
    ME: '/api/profiles/me',
  },
  
  // Health check
  HEALTH: '/health',
  ENVIRONMENT: '/api/environment',
  DB_STATUS: '/api/db/status',
};

// Export configuration
export const apiConfig = getCurrentConfig();
export const baseURL = apiConfig.baseURL;
export const timeout = apiConfig.timeout;

// Export getBaseURL function for backward compatibility
export const getBaseURL = () => {
  return getCurrentConfig().baseURL;
};

export default apiConfig;
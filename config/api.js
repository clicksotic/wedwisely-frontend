

const ENV_BASE_URL_DEV = process.env.DEVELOPMENT;
const ENV_BASE_URL_STAGING = process.env.STAGING;
const ENV_BASE_URL_PROD = process.env.PRODUCTION;
const ENV_TIMEOUT = process.env.TIMEOUT_MS ? parseInt(process.env.TIMEOUT_MS) : undefined;

const API_CONFIG = {
  // Each env reads only from env vars (no hardcoded fallbacks)
  development: {
    baseURL: ENV_BASE_URL_DEV,
    timeout: ENV_TIMEOUT || 10000,
  },
  production: {
    baseURL: ENV_BASE_URL_PROD,
    timeout: ENV_TIMEOUT || 15000,
  },
  staging: {
    baseURL: ENV_BASE_URL_STAGING,
    timeout: ENV_TIMEOUT || 12000,
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
  const url = getCurrentConfig().baseURL;
  return url;
};

export default apiConfig;
 
// Brand theme (colors)
export const THEME = {
  backgroundMuted: '#E8E2DB', // soft beige
  brandGold: '#D4AF37',       // primary gold
  backgroundLight: '#FAFAF7', // light panel
};
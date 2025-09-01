// Function to get local IP addresses (similar to backend approach)
const getLocalIPAddresses = () => {
  // Common local IP patterns for different networks
  const commonIPs = [
    // Your current network (Android hotspot)
    '192.168.43.178',
    '192.168.43.1',
    '192.168.43.2',
    // Home networks
    '192.168.1.100',
    '192.168.1.101', 
    '192.168.1.102',
    '192.168.0.100',
    '192.168.0.101',
    '192.168.0.102',
    // Office networks
    '10.0.0.100',
    '10.0.0.101',
    '10.0.0.102',
    // iPhone hotspot
    '172.20.10.1',
    '172.20.10.2',
    // Localhost fallback
    '127.0.0.1',
    'localhost'
  ];
  
  return commonIPs;
};

// Function to test which IP is reachable
const testIPReachability = async (ip, port = 3000) => {
  try {
    const url = `http://${ip}:${port}/health`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500); // 1.5 second timeout
    
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Function to test multiple IPs in parallel (FASTER!)
const testIPsInParallel = async (ips) => {
  console.log('🚀 Testing IPs in parallel for faster detection...');
  
  const testPromises = ips.map(async (ip) => {
    const isReachable = await testIPReachability(ip);
    return { ip, isReachable };
  });
  
  const results = await Promise.all(testPromises);
  const workingIP = results.find(result => result.isReachable);
  
  return workingIP ? workingIP.ip : null;
};

// Function to find the best available IP
const findBestIP = async () => {
  const ips = getLocalIPAddresses();
  
  console.log('🔍 Testing IP addresses for backend connection...');
  
  // Test IPs in parallel for faster detection
  const workingIP = await testIPsInParallel(ips);
  
  if (workingIP) {
    console.log(`✅ Found working IP: ${workingIP}`);
    return workingIP;
  }
  
  console.log('❌ No IP addresses found, using localhost');
  return '127.0.0.1';
};

// API Configuration for WedWisely Backend
const API_CONFIG = {
  // Development - will be dynamically set
  development: {
    baseURL: null, // Will be set dynamically
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
const getCurrentConfig = async () => {
  // You can change this to 'production' or 'staging' when deploying
  const environment = __DEV__ ? 'development' : 'production';
  const config = { ...API_CONFIG[environment] };
  
  // For development, dynamically set the baseURL with local IP
  if (environment === 'development' && !config.baseURL) {
    const bestIP = await findBestIP();
    config.baseURL = `http://${bestIP}:3000`;
    console.log('🌐 Using dynamic IP for development:', config.baseURL);
  }
  
  return config;
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
let apiConfig = null;
let baseURL = null;
let timeout = null;

// Initialize configuration
const initializeConfig = async () => {
  if (!apiConfig) {
    apiConfig = await getCurrentConfig();
    baseURL = apiConfig.baseURL;
    timeout = apiConfig.timeout;
  }
  return apiConfig;
};

// Export async function to get config
export const getApiConfig = initializeConfig;

// Export getBaseURL function for backward compatibility
export const getBaseURL = async () => {
  const config = await initializeConfig();
  return config.baseURL;
};

// Export current values (will be null until initialized)
export { apiConfig, baseURL, timeout };

export default initializeConfig;

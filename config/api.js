// Function to get local IP addresses (similar to backend approach)
const getLocalIPAddresses = () => {
  // For React Native/Expo, we'll use a different approach
  // Since we can't access Node.js os module directly
  
  // Common local IP patterns for different networks
  const commonIPs = [
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
    // Android hotspot
    '192.168.43.1',
    '192.168.43.2',
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
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout
    
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

import IPCache from './ipCache';

// Function to find the best available IP
const findBestIP = async () => {
  // First, try to use cached IP
  const cachedIP = await IPCache.getCachedIP();
  if (cachedIP) {
    const isReachable = await testIPReachability(cachedIP);
    if (isReachable) {
      console.log(`✅ Using cached IP: ${cachedIP}`);
      return cachedIP;
    } else {
      console.log('❌ Cached IP not reachable, testing others...');
      await IPCache.clearCache();
    }
  }

  const ips = getLocalIPAddresses();
  
  console.log('🔍 Testing IP addresses for backend connection...');
  
  for (const ip of ips) {
    console.log(`Testing ${ip}:3000...`);
    const isReachable = await testIPReachability(ip);
    
    if (isReachable) {
      console.log(`✅ Found working IP: ${ip}`);
      // Cache the successful IP
      await IPCache.cacheIP(ip);
      return ip;
    }
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

// Function to refresh IP cache and test all IPs
export const refreshIPCache = async () => {
  console.log('🔄 Refreshing IP cache...');
  await IPCache.clearCache();
  const newIP = await findBestIP();
  console.log('🔄 IP cache refreshed, new IP:', newIP);
  return newIP;
};

// Function to get cache info
export const getIPCacheInfo = async () => {
  return await IPCache.getCacheInfo();
};

// Export current values (will be null until initialized)
export { apiConfig, baseURL, timeout };

export default initializeConfig; 
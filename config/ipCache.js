import AsyncStorage from '@react-native-async-storage/async-storage';

const IP_CACHE_KEY = 'wedwisely_ip_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

class IPCache {
  // Get cached IP
  static async getCachedIP() {
    try {
      const cached = await AsyncStorage.getItem(IP_CACHE_KEY);
      if (cached) {
        const { ip, timestamp } = JSON.parse(cached);
        const now = Date.now();
        
        // Check if cache is still valid
        if (now - timestamp < CACHE_EXPIRY) {
          console.log('📦 Using cached IP:', ip);
          return ip;
        } else {
          console.log('⏰ IP cache expired, will test again');
          await this.clearCache();
        }
      }
    } catch (error) {
      console.warn('Failed to get cached IP:', error);
    }
    return null;
  }

  // Cache successful IP
  static async cacheIP(ip) {
    try {
      const cacheData = {
        ip,
        timestamp: Date.now()
      };
      await AsyncStorage.setItem(IP_CACHE_KEY, JSON.stringify(cacheData));
      console.log('💾 Cached successful IP:', ip);
    } catch (error) {
      console.warn('Failed to cache IP:', error);
    }
  }

  // Clear cache
  static async clearCache() {
    try {
      await AsyncStorage.removeItem(IP_CACHE_KEY);
      console.log('🗑️ Cleared IP cache');
    } catch (error) {
      console.warn('Failed to clear IP cache:', error);
    }
  }

  // Get cache info
  static async getCacheInfo() {
    try {
      const cached = await AsyncStorage.getItem(IP_CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (error) {
      console.warn('Failed to get cache info:', error);
    }
    return null;
  }
}

export default IPCache; 
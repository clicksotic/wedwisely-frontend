# API Configuration Setup

This directory contains the API configuration for the WedWisely app.

## 🚀 Dynamic IP Detection (Similar to Backend)

The app now automatically detects and tests multiple IP addresses to find the best backend connection, just like the backend's `local.js` approach.

### ✨ How It Works

1. **Smart IP Testing:** Tests common local IP patterns automatically
2. **Caching:** Remembers successful IPs for faster future connections
3. **Fallback:** Uses localhost if no other IPs work
4. **Auto-refresh:** Cache expires after 24 hours

### 🔧 Supported IP Patterns

The system automatically tests these common local IP patterns:

- **Home Networks:** `192.168.1.100-102`, `192.168.0.100-102`
- **Office Networks:** `10.0.0.100-102`
- **iPhone Hotspot:** `172.20.10.1-2`
- **Android Hotspot:** `192.168.43.1-2`
- **Fallback:** `127.0.0.1`, `localhost`

### 🎯 Usage

The system works automatically! No manual configuration needed.

**Manual Controls:**
```javascript
import { refreshIPCache, getIPCacheInfo } from '../config/api';

// Force refresh IP cache
await refreshIPCache();

// Get cache info
const cacheInfo = await getIPCacheInfo();
```

### 🔍 How It Works

1. **First Launch:** Tests all IP patterns to find working backend
2. **Cached:** Remembers successful IP for 24 hours
3. **Auto-refresh:** Tests again if cache expires or connection fails
4. **Fallback:** Uses localhost if no other IPs work

### 📁 Files

- `api.js` - Main API configuration with dynamic IP detection
- `ipCache.js` - IP caching system for performance
- `localConfig.js` - Legacy config (no longer needed)

### 🛠️ Troubleshooting

- **Backend not found:** Make sure your backend server is running on port 3000
- **Slow connection:** The first connection tests multiple IPs (cached after)
- **Cache issues:** Use `refreshIPCache()` to force retest all IPs

### 🎉 Benefits

✅ **Works on any WiFi network** - No manual IP configuration  
✅ **Fast connections** - Caches successful IPs  
✅ **Automatic fallback** - Always finds a working connection  
✅ **Similar to backend** - Uses same approach as backend's `local.js`  
✅ **Production ready** - Automatically switches to production URLs 
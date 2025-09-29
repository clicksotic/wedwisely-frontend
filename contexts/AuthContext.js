import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import apiService from '../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  console.log('🔧 AuthProvider initializing...');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token and fetch user data on app startup
  useEffect(() => {
    checkAuthStatus();
    
    // Fallback timeout in case checkAuthStatus never completes
    const fallbackTimeout = setTimeout(() => {
      console.log('🚨 Fallback timeout - forcing loading to false');
      setIsLoading(false);
    }, 5000);
    
    return () => clearTimeout(fallbackTimeout);
  }, []);

  const checkAuthStatus = async () => {
    console.log('🔍 Starting auth check...');
    
    // Immediate timeout for testing
    setTimeout(() => {
      console.log('⏰ Auth check timeout - setting loading to false');
      setIsLoading(false);
    }, 1000); // 1 second timeout

    try {
      console.log('🔍 Checking for token in AsyncStorage directly...');
      
      // Directly check AsyncStorage to avoid any API service issues
      const token = await AsyncStorage.getItem('wedwisely_auth_token');
      console.log('🔑 Token check result:', token ? 'Token found' : 'No token');
      
      if (token) {
        console.log('✅ Token found, validating with backend...');
        
        try {
          // Validate token with backend
          const userResponse = await authService.getCurrentUser();
          
          if (userResponse.success) {
            console.log('✅ Token is valid, user authenticated');
            setUser(userResponse.data);
            setIsAuthenticated(true);
          } else {
            console.log('❌ Token is invalid, clearing it');
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (validationError) {
          console.log('❌ Token validation failed, clearing it');
          await authService.logout();
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        console.log('ℹ️ No token found, user not authenticated');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('❌ Error checking auth status:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      console.log('🏁 Auth check complete, setting loading to false');
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      
      if (response.success) {
        // Fetch user data after successful login
        const userResponse = await authService.getCurrentUser();
        
        if (userResponse.success) {
          setUser(userResponse.data);
          setIsAuthenticated(true);
          return { success: true, data: userResponse.data };
        } else {
          // Login succeeded but couldn't fetch user data
          setUser(response.data);
          setIsAuthenticated(true);
          return { success: true, data: response.data };
        }
      }
      
      return response;
    } catch (error) {
      console.error('❌ Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Starting complete logout process...');
      
      // Clear all data from AsyncStorage
      await apiService.clearAllData();
      
      // Clear local state
      setUser(null);
      setIsAuthenticated(false);
      
      console.log('✅ Complete logout successful');
      return { success: true };
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Still clear local state even if logout fails
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      
      if (response.success) {
        // Fetch user data after successful registration
        const userResponse = await authService.getCurrentUser();
        
        if (userResponse.success) {
          setUser(userResponse.data);
          setIsAuthenticated(true);
          return { success: true, data: userResponse.data };
        } else {
          // Registration succeeded but couldn't fetch user data
          setUser(response.data);
          setIsAuthenticated(true);
          return { success: true, data: response.data };
        }
      }
      
      return response;
    } catch (error) {
      console.error('❌ Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Comfortaa-Regular': require('../assets/fonts/Comfortaa-Regular.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        setFontsLoaded(true); // Continue anyway
      }
    }
    loadFonts();
  }, []);

  const validateField = (field, value) => {
    switch (field) {
      case 'email':
        if (!value.trim()) return '* Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return '* Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return '* Password is required';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleLogin = async () => {
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // 🔹 Dummy hardcoded credentials
      const dummyEmail = 'demo@wedwisely.com';
      const dummyPassword = '123456';

      if (
        formData.email.trim().toLowerCase() === dummyEmail &&
        formData.password === dummyPassword
      ) {
        console.log('✅ Dummy login successful!');
        // For dummy login, we'll create a mock user object
        // The context will handle the navigation automatically
        setErrors({});
        navigation.replace('MainTabs');
        return;
      }

      // Try real backend login using the context
      const response = await login({
        email: formData.email.trim(),
        password: formData.password
      });

      if (response.success) {
        console.log('✅ Backend login successful!', response.data);
        setErrors({});
        // Navigation will be handled automatically by the context
        navigation.replace('MainTabs');
      } else {
        setErrors({ general: response.message || 'Login failed' });
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={tw`flex-grow px-5 pt-15`}
        bounces={true}
        decelerationRate="normal"
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        overScrollMode="always"
        removeClippedSubviews={false}
        keyboardDismissMode="on-drag"
      >
        {/* Back Navigation */}
        <TouchableOpacity 
          style={tw`mb-8`}
          onPress={() => navigation.goBack()}
        >
          <Text style={tw`text-2xl text-black font-semibold font-roboto`}>←</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={[tw`text-3xl text-black mb-10 text-left`, { fontFamily: fontsLoaded ? 'Comfortaa-Regular' : 'System' }]}>Log in</Text>

        {/* Email Input */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-base text-black mb-2 font-roboto font-medium`}>Email</Text>
          <TextInput
            style={[
              tw`h-13 border rounded px-4 text-base text-black bg-white font-roboto`,
              errors.email ? tw`border-error` : tw`border-black`
            ]}
            placeholder="jane@example.com"
            placeholderTextColor="#666"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />
          {errors.email && (
            <Text style={[tw`text-sm mt-2 font-roboto`, { color: '#ff6b6b' }]}>{errors.email}</Text>
          )}
        </View>

        {/* Password Input */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-base text-black mb-2 font-roboto font-medium`}>Password</Text>
          <View style={tw`relative`}>
            <TextInput
              style={[
                tw`h-13 border rounded px-4 pr-12 text-base text-black bg-white font-roboto`,
                errors.password ? tw`border-error` : tw`border-black`
              ]}
              placeholder="Enter password"
              placeholderTextColor="#666"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
            />
                          <TouchableOpacity
                style={tw`absolute right-4 top-0 bottom-0 justify-center`}
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialIcons 
                  name={showPassword ? 'visibility-off' : 'visibility'} 
                  size={24} 
                  color="#666" 
                />
              </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={[tw`text-sm mt-2 font-roboto`, { color: '#ff6b6b' }]}>{errors.password}</Text>
          )}
        </View>

        {/* Summary Error Message */}
        {errors.general && (
          <View style={tw`mb-5 p-3 bg-red-50 border border-error rounded-lg`}>
            <Text style={tw`text-sm text-error text-center font-roboto`}>{errors.general}</Text>
          </View>
        )}
        
        {/* Field Errors Summary */}
        {Object.keys(errors).filter(key => key !== 'general' && errors[key]).length > 0 && (
          <View style={tw`mb-5 p-3 bg-red-50 border border-error rounded-lg`}>
            <Text style={tw`text-sm text-error text-center font-roboto`}>⚠️ Please fix the errors above</Text>
          </View>
        )}

        {/* Login Button */}
        <TouchableOpacity 
          style={[tw`bg-black h-13 rounded justify-center items-center mt-10`, isLoading && tw`opacity-50`]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={tw`text-white text-base font-bold tracking-wider font-roboto`}>
            {isLoading ? 'LOGGING IN...' : 'LOG IN'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
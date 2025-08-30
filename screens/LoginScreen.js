import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as Font from 'expo-font';

const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  const handleLogin = () => {
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

    // 🔹 Dummy hardcoded credentials
    const dummyEmail = 'demo@wedwisely.com';
    const dummyPassword = '123456';

    if (
      formData.email.trim().toLowerCase() === dummyEmail &&
      formData.password === dummyPassword
    ) {
      console.log('Login successful!');
      navigation.replace('MainTabs'); // navigate to Home + navbar
    } else {
      setErrors({ general: 'Invalid email or password' });
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {/* Back Navigation */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Log in</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email ? styles.inputError : null]}
            placeholder="jane@example.com"
            placeholderTextColor="#666"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, errors.password ? styles.inputError : null]}
            placeholder="Enter password"
            placeholderTextColor="#666"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
          />
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        </View>

        {/* Summary Error Message */}
        {Object.keys(errors).length > 0 && (
          <View style={styles.summaryErrorContainer}>
            {errors.general ? (
              <Text style={styles.summaryErrorText}>{errors.general}</Text>
            ) : (
              <Text style={styles.summaryErrorText}>⚠️ Fix errors above</Text>
            )}
          </View>
        )}

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' },

  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingHorizontal: 20, 
    paddingTop: 60 },

  backButton: { marginBottom: 30 },

  backArrow: { 
    fontSize: 24, 
    color: '#000', 
    fontWeight: '600', 
    fontFamily: 'Roboto' },

  title: { 
    fontSize: 32, 
    color: '#000', 
    marginBottom: 40, 
    textAlign: 'left', 
    fontFamily: 'Comfortaa-Regular' },

  inputContainer: { marginBottom: 20 },

  label: { 
    fontSize: 16, 
    color: '#000', 
    marginBottom: 8, 
    fontFamily: 'Roboto', 
    fontWeight: '500' },

  input: { 
    height: 52, 
    borderWidth: 1, 
    borderColor: '#000', 
    borderRadius: 4, 
    paddingHorizontal: 16, 
    fontSize: 16, 
    color: '#000', 
    backgroundColor: '#fff', 
    fontFamily: 'Roboto' },
  inputError: { borderColor: '#ff6b6b' },

  errorText: { 
    fontSize: 12, 
    color: '#ff6b6b', 
    marginTop: 4, 
    marginLeft: 4, 
    fontFamily: 'Roboto' },

  summaryErrorContainer: { 
    marginBottom: 20, 
    padding: 6, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ff6b6b' },

  summaryErrorText: { 
    fontSize: 11, 
    color: '#ff6b6b', 
    textAlign: 'center', 
    fontFamily: 'Roboto' },

  button: { 
    backgroundColor: '#000', 
    height: 52, 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 40 },

  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold', 
    letterSpacing: 1, 
    fontFamily: 'Roboto' },
});

export default LoginScreen;
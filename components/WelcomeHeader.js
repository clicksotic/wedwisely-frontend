// components/WelcomeHeader.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

const WelcomeHeader = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/wedding-bg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Let’s Get</Text>
          <Text style={styles.title}>Married</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 50,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  header: { alignItems: 'center', marginBottom: 40 },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 6,
    fontFamily: 'Comfortaa-Regular',
  },
  title: {
    fontSize: 42,
    color: '#fff',
    // If you add Comfortaa-Bold.ttf, switch to 'Comfortaa-Bold'
    fontFamily: 'Comfortaa-Regular',
    // fontFamily: 'Comfortaa-Bold',
  },
  buttonContainer: { gap: 16 },
  button: {
    backgroundColor: '#801D11',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Comfortaa-Regular',
  },
});

export default WelcomeHeader;
// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WelcomeHeader from '../components/WelcomeHeader';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <WelcomeHeader />
      <Text style={styles.text}>This is the Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontFamily: 'Comfortaa-Regular' },
});
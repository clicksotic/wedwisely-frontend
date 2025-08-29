import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import WelcomeHeader from './components/WelcomeHeader';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <WelcomeHeader 
        title="Welcome to WedWisely" 
        subtitle="Your Wedding Planning Companion"
      />
      <View style={styles.content}>
        <Text style={styles.description}>
          Start planning your perfect wedding with our comprehensive tools and features.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
  },
});

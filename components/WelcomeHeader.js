// components/WelcomeHeader.js
import React from 'react';
import { View, Image } from 'react-native';

const WelcomeHeader = () => {
  return (
    <View style={{ height: 156, justifyContent: 'flex-start' }}>
      <Image
        source={require('../assets/welcomelogo.png')}
        style={{ width: 137, height: 137, opacity: 1, alignSelf: 'center', marginTop: 9 }}
        resizeMode="contain"
      />
    </View>
  );
};

export default WelcomeHeader;
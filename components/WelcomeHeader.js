// components/WelcomeHeader.js
import React from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import tw from 'twrnc';

const WelcomeHeader = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/wedding-bg.png')}
      style={tw`flex-1 justify-end`}
      resizeMode="cover"
    >
      <View style={tw`flex-1 justify-end px-6 pb-12 bg-black/20`}>
        <View style={tw`items-center mb-10`}>
          <Text style={[tw`text-lg text-white mb-1.5`, { fontFamily: 'Comfortaa-Regular' }]}>
            Let's Get
          </Text>
          <Text style={[tw`text-4xl text-white`, { fontFamily: 'Comfortaa-Regular' }]}>
            Married
          </Text>
        </View>

        <View style={tw`gap-4`}>
          <TouchableOpacity 
            style={tw`bg-[#801D11] h-13 rounded-xl justify-center items-center`} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[tw`text-white text-lg`, { fontFamily: 'Comfortaa-Regular' }]}>
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`bg-[#801D11] h-13 rounded-xl justify-center items-center`} 
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={[tw`text-white text-lg`, { fontFamily: 'Comfortaa-Regular' }]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default WelcomeHeader;
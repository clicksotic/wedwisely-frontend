import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const WelcomeHeader = ({ title, subtitle, navigation }) => {
  return (
    <View style={tw`flex-1 justify-center px-5 bg-white`}>
      <View style={tw`items-center py-5 bg-gray-100 rounded-lg mb-10`}>
        <Text style={tw`text-2xl font-bold text-gray-800 mb-2`}>{title}</Text>
        <Text style={tw`text-base text-gray-600 text-center`}>{subtitle}</Text>
      </View>
      
      <View style={tw`space-y-4`}>
        <TouchableOpacity 
          style={tw`bg-black h-13 rounded justify-center items-center`}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={tw`text-white text-base font-bold tracking-wider`}>REGISTER</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={tw`bg-white h-13 rounded justify-center items-center border border-black`}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={tw`text-black text-base font-bold tracking-wider`}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeHeader;

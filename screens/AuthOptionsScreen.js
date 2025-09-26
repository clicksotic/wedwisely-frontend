import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import tw from 'twrnc';
import { THEME } from '../config/api';

const AuthOptionsScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('../assets/welcome-bg.png')} resizeMode="cover" style={tw`flex-1`}>
      <View style={tw`flex-1 justify-end`}>
        <View style={[tw`mx-3 mb-4 rounded-3xl`, { backgroundColor: THEME.backgroundLight }]}>
          <View style={tw`px-5 pt-5 pb-6`}>
            <Text style={[tw`mb-4`, { fontFamily: 'Lato_700Bold', fontSize: 18, color: '#000' }]}>Login</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[tw`h-12 rounded-lg justify-center items-center mb-3`, { backgroundColor: THEME.brandGold }]}>
              <Text style={[{ fontFamily: 'Lato_700Bold', color: '#1b1b1b', fontSize: 16 }]}>Log In</Text>
            </TouchableOpacity>

            <Text style={[tw`my-2`, { fontFamily: 'Lato_400Regular', color: '#111' }]}>Don't have an account?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={[tw`h-12 rounded-lg justify-center items-center`, { backgroundColor: THEME.brandGold }]}>
              <Text style={[{ fontFamily: 'Lato_700Bold', color: '#1b1b1b', fontSize: 16 }]}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={[tw`text-center mt-6 mb-4`, { fontFamily: 'Lato_400Regular', color: '#333' }]}>Or continue with</Text>

            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity style={[tw`flex-1 h-12 mr-2 rounded-lg justify-center items-center border`, { borderColor: '#e0e0e0', backgroundColor: THEME.backgroundLight }]}>
                <Text style={{ fontFamily: 'Lato_700Bold' }}>G</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[tw`flex-1 h-12 mx-1 rounded-lg justify-center items-center border`, { borderColor: '#e0e0e0', backgroundColor: THEME.backgroundLight }]}>
                <Text style={{ fontFamily: 'Lato_700Bold' }}></Text>
              </TouchableOpacity>
              <TouchableOpacity style={[tw`flex-1 h-12 ml-2 rounded-lg justify-center items-center border`, { borderColor: '#e0e0e0', backgroundColor: THEME.backgroundLight }]}>
                <Text style={{ fontFamily: 'Lato_700Bold' }}>🔒</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default AuthOptionsScreen;



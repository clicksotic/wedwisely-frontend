import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import { THEME } from '../config/api';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Colors from moodboard
const GOLD = THEME.brandGold;
const OVERLAY = 'rgba(0,0,0,0.15)';
const SHEET_HEIGHT = 280; // reduced height for the bottom sheet

const WelcomeScreen = ({ navigation }) => {
  const [showAuth, setShowAuth] = useState(false);
  const insets = useSafeAreaInsets();
  return (
    <ImageBackground
      source={require('../assets/welcome-bg.png')}
      resizeMode="cover"
      style={tw`flex-1`}
    >
      <View style={[tw`flex-1`, { backgroundColor: 'transparent' }]}> 
        {/* Centered logo */}
        <Image
          source={require('../assets/logo.png')}
          style={{ position: 'absolute', top: 49, width: 383, height: 383, opacity: 1, alignSelf: 'center', zIndex: 2 }}
          resizeMode="contain"
        />

        {/* Bottom gradient overlay with text + button */}
        {!showAuth && (
          <LinearGradient
            colors={["rgba(232,226,219,0)", "rgba(232,226,219,0.6)", "#E8E2DB"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={[tw`px-6 pt-10 pb-8`, { position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 1, height: 260 }]}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              style={[{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 32, color: '#ffffff', textAlign: 'center', textShadowColor: 'rgba(0,0,0,0.25)', textShadowRadius: 4, textShadowOffset: { width: 0, height: 1 } }]}
            >
              Welcome to Wedwisely
            </Text>
            <Text style={[tw`mt-2`, { fontFamily: 'Lato_500Medium', fontSize: 24, color: '#ffffff', textAlign: 'center', textShadowColor: 'rgba(0,0,0,0.3)', textShadowRadius: 6, textShadowOffset: { width: 0, height: 1 } }]}>
              Plan your perfect day,
              effortlessly
            </Text>

            <TouchableOpacity
              onPress={() => setShowAuth(true)}
              style={[tw`mt-5 rounded-lg h-14 justify-center items-center`, { backgroundColor: GOLD }]}
            >
              <Text style={[{ fontFamily: 'Lato_500Medium', fontSize: 22, color: '#ffffff' }]}>Get Started</Text>
            </TouchableOpacity>
          </LinearGradient>
        )}

        {/* Tap outside to close when sheet is open */}
        {showAuth && (
          <Pressable onPress={() => setShowAuth(false)} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: SHEET_HEIGHT + insets.bottom + 24, zIndex: 2 }} />
        )}

        {/* Inline auth card on the same screen */}
        {showAuth && (
          <View style={[tw`px-6`, { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: THEME.backgroundLight, borderTopLeftRadius: 24, borderTopRightRadius: 24, height: SHEET_HEIGHT + insets.bottom + 28, zIndex: 3, paddingTop: 14, paddingBottom: insets.bottom + 24 }]}> 
            <Text style={[tw`mb-3`, { fontFamily: 'Lato_700Bold', fontSize: 18, color: '#000' }]}>Login</Text>

            <TouchableOpacity onPress={() => { setShowAuth(false); navigation.navigate('Login'); }} style={[tw`h-11 rounded-lg justify-center items-center mb-3`, { backgroundColor: GOLD }]}>
              <Text style={[{ fontFamily: 'Lato_500Medium', color: '#ffffff', fontSize: 22 }]}>Log In</Text>
            </TouchableOpacity>

            <Text style={[tw`my-1`, { fontFamily: 'Lato_400Regular', color: '#111' }]}>Don't have an account?</Text>

            <TouchableOpacity onPress={() => { setShowAuth(false); navigation.navigate('Register'); }} style={[tw`h-11 rounded-lg justify-center items-center`, { backgroundColor: GOLD }]}>
              <Text style={[{ fontFamily: 'Lato_500Medium', color: '#ffffff', fontSize: 22 }]}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={[tw`text-center mt-4 mb-3`, { fontFamily: 'Lato_400Regular', color: '#333' }]}>Or continue with</Text>

            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity style={[tw`flex-1 h-12 mr-2 rounded-lg justify-center items-center border`, { borderColor: '#e0e0e0', backgroundColor: THEME.backgroundLight, paddingVertical: 6 }]}>
                <Image source={require('../assets/google.png')} style={{ width: 21, height: 21 }} resizeMode="contain" />
              </TouchableOpacity>
              <TouchableOpacity style={[tw`flex-1 h-12 mx-1 rounded-lg justify-center items-center border`, { borderColor: '#e0e0e0', backgroundColor: THEME.backgroundLight, paddingVertical: 6 }]}>
                <Image source={require('../assets/ios.png')} style={{ width: 24, height: 24 }} resizeMode="contain" />
              </TouchableOpacity>
              <TouchableOpacity style={[tw`flex-1 h-12 ml-2 rounded-lg justify-center items-center border`, { borderColor: '#e0e0e0', backgroundColor: THEME.backgroundLight, paddingVertical: 6 }]}>
                <Image source={require('../assets/finger.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;



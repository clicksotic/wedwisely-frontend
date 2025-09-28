// App.js
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Lato_400Regular, Lato_500Medium, Lato_700Bold } from '@expo-google-fonts/lato';

// Landing + auth
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';


// Tab pages (create these if you haven’t yet)
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ServicesScreen from './screens/ServicesScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import PackagesScreen from './screens/PackagesScreen';

// Custom tab bar UI (the red “MENU” pill)
import CustomTabBar from './components/CustomTabBar';

// Let Expo handle the splash screen automatically

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/** Landing screen without bottom nav is the WelcomeScreen */

/** Bottom tabs used on: Home, Search, Menu, Chat, Profile */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Packages" component={ServicesScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    Lato_400Regular,
    Lato_500Medium,
    Lato_700Bold,
    'Comfortaa-Regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
  });

  // Do not block rendering on fonts; fallback to system fonts if not yet loaded

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />

        {/* Stack: Landing -> Auth -> Main Tabs */}
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Landing">
          {/* Landing page with Sign In / Register buttons */}
          <Stack.Screen name="Landing" component={WelcomeScreen} />

          {/* Auth */}
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />


          {/* App pages with the bottom navbar */}
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
// App.js
import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

// Landing + auth
import WelcomeHeader from './components/WelcomeHeader';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';


// Tab pages (create these if you haven’t yet)
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import PackagesScreen from './screens/PackagesScreen';

// Custom tab bar UI (the red “MENU” pill)
import CustomTabBar from './components/CustomTabBar';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/** Landing screen without bottom nav */
function Landing({ navigation }) {
  return (
    <WelcomeHeader
      title="Welcome to WedWisely"
      subtitle="Your Wedding Planning Companion"
      navigation={navigation}
    />
  );
}

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
      <Tab.Screen name="Packages" component={PackagesScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Comfortaa-Regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
    // Add more weights when you add the files:
    // 'Comfortaa-Bold': require('./assets/fonts/Comfortaa-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <StatusBar style="auto" />

        {/* Stack: Landing -> Auth -> Main Tabs */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Landing page with Sign In / Register buttons */}
          <Stack.Screen name="Landing" component={Landing} />

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
// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Lato_400Regular, Lato_500Medium, Lato_700Bold } from '@expo-google-fonts/lato';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Landing + auth
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

// Tab pages
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import SearchScreen from './screens/SearchScreen';
import ServicesScreen from './screens/ServicesScreen';
import PackagesScreen from './screens/PackagesScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';

// Custom tab bar UI
import CustomTabBar from './components/CustomTabBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/** Bottom tabs for main app */
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

/** Main App Navigator with authentication logic */
function AppNavigator() {
  console.log('🧭 AppNavigator rendering...');
  const { isAuthenticated, isLoading } = useAuth();
  console.log('🔐 Auth state - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated);

  // Show loading screen while checking authentication
  if (isLoading) {
    console.log('⏳ Showing loading screen...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAF7' }}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isAuthenticated ? "MainTabs" : "Landing"}>
      {/* Landing page with Sign In / Register buttons */}
      <Stack.Screen name="Landing" component={WelcomeScreen} />

      {/* Auth */}
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* App pages with the bottom navbar */}
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
}

export default function App() {
  console.log('🚀 App component starting...');
  
  // Temporarily disable font loading to test
  const [fontsLoaded] = React.useState(true); // Force fonts to be "loaded"
  
  // Uncomment this to re-enable font loading with timeout
  /*
  const [fontsLoaded, fontError] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    Lato_400Regular,
    Lato_500Medium,
    Lato_700Bold,
    'Comfortaa-Regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
  });

  // Add a timeout for font loading
  const [fontTimeout, setFontTimeout] = React.useState(false);
  
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('⏰ Font loading timeout - proceeding without fonts');
      setFontTimeout(true);
    }, 3000); // 3 second timeout

    return () => clearTimeout(timeout);
  }, []);

  console.log('📝 Fonts loaded:', fontsLoaded, 'Font error:', fontError, 'Font timeout:', fontTimeout);

  // Show loading screen while fonts are loading (but not forever)
  if (!fontsLoaded && !fontTimeout) {
    console.log('⏳ Waiting for fonts to load...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAF7' }}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }
  */

  console.log('✅ Proceeding with app (fonts disabled for testing)...');

  // Temporary bypass for testing
  console.log('🔄 Rendering with AuthProvider...');
  
  try {
    return (
      <AuthProvider>
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <StatusBar style="auto" />
            <AppNavigator />
          </NavigationContainer>
        </View>
      </AuthProvider>
    );
  } catch (error) {
    console.error('❌ Error in AuthProvider:', error);
    // Fallback to simple navigation without auth
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Landing">
            <Stack.Screen name="Landing" component={WelcomeScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}
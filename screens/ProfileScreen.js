// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WelcomeHeader from '../components/WelcomeHeader';
import { useAuth } from '../contexts/AuthContext';
import tw from 'twrnc';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            console.log('🚪 Logging out...');
            await logout();
            // Navigate back to the welcome screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Landing' }],
            });
          },
        },
      ]
    );
  };


  return (
    <View style={tw`flex-1 bg-[#FAFAF7]`}>
      <WelcomeHeader />
      
      <View style={tw`flex-1 px-5 pt-4`}>
        {/* User Info */}
        <View style={tw`bg-white rounded-2xl p-6 mb-6 shadow-sm`}>
          <Text style={tw`text-2xl font-bold text-black mb-4`}>Profile</Text>
          
          {/* Full Name */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-sm text-gray-500 mb-1`}>Full Name</Text>
            <Text style={tw`text-lg font-semibold text-black`}>
              {user?.fullName || user?.firstName && user?.lastName 
                ? `${user.firstName} ${user.lastName}` 
                : user?.firstName || 'Not provided'}
            </Text>
          </View>

          {/* Email */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-sm text-gray-500 mb-1`}>Email</Text>
            <Text style={tw`text-base text-gray-700`}>
              {user?.email || 'Not provided'}
            </Text>
          </View>

          {/* Role */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-sm text-gray-500 mb-1`}>Role</Text>
            <Text style={tw`text-base text-gray-700 capitalize`}>
              {user?.role || 'Not specified'}
            </Text>
          </View>

          {/* Account Status */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-sm text-gray-500 mb-1`}>Account Status</Text>
            <View style={tw`flex-row items-center`}>
              <View style={[
                tw`w-3 h-3 rounded-full mr-2`,
                { backgroundColor: user?.isActive ? '#10B981' : '#EF4444' }
              ]} />
              <Text style={tw`text-base text-gray-700`}>
                {user?.isActive ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>

          {/* Email Verification Status */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-sm text-gray-500 mb-1`}>Email Verification</Text>
            <View style={tw`flex-row items-center`}>
              <View style={[
                tw`w-3 h-3 rounded-full mr-2`,
                { backgroundColor: user?.isEmailVerified ? '#10B981' : '#F59E0B' }
              ]} />
              <Text style={tw`text-base text-gray-700`}>
                {user?.isEmailVerified ? 'Verified' : 'Pending'}
              </Text>
            </View>
          </View>

          {/* Last Login */}
          {user?.lastLogin && (
            <View style={tw`mb-4`}>
              <Text style={tw`text-sm text-gray-500 mb-1`}>Last Login</Text>
              <Text style={tw`text-base text-gray-700`}>
                {new Date(user.lastLogin).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
            </View>
          )}
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={tw`bg-red-500 h-13 rounded-lg justify-center items-center`}
          onPress={handleLogout}
        >
          <Text style={tw`text-white text-base font-bold`}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontFamily: 'Comfortaa-Regular' },
});
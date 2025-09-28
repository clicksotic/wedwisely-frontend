// screens/HomeScreen.js
import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WelcomeHeader from "../components/WelcomeHeader";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const services = [
    {
      id: 1,
      name: "Venues",
      image: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c"
    },
    {
      id: 2,
      name: "Catering",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
    },
    {
      id: 3,
      name: "Bakery",
      image: "https://images.unsplash.com/photo-1542831371-d531d36971e6"
    },
    {
      id: 4,
      name: "Boutique",
      image: "https://images.unsplash.com/photo-1521334884684-d80222895322"
    }
  ];

  return (
    <ScrollView style={tw`flex-1 bg-[#FAFAF7] px-5 pt-4 `} contentContainerStyle={{ paddingBottom: insets.bottom + 8 }}>
      <WelcomeHeader />

      {/* 1. Header */}
      <View style={tw`flex-row items-center mb-3`}>
        <View style={tw`flex-1 w-[75%] flex-row items-center`}>
          <Text style={tw`text-xl text-[#D4AF37] font-semibold`}>Welcome,</Text>
          <Text style={tw`text-xl text-black font-semibold ml-2`}>Jennifer</Text>
        </View>
        <View style={tw`w-[25%] items-end`}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={tw`w-10 h-10 rounded-full`}
          />
        </View>
      </View>

      {/* 2. Hero card (responsive) */}
      <TouchableOpacity style={tw`rounded-2xl overflow-hidden mb-6`}>
        <View style={{ width: '100%', aspectRatio: 16/9 }}>
          <Image
            source={require("../assets/HomePage/MainMenuPackagesCard.jpg")}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
          <LinearGradient
            colors={[ 'rgba(0,0,0,0)', 'rgba(0,0,0,0.35)' ]}
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '45%' }}
          />
          <Text style={{ position: 'absolute', top: 10, left: 14, color: '#111', fontSize: 16, fontWeight: '600' }}>Packages</Text>
          <View style={{ position: 'absolute', right: 14, top: '50%', marginTop: -20, width: 40, height: 40, borderRadius: 20, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#DADADA' }}>
            <Ionicons name="arrow-forward" size={18} color="#DADADA" />
          </View>
        </View>
      </TouchableOpacity>

      {/* 3. To-do List (responsive card) */}
      <View style={[tw`rounded-2xl p-4 mb-6`, { backgroundColor: '#E8E2DB' }]}>
        <Text style={[tw`text-black mb-2`, { fontFamily: 'Lato_500Medium', fontSize: 14 }]}>To do list</Text>
        <View style={tw`mb-3`}>
          <Text style={{ color: '#000', fontFamily: 'Lato_500Medium', fontSize: 12, lineHeight: 12, letterSpacing: -0.33, marginBottom: 6 }}>• Message the Venue Manager</Text>
          <Text style={{ color: '#000', fontFamily: 'Lato_500Medium', fontSize: 12, lineHeight: 12, letterSpacing: -0.33, marginBottom: 6 }}>• Book the Venue</Text>
          <Text style={{ color: '#000', fontFamily: 'Lato_500Medium', fontSize: 12, lineHeight: 12, letterSpacing: -0.33 }}>• Go for cake testing</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <Text style={{ color: '#000', fontFamily: 'Lato_500Medium', fontSize: 12, lineHeight: 12, letterSpacing: -0.33 }}>Progress</Text>
          <Text style={{ color: '#000', fontFamily: 'Lato_500Medium', fontSize: 12, lineHeight: 12, letterSpacing: -0.33 }}>48%</Text>
        </View>
        <View style={{ width: '100%', height: 8, backgroundColor: '#FFFFFF', borderRadius: 9999, overflow: 'hidden', marginBottom: 4 }}>
          <View style={{ height: '100%', width: '48%', backgroundColor: '#D4AF37' }} />
        </View>

        <View style={tw`flex-row justify-center items-center mt-1`}>
          <TouchableOpacity>
            <Text style={{ color: '#D4AF37', fontFamily: 'Lato_500Medium', fontSize: 12, lineHeight: 12, letterSpacing: -0.33 }}>See full list</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. Services */}
      <View style={tw`mb-10`}>
        <Text style={tw`text-lg font-semibold text-black mb-3`}>Services</Text>

        <View style={[tw`flex-row flex-wrap justify-between`, { rowGap: 12 }]}>
          {services.map((service) => (
            <TouchableOpacity 
              key={service.id}
              style={[tw`rounded-2xl overflow-hidden`, { width: '48%', aspectRatio: 1.25, backgroundColor: '#eee', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 }]}
            >
              <Image
                source={{ uri: service.image }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
              <LinearGradient
                colors={[ 'rgba(0,0,0,0)', 'rgba(0,0,0,0.45)' ]}
                style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '44%' }}
              />
              <Text numberOfLines={1} style={{ position: 'absolute', bottom: 8, left: 10, right: 10, color: '#D4AF37', fontSize: 18, fontWeight: '700', textShadowColor: 'rgba(0,0,0,0.25)', textShadowRadius: 4, textAlign: 'center' }}>
                {service.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

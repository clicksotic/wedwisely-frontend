// screens/HomeScreen.js
import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";

export default function HomeScreen() {
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
    <ScrollView style={tw`flex-1 bg-white px-5 pt-12 `}>
      {/* Logo */}
      <View style={tw`items-center mb-[-25px] top-[-10px]`}>
        <Image
          source={require("../assets/Logo-black.png")}
          style={tw`w-24 h-24 rounded-full`}
        />
      </View>

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

      {/* 2. Wedding Packages */}
      <TouchableOpacity style={tw`rounded-xl overflow-hidden mb-6`}>
        <View style={tw`w-full h-45 overflow-hidden`}>
          <Image
            source={require("../assets/HomePage/MainMenuPackagesCard.jpg")}
            style={tw`w-full h-48 -mt-3`}
            resizeMode="cover"
          />
        </View>
        <Text style={tw`absolute top-3 left-4 text-m text-black font-semibold`}>
          Wedding Packages
        </Text>
        <View style={tw`absolute bottom-3 right-4`}>
          <Ionicons name="arrow-forward" size={28} color="#DADADA" />
        </View>
      </TouchableOpacity>

      {/* 3. To-do List */}
      <View style={tw`bg-gray-100 rounded-xl p-4 mb-4 h-40`}>
        <Text style={tw`text-lg font-semibold mb-0 text-black`}>To do list</Text>
        <View style={tw`mb-2`}>
          <Text style={tw`text-sm text-gray-700`}>• Message the Venue Manager</Text>
          <Text style={tw`text-sm text-gray-700`}>• Book the Venue</Text>
          <Text style={tw`text-sm text-gray-700`}>• Go for cake testing</Text>
        </View>

        <View style={tw`w-full h-1.5 bg-gray-300 rounded-full overflow-hidden mb-1`}>
          <View style={tw`h-full bg-[#D4AF37] w-[48%]`} />
        </View>

        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-xs text-gray-600`}>48%</Text>
          <TouchableOpacity>
            <Text style={tw`text-xs text-[#D4AF37]`}>See full list</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. Services */}
      <View style={tw`mb-10`}>
        <Text style={tw`text-lg font-semibold text-black mb-3`}>Services</Text>

        <View style={tw`flex-row flex-wrap justify-between`}>
          {services.map((service) => (
            <TouchableOpacity 
              key={service.id}
              style={tw`w-[48%] h-28 mb-4 rounded-xl overflow-hidden shadow-lg`}
            >
              <Image
                source={{ uri: service.image }}
                style={tw`w-full h-full`}
                resizeMode="cover"
              />
              {/* Gradient overlay */}
              <LinearGradient
                colors={['transparent', 'rgba(225,225,225,1)']}
                style={tw`absolute bottom-0 left-0 right-0 h-16`}
              />
              <Text style={tw`absolute bottom-2 left-2 text-lg text-[#D4AF37] font-semibold`}>
                {service.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const GOLD = '#D4AF37';

const servicesData = [
  {
    id: 'photo',
    title: "John's Photography",
    rating: 4.8,
    image: require('../assets/photo.jpg'),
  },
  {
    id: 'cake',
    title: 'Cakes & Bakes',
    rating: 4.8,
    image: require('../assets/cake.jpg'),
  },
  {
    id: 'riche',
    title: 'Richie Milleon',
    rating: 4.8,
    image: require('../assets/riche.jpg'),
  },
  {
    id: 'banquet',
    title: 'Grand Banquet',
    rating: 4.8,
    image: require('../assets/banquet.jpg'),
  },
];

const StarRow = () => (
  <View style={{ flexDirection: 'row', marginTop: 2 }}>
    {Array.from({ length: 5 }).map((_, idx) => (
      <AntDesign key={idx} name="star" size={14} color={GOLD} />
    ))}
  </View>
);

const ServiceCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress?.(item)}
      activeOpacity={0.9}
      style={{
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: '#111',
        marginBottom: 14,
      }}
    >
      <Image source={item.image} style={{ width: '100%', height: 160 }} resizeMode="cover" />
      <LinearGradient
        colors={[ 'rgba(0,0,0,0)', 'rgba(0,0,0,0.55)' ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 12 }}
      >
        <Text style={{ color: '#fff', fontFamily: 'Lato_500Medium', fontSize: 14, lineHeight: 14, letterSpacing: 0 }}>{item.title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: GOLD, fontFamily: 'Lato_500Medium', fontSize: 14, marginRight: 6, lineHeight: 14, letterSpacing: 0 }}>{item.rating.toFixed(1)}</Text>
          <StarRow />
        </View>
      </LinearGradient>
      <View style={{ position: 'absolute', right: 12, top: '50%', marginTop: -20, backgroundColor: 'rgba(0,0,0,0.35)', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: GOLD }}>
        <Feather name="arrow-right" size={20} color={GOLD} />
      </View>
    </TouchableOpacity>
  );
};

const ServicesScreen = () => {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return servicesData;
    return servicesData.filter(s => s.title.toLowerCase().includes(q));
  }, [query]);

  const handlePress = (item) => {
    // Placeholder for navigation to details
    console.log('Service pressed:', item.id);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FAFAF7' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 14, paddingTop: 36, paddingBottom: insets.bottom + 72 }}>
        <Text style={{
          fontFamily: 'PlayfairDisplay_400Regular',
          fontWeight: '500',
          fontSize: 28,
          lineHeight: 28,
          letterSpacing: -0.33,
          textAlign: 'center',
          color: '#B98C1D',
          marginBottom: 16,
        }}>Services</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <View style={{
            flex: 1,
            backgroundColor: '#D9D9D9',
            borderRadius: 20,
            paddingHorizontal: 12,
            height: 40,
            borderWidth: 1,
            borderColor: GOLD,
            justifyContent: 'center',
          }}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search here"
              placeholderTextColor="#9B9B9B"
              style={{ flex: 1, height: 40, paddingVertical: 0, paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0, fontSize: 14, lineHeight: 14, textAlignVertical: 'center', fontFamily: 'Lato_500Medium', letterSpacing: 0 }}
            />
          </View>
          <TouchableOpacity style={{ marginLeft: 12 }}>
            <MaterialCommunityIcons name="flashlight" size={22} color={GOLD} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 16 }}>
            <MaterialIcons name="swap-vert" size={22} color={GOLD} />
          </TouchableOpacity>
        </View>

        {filtered.map(item => (
          <ServiceCard key={item.id} item={item} onPress={handlePress} />
        ))}

        <View style={{ height: insets.bottom + 32 }} />
      </ScrollView>
    </View>
  );
};

export default ServicesScreen;



// screens/SearchScreen.js
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WelcomeHeader from '../components/WelcomeHeader';

const GOLD = '#D4AF37';

const CATEGORIES = [
  'Photography',
  'Catering',
  'Decoration',
  'Music',
  'Transportation',
  'Venue',
  'Others',
];

// Dummy packages
const packagesData = [
  {
    id: 'p1',
    title: 'DELUXE PACKAGE by James H.',
    services: ['Venue', 'Catering', 'Photography', 'Music'],
    price: 12000,
    location: { city: 'Lahore', country: 'Pakistan' },
    image: require('../assets/d9c4406cc2e6643477551e9ae9b2ac23a94d1d51.jpg'),
  },
  {
    id: 'p2',
    title: 'SOUL PACKAGE by Hannah J.',
    services: ['Venue', 'Catering', 'Photography'],
    price: 8000,
    location: { city: 'Karachi', country: 'Pakistan' },
    image: require('../assets/0b917fe83ca46a5c50cc62709bbbfffc541ef35f.jpg'),
  },
];

/* Compact, single-line pill */
const Pill = ({ text, isGold = false, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    style={{
      height: 26,                 // fixed compact height
      paddingHorizontal: 10,
      borderRadius: 13,
      borderWidth: 1,
      borderColor: GOLD,
      backgroundColor: isGold ? GOLD : 'rgba(212,175,55,0.15)',
      marginRight: 6,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text
      numberOfLines={1}
      allowFontScaling={false}    // stops dynamic type from stretching the pill
      style={{
        fontSize: 12,
        lineHeight: 14,           // tighter line height prevents tall pills
        includeFontPadding: false, // trims Android extra text padding
        textAlignVertical: 'center',
        color: isGold ? '#fff' : GOLD,
        fontFamily: 'Lato_500Medium',
      }}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

const PackageCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const maxVisible = 3;
  const visibleServices = expanded ? item.services : item.services.slice(0, maxVisible);
  const remaining = item.services.length - maxVisible;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 16,
      }}
    >
      <ImageBackground
        source={item.image}
        style={{ width: '100%', height: 167 }}
        imageStyle={{ borderRadius: 20 }}
      >
        {/* Gradient just for title fade */}
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.55)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1, justifyContent: 'flex-end', padding: 14 }}
        >
          {/* Title above pills */}
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Lato_500Medium',
              fontSize: 15,
              marginBottom: 40, // reserve space for pills row
            }}
          >
            {item.title}
          </Text>
        </LinearGradient>

        {/* Pills pinned to the very bottom */}
        <View
          style={{
            position: 'absolute',
            left: 14,
            right: 14,
            bottom: 10, // sits inside the rounded edge
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {visibleServices.map((srv, idx) => (
              <Pill key={idx} text={srv} />
            ))}
            {remaining > 0 && (
              <Pill
                text={expanded ? 'Show less' : `+${remaining} more`}
                isGold
                onPress={() => setExpanded(!expanded)}
              />
            )}
          </ScrollView>
        </View>

        {/* Arrow Button */}
        <View
          style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            marginTop: -20,
            backgroundColor: 'rgba(0,0,0,0.35)',
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: GOLD,
          }}
        >
          <Feather name="arrow-right" size={20} color={GOLD} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    country: '',
    minPrice: '',
    maxPrice: '',
  });

  const appliedFilterCount = useMemo(
    () =>
      ['category', 'city', 'country', 'minPrice', 'maxPrice'].reduce(
        (acc, k) => acc + (filters[k] ? 1 : 0),
        0
      ),
    [filters]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = packagesData.filter(
      (p) =>
        (!filters.category || p.services.includes(filters.category)) &&
        (!filters.city ||
          (p.location?.city || '').toLowerCase().includes(filters.city.toLowerCase())) &&
        (!filters.country ||
          (p.location?.country || '')
            .toLowerCase()
            .includes(filters.country.toLowerCase())) &&
        (!filters.minPrice || Number(p.price) >= Number(filters.minPrice)) &&
        (!filters.maxPrice || Number(p.price) <= Number(filters.maxPrice))
    );
    const searched = q ? base.filter((p) => p.title.toLowerCase().includes(q)) : base;
    return [...searched].sort((a, b) =>
      sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
  }, [query, filters, sortAsc]);

  return (
    <View style={{ flex: 1, backgroundColor: '#FAFAF7' }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 14,
          paddingTop: 16,
          paddingBottom: insets.bottom + 8,
        }}
      >
        <WelcomeHeader />

        <Text
          style={{
            fontFamily: 'PlayfairDisplay_400Regular',
            fontWeight: '500',
            fontSize: 28,
            lineHeight: 34,
            textAlign: 'center',
            color: '#B98C1D',
            marginBottom: 16,
          }}
        >
          Wedding Packages
        </Text>

        {/* Search bar */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#D9D9D9',
              borderRadius: 20,
              paddingHorizontal: 12,
              height: 40,
              borderWidth: 1,
              borderColor: GOLD,
              justifyContent: 'center',
            }}
          >
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search here"
              placeholderTextColor="#9B9B9B"
              style={{
                flex: 1,
                height: 40,
                fontSize: 14,
                fontFamily: 'Lato_500Medium',
              }}
            />
          </View>
          {/* Filter button */}
          <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => setShowFilter(true)}>
            <MaterialCommunityIcons name="filter-variant" size={22} color={GOLD} />
          </TouchableOpacity>
          {/* Sort button */}
          <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => setSortAsc((p) => !p)}>
            <MaterialIcons name="swap-vert" size={22} color={GOLD} />
          </TouchableOpacity>
        </View>

        {appliedFilterCount > 0 && (
          <Text style={{ alignSelf: 'flex-end', color: '#666', fontSize: 12, marginTop: 4 }}>
            {appliedFilterCount} filter{appliedFilterCount > 1 ? 's' : ''} applied
          </Text>
        )}

        {filtered.map((pkg) => (
          <PackageCard key={pkg.id} item={pkg} />
        ))}

        {!filtered.length && (
          <Text style={{ textAlign: 'center', color: '#555', marginTop: 20 }}>
            No packages found
          </Text>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilter}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFilter(false)}
      >
        <Pressable
          onPress={() => setShowFilter(false)}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#fff',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: 16,
            paddingBottom: insets.bottom + 16,
          }}
        >
          <Text style={{ fontFamily: 'Lato_700Bold', fontSize: 16, marginBottom: 10 }}>
            Filters
          </Text>
          <ScrollView>
            {/* Category */}
            <Text style={{ fontFamily: 'Lato_500Medium', marginBottom: 6 }}>Category</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() =>
                    setFilters((prev) => ({
                      ...prev,
                      category: prev.category === cat ? '' : cat,
                    }))
                  }
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: filters.category === cat ? GOLD : '#ddd',
                    marginRight: 8,
                    marginBottom: 8,
                    backgroundColor: filters.category === cat ? '#FFF7E0' : '#fff',
                  }}
                >
                  <Text style={{ color: '#000' }}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* City */}
            <Text style={{ fontFamily: 'Lato_500Medium', marginBottom: 6, marginTop: 6 }}>
              City
            </Text>
            <TextInput
              value={filters.city}
              onChangeText={(t) => setFilters((p) => ({ ...p, city: t }))}
              placeholder="City"
              style={{
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 10,
                padding: 10,
                marginBottom: 8,
              }}
            />

            {/* Country */}
            <Text style={{ fontFamily: 'Lato_500Medium', marginBottom: 6 }}>Country</Text>
            <TextInput
              value={filters.country}
              onChangeText={(t) => setFilters((p) => ({ ...p, country: t }))}
              placeholder="Country"
              style={{
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 10,
                padding: 10,
                marginBottom: 8,
              }}
            />

            {/* Price */}
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginRight: 6 }}>
                <Text style={{ fontFamily: 'Lato_500Medium', marginBottom: 6 }}>
                  Min Price
                </Text>
                <TextInput
                  keyboardType="numeric"
                  value={String(filters.minPrice)}
                  onChangeText={(t) => setFilters((p) => ({ ...p, minPrice: t }))}
                  placeholder="0"
                  style={{
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 8,
                  }}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 6 }}>
                <Text style={{ fontFamily: 'Lato_500Medium', marginBottom: 6 }}>
                  Max Price
                </Text>
                <TextInput
                  keyboardType="numeric"
                  value={String(filters.maxPrice)}
                  onChangeText={(t) => setFilters((p) => ({ ...p, maxPrice: t }))}
                  placeholder="500000"
                  style={{
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 8,
                  }}
                />
              </View>
            </View>
          </ScrollView>

          {/* Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <TouchableOpacity
              onPress={() => {
                setFilters({ category: '', city: '', country: '', minPrice: '', maxPrice: '' });
                setQuery('');
                setSortAsc(true);
                setShowFilter(false);
              }}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#ddd',
              }}
            >
              <Text>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowFilter(false)}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 10,
                backgroundColor: GOLD,
              }}
            >
              <Text style={{ color: '#fff' }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
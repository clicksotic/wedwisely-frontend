import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WelcomeHeader from '../components/WelcomeHeader';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/api';
import { useFocusEffect } from '@react-navigation/native';

const GOLD = '#D4AF37';
const CATEGORIES = [
  'Photography', 'Catering', 'Decoration', 'Music', 'Transportation', 'Venue', 'Others'
];

// Local dummy aligned to backend shape
const servicesData = [
  {
    _id: 'photo',
    name: "John's Photography",
    category: 'Photography',
    price: 12000,
    location: { city: 'Lahore', country: 'Pakistan' },
    baseImage: Image.resolveAssetSource(require('../assets/photo.jpg')).uri,
    vendor: { _id: 'v1', name: 'John Doe', profilePicture: null },
  },
  {
    _id: 'cake',
    name: 'Cakes & Bakes',
    category: 'Catering',
    price: 8000,
    location: { city: 'Lahore', country: 'Pakistan' },
    baseImage: Image.resolveAssetSource(require('../assets/cake.jpg')).uri,
    vendor: { _id: 'v2', name: 'Cakes & Bakes', profilePicture: null },
  },
  {
    _id: 'riche',
    name: 'Richie Milleon',
    category: 'Venue',
    price: 50000,
    location: { city: 'Lahore', country: 'Pakistan' },
    baseImage: Image.resolveAssetSource(require('../assets/riche.jpg')).uri,
    vendor: { _id: 'v3', name: 'Richie Milleon', profilePicture: null },
  },
  {
    _id: 'banquet',
    name: 'Grand Banquet',
    category: 'Decoration',
    price: 15000,
    location: { city: 'Lahore', country: 'Pakistan' },
    baseImage: Image.resolveAssetSource(require('../assets/banquet.jpg')).uri,
    vendor: { _id: 'v4', name: 'Grand Banquet', profilePicture: null },
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
      <Image source={{ uri: item.baseImage }} style={{ width: '100%', height: 160 }} resizeMode="cover" />
      <LinearGradient
        colors={[ 'rgba(0,0,0,0)', 'rgba(0,0,0,0.55)' ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 12 }}
      >
        <Text style={{ color: '#fff', fontFamily: 'Lato_500Medium', fontSize: 14, lineHeight: 14, letterSpacing: 0 }}>{item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: GOLD, fontFamily: 'Lato_500Medium', fontSize: 14, marginRight: 6, lineHeight: 14, letterSpacing: 0 }}>{item.category}</Text>
          <StarRow />
        </View>
      </LinearGradient>
      <View style={{ position: 'absolute', right: 12, top: '50%', marginTop: -20, backgroundColor: 'rgba(0,0,0,0.35)', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: GOLD }}>
        <Feather name="arrow-right" size={20} color={GOLD} />
      </View>
    </TouchableOpacity>
  );
};

const ServicesScreen = ({ route }) => {
  const insets = useSafeAreaInsets();
  const initialCategory = route?.params?.category || '';
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(servicesData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortAsc, setSortAsc] = useState(true); // up/down icon
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({ category: initialCategory, city: '', country: '', minPrice: '', maxPrice: '' });
  const appliedFilterCount = useMemo(() => {
    return ['category','city','country','minPrice','maxPrice'].reduce((acc, k) => acc + (filters[k] ? 1 : 0), 0);
  }, [filters]);

  const fetchItems = async (activeFilters) => {
    try {
      setLoading(true);
      const qs = buildQueryString(activeFilters);
      const url = qs ? `${API_ENDPOINTS.SERVICES.CARDS}?${qs}` : API_ENDPOINTS.SERVICES.CARDS;
      const res = await apiService.get(url);
      const mergeItems = (apiArr) => {
        const seen = new Set();
        const out = [];
        for (const s of [...(apiArr || []), ...servicesData]) {
          const k = s._id || s.id;
          if (!seen.has(k)) { seen.add(k); out.push(s); }
        }
        return out;
      };

      if (res.success && Array.isArray(res.data?.services)) {
        setItems(mergeItems(res.data.services));
      } else {
        setItems(servicesData);
      }
    } catch (e) {
      setError('Failed to load services');
      setItems(servicesData);
    } finally {
      setLoading(false);
    }
  };

  // Reset filters and fetch each time screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      const next = { category: initialCategory || '', city: '', country: '', minPrice: '', maxPrice: '' };
      setQuery('');
      setSortAsc(true);
      setShowFilter(false);
      setFilters(next);
      fetchItems(next);
      return () => {};
    }, [initialCategory])
  );

  const buildQueryString = (f) => {
    const params = new URLSearchParams();
    if (f.category) params.set('category', f.category);
    if (f.city) params.set('city', f.city);
    if (f.country) params.set('country', f.country);
    if (f.minPrice) params.set('minPrice', String(f.minPrice));
    if (f.maxPrice) params.set('maxPrice', String(f.maxPrice));
    return params.toString();
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = items.filter(s =>
      (!filters.category || s.category === filters.category)
      && (!filters.city || (s.location?.city || '').toLowerCase().includes(filters.city.toLowerCase()))
      && (!filters.country || (s.location?.country || '').toLowerCase().includes(filters.country.toLowerCase()))
      && (!filters.minPrice || Number(s.price) >= Number(filters.minPrice))
      && (!filters.maxPrice || Number(s.price) <= Number(filters.maxPrice))
    );
    const searched = q ? base.filter(s => (s.name || '').toLowerCase().includes(q)) : base;
    const sorted = [...searched].sort((a, b) => sortAsc ? (Number(a.price||0) - Number(b.price||0)) : (Number(b.price||0) - Number(a.price||0)));
    return sorted;
  }, [query, items, filters, sortAsc]);

  const handlePress = (item) => {
    // Placeholder for navigation to details
    console.log('Service pressed:', item.id);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FAFAF7' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 14, paddingTop: 16, paddingBottom: insets.bottom + 8 }}>
        <WelcomeHeader />
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
          <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => setShowFilter(true)}>
            <MaterialCommunityIcons name="filter-variant" size={22} color={GOLD} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => setSortAsc(prev => !prev)}>
            <MaterialIcons name="swap-vert" size={22} color={GOLD} />
          </TouchableOpacity>
        </View>
        {appliedFilterCount > 0 && (
          <Text style={{ alignSelf: 'flex-end', color: '#666', fontSize: 12, marginTop: 4 }}>
            {appliedFilterCount} filter{appliedFilterCount > 1 ? 's' : ''} applied
          </Text>
        )}

        {loading && <Text style={{ color: '#333', textAlign: 'center', marginBottom: 12 }}>Loading...</Text>}
        {error && <Text style={{ color: '#B31310', textAlign: 'center', marginBottom: 12 }}>{error}</Text>}
        {filtered.map(item => (
          <ServiceCard key={(item._id || item.id || Math.random().toString(36))} item={item} onPress={handlePress} />
        ))}
        {!loading && filtered.length === 0 && (
          <Text style={{ textAlign: 'center', color: '#555', marginTop: 20 }}>No services found</Text>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <Modal visible={showFilter} transparent animationType="fade" onRequestClose={() => setShowFilter(false)}>
        <Pressable onPress={() => setShowFilter(false)} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }} />
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16, paddingBottom: insets.bottom + 16 }}>
          <Text style={{ fontFamily: 'Lato_700Bold', fontSize: 16, marginBottom: 10 }}>Filters</Text>
          <ScrollView>
            <Text style={{ fontFamily: 'Lato_500Medium', marginBottom: 6 }}>Category</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <TouchableOpacity key={cat} onPress={() => setFilters(prev => ({ ...prev, category: prev.category === cat ? '' : cat }))} style={{ paddingVertical: 6, paddingHorizontal: 10, borderRadius: 14, borderWidth: 1, borderColor: filters.category === cat ? GOLD : '#ddd', marginRight: 8, marginBottom: 8, backgroundColor: filters.category === cat ? '#FFF7E0' : '#fff' }}>
                  <Text style={{ color: '#000' }}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={{ fontFamily: 'Lato_500Medium', marginBottom: 6, marginTop: 6 }}>City</Text>
            <TextInput value={filters.city} onChangeText={(t) => setFilters(prev => ({ ...prev, city: t }))} placeholder="City" style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginBottom: 8 }} />

            <Text style={{ fontFamily: 'Lato_500Medium', marginBottom: 6 }}>Country</Text>
            <TextInput value={filters.country} onChangeText={(t) => setFilters(prev => ({ ...prev, country: t }))} placeholder="Country" style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginBottom: 8 }} />

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginRight: 6 }}>
                <Text style={{ fontFamily: 'Lato_500Medium', marginBottom: 6 }}>Min Price</Text>
                <TextInput keyboardType="numeric" value={String(filters.minPrice)} onChangeText={(t) => setFilters(prev => ({ ...prev, minPrice: t }))} placeholder="0" style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginBottom: 8 }} />
              </View>
              <View style={{ flex: 1, marginLeft: 6 }}>
                <Text style={{ fontFamily: 'Lato_500Medium', marginBottom: 6 }}>Max Price</Text>
                <TextInput keyboardType="numeric" value={String(filters.maxPrice)} onChangeText={(t) => setFilters(prev => ({ ...prev, maxPrice: t }))} placeholder="500000" style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginBottom: 8 }} />
              </View>
            </View>
          </ScrollView>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <TouchableOpacity onPress={async () => { const next = { category: '', city: '', country: '', minPrice: '', maxPrice: '' }; setFilters(next); setQuery(''); setSortAsc(true); setShowFilter(false); await fetchItems(next); }} style={{ paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, borderWidth: 1, borderColor: '#ddd' }}>
              <Text>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => { setShowFilter(false); setLoading(true); try { const qs = buildQueryString(filters); const url = qs ? `${API_ENDPOINTS.SERVICES.CARDS}?${qs}` : API_ENDPOINTS.SERVICES.CARDS; const res = await apiService.get(url); if (res.success && Array.isArray(res.data?.services)) setItems(res.data.services); else setItems(servicesData); } catch { setItems(servicesData); } finally { setLoading(false); } }} style={{ paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, backgroundColor: GOLD }}>
              <Text style={{ color: '#fff' }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ServicesScreen;



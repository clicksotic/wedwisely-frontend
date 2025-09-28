// components/CustomTabBar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ICON_SIZE = 24;

const CustomTabBar = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();

  const go = (routeName, index) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: state.routes[index].key,
      canPreventDefault: true,
    });
    if (!event.defaultPrevented) navigation.navigate(routeName);
  };

  const iconFor = (name, focused) => {
    switch (name) {
      case 'Home':
        return <Feather name="home" size={ICON_SIZE} color={focused ? '#801D11' : '#333'} />;
      case 'Search':
        return <Feather name="search" size={ICON_SIZE} color={focused ? '#801D11' : '#333'} />;
      case 'Chat':
        return <Ionicons name="chatbubble-ellipses-outline" size={ICON_SIZE} color={focused ? '#801D11' : '#333'} />;
      case 'Profile':
        return <Feather name="user" size={ICON_SIZE} color={focused ? '#801D11' : '#333'} />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {/* Home */}
      <TouchableOpacity style={styles.item} onPress={() => go('Home', 0)}>
        {iconFor('Home', state.index === 0)}
      </TouchableOpacity>

      {/* Search */}
      <TouchableOpacity style={styles.item} onPress={() => go('Search', 1)}>
        {iconFor('Search', state.index === 1)}
      </TouchableOpacity>

      {/* Menu pill in center */}
      <TouchableOpacity activeOpacity={0.9} onPress={() => go('Packages', 2)}>
        <LinearGradient
          colors={['#D32017', '#B31310']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.menuPill}
        >
          <Text style={styles.menuText}>Packages</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Chat */}
      <TouchableOpacity style={styles.item} onPress={() => go('Chat', 3)}>
        {iconFor('Chat', state.index === 3)}
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity style={styles.item} onPress={() => go('Profile', 4)}>
        {iconFor('Profile', state.index === 4)}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    height: 74,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e6e6e6',
    zIndex: 10,
  },
  item: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuPill: {
    width: 150,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#B31310',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Comfortaa-Regular',
    letterSpacing: 1,
    fontWeight: '700',
  },
});

export default CustomTabBar;
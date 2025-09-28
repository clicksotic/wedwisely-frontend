// components/CustomTabBar.js
import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";

const ICON_SIZE = 24;
const BAR_COLOR = '#D4AF37';

const CustomTabBar = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();

  const go = (routeName, index) => {
    const event = navigation.emit({
      type: "tabPress",
      target: state.routes[index].key,
      canPreventDefault: true,
    });
    if (!event.defaultPrevented) navigation.navigate(routeName);
  };

  const iconFor = (name) => {
    const color = '#fff';
    switch (name) {
      case "Dashboard":
        return (
          <Image
            source={require("../assets/dash.png")}
            style={{ width: ICON_SIZE, height: ICON_SIZE, tintColor: color }}
            resizeMode="contain"
          />
        );
      case "Search":
        return <Feather name="search" size={ICON_SIZE} color={color} />;
      case "Home":
        return <Feather name="home" size={ICON_SIZE} color={color} />;
      case "Packages":
        return <Feather name="package" size={ICON_SIZE} color={color} />;
      case "Chat":
        return (
          <View>
            <Ionicons name="chatbox-outline" size={ICON_SIZE} color={color} />
            {/* Notification dot */}
            <View style={styles.dot} />
          </View>
        );
      case "Profile":
        return <Feather name="user" size={ICON_SIZE} color={color} />;
      default:
        return null;
    }
  };

  // render tabs in app order
  const tabOrder = ["Home", "Search", "Packages", "Chat", "Profile"];

  return (
    <View style={[
      styles.wrap,
      { marginBottom: insets.bottom }
    ]}>
      {tabOrder.map((tabName) => {
        const index = state.routes.findIndex((r) => r.name === tabName);
        if (index === -1) return null;
        return (
          <TouchableOpacity
            key={tabName}
            style={styles.item}
            onPress={() => go(tabName, index)}
          >
            {iconFor(tabName)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: BAR_COLOR,
    height: 70,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: BAR_COLOR,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
    paddingBottom: 0,
  },
  dot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
});

export default CustomTabBar;
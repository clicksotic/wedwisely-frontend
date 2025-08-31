# 🎨 Tailwind CSS Setup with twrnc

This project is now configured to use **Tailwind CSS** with **twrnc** (Tailwind React Native Classnames) for React Native development.

## 📦 What's Installed

- `twrnc` - Tailwind React Native Classnames (lightweight alternative to NativeWind)
- `tailwindcss` - Core Tailwind CSS framework

## ⚙️ Configuration Files

### 1. `tailwind.config.js`
- Configured for React Native components
- Custom color palette matching your design
- Custom font families (Comfortaa, Roboto)

### 2. `babel.config.js`
- Standard Expo configuration (no special plugins needed)

### 3. `metro.config.js`
- Standard Expo configuration

## 🚀 How to Use

### Basic Usage
Instead of StyleSheet, use `tw` function:

```jsx
import tw from 'twrnc';

// ❌ Old way with StyleSheet
<View style={styles.container}>
  <Text style={styles.title}>Hello</Text>
</View>

// ✅ New way with twrnc
<View style={tw`flex-1 justify-center items-center`}>
  <Text style={tw`text-2xl font-bold text-black`}>Hello</Text>
</View>
```

### Common Tailwind Classes

#### Layout
- `flex-1` - flex: 1
- `justify-center` - justify-content: center
- `items-center` - align-items: center
- `px-5` - padding-left/right: 20px
- `py-4` - padding-top/bottom: 16px

#### Colors
- `bg-black` - background-color: #000
- `text-white` - color: #fff
- `border-gray-300` - border-color: #d1d5db

#### Typography
- `text-2xl` - font-size: 24px
- `font-bold` - font-weight: bold
- `text-center` - text-align: center

#### Spacing
- `m-4` - margin: 16px
- `p-6` - padding: 24px
- `space-y-4` - gap between children: 16px

#### Custom Colors
- `bg-primary` - #000000
- `bg-secondary` - #8B4513
- `bg-error` - #ff6b6b
- `bg-success` - #4ade80
- `bg-warning` - #fbbf24

#### Custom Fonts
- `font-comfortaa` - Comfortaa-Regular
- `font-roboto` - Roboto

## 📱 Example Component

```jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const ExampleComponent = () => {
  return (
    <View style={tw`flex-1 bg-white p-6`}>
      <Text style={tw`text-3xl font-comfortaa text-primary mb-4`}>
        Welcome
      </Text>
      
      <TouchableOpacity style={tw`bg-primary py-4 px-6 rounded-lg`}>
        <Text style={tw`text-white text-lg font-roboto font-bold text-center`}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExampleComponent;
```

## 🔧 Development Tips

1. **Hot Reload**: Tailwind classes update in real-time
2. **IntelliSense**: Install Tailwind CSS IntelliSense extension in VS Code
3. **Responsive**: Use responsive prefixes like `sm:`, `md:`, `lg:`
4. **Dark Mode**: Use `dark:` prefix for dark mode styles

## 📚 Resources

- [twrnc Documentation](https://github.com/jaredh159/tailwind-react-native-classnames)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)

## 🎯 Benefits

- **Faster Development** - No more StyleSheet writing
- **Consistent Design** - Predefined design system
- **Responsive Design** - Built-in responsive utilities
- **Maintainable** - Easy to modify and scale
- **Performance** - Lightweight and optimized for React Native
- **No Babel/Config Issues** - Works out of the box with Expo

## ⚠️ Important Notes

- Use `style={tw`...`}` instead of `style={styles.xxx}`
- Import `tw` from 'twrnc' in each component
- Some web-specific Tailwind classes won't work in React Native
- The `StyleSheet` approach still works alongside twrnc
- No need for complex Babel or Metro configuration

## 🎉 Why twrnc?

- **Simpler Setup** - No complex configuration needed
- **Better Compatibility** - Works perfectly with Expo
- **Lighter Weight** - Smaller bundle size
- **Faster Build** - No compilation step needed
- **Proven Track Record** - Used by many production apps 
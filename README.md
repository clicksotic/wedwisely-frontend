# WedWisely - Wedding Planning App

A React Native mobile application built with Expo for wedding planning and management.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd wedwisely-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start the app on Android emulator/device
- `npm run ios` - Start the app on iOS simulator/device
- `npm run web` - Start the app in web browser

## 📱 App Structure

```
wedwisely-frontend/
├── App.js              # Main app component
├── app.json            # Expo configuration
├── babel.config.js     # Babel configuration
├── metro.config.js     # Metro bundler configuration
├── package.json        # Dependencies and scripts
├── assets/             # App icons and images
└── README.md           # This file
```

## 🛠️ Technology Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **Metro** - JavaScript bundler
- **Babel** - JavaScript compiler

## 📋 Features

- Welcome screen with app branding
- Cross-platform compatibility (iOS, Android, Web)
- Modern UI design
- Responsive layout

## 🔧 Development

### Adding New Dependencies

```bash
npm install <package-name>
```

### Project Configuration

The app is configured through:
- `app.json` - Expo app settings, permissions, and platform-specific configurations
- `babel.config.js` - JavaScript compilation settings
- `metro.config.js` - Bundler configuration

## 📱 Building for Production

### Android APK
```bash
expo build:android
```

### iOS IPA
```bash
expo build:ios
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.
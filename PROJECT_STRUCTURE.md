# Project Structure Guide

This document outlines the recommended project structure for the WedWisely React Native app.

## 📁 Directory Structure

```
wedwisely-frontend/
├── App.js                    # Main app entry point
├── app.json                  # Expo configuration
├── babel.config.js           # Babel configuration
├── metro.config.js           # Metro bundler configuration
├── package.json              # Dependencies and scripts
├── .gitignore               # Git ignore rules
├── README.md                # Project documentation
├── PROJECT_STRUCTURE.md     # This file
│
├── assets/                  # Static assets
│   ├── images/             # Image files
│   ├── fonts/              # Custom fonts
│   └── icons/              # App icons
│
├── components/              # Reusable UI components
│   ├── common/             # Shared components
│   ├── forms/              # Form components
│   └── layout/             # Layout components
│
├── screens/                 # Screen components
│   ├── auth/               # Authentication screens
│   ├── home/               # Home screen
│   ├── planning/           # Wedding planning screens
│   └── profile/            # User profile screens
│
├── navigation/              # Navigation configuration
│   ├── AppNavigator.js     # Main app navigator
│   ├── AuthNavigator.js    # Authentication navigator
│   └── TabNavigator.js     # Tab navigation
│
├── services/                # API and external services
│   ├── api/                # API client and endpoints
│   ├── auth/               # Authentication service
│   └── storage/            # Local storage service
│
├── utils/                   # Utility functions
│   ├── constants.js        # App constants
│   ├── helpers.js          # Helper functions
│   └── validation.js       # Form validation
│
├── hooks/                   # Custom React hooks
│   ├── useAuth.js          # Authentication hook
│   └── useApi.js           # API hook
│
├── context/                 # React Context providers
│   ├── AuthContext.js      # Authentication context
│   └── AppContext.js       # App-wide context
│
└── styles/                  # Global styles and themes
    ├── colors.js           # Color definitions
    ├── typography.js       # Typography styles
    └── spacing.js          # Spacing constants
```

## 🎯 Component Guidelines

### Component Structure
- Use functional components with hooks
- Keep components focused and single-purpose
- Export components as default exports
- Use proper prop types or TypeScript

### File Naming
- Use PascalCase for component files
- Use camelCase for utility files
- Use kebab-case for asset files

### Import/Export
- Use named imports for utilities
- Use default exports for components
- Group imports: React, third-party, local

## 🚀 Getting Started

1. Create the directory structure above
2. Move existing components to appropriate directories
3. Create new components following the guidelines
4. Update imports as you reorganize

## 📱 Screen Organization

Screens should be organized by feature:
- **Auth**: Login, Register, Forgot Password
- **Home**: Dashboard, Quick Actions
- **Planning**: Timeline, Budget, Guest List
- **Profile**: User Settings, Preferences

## 🔧 Best Practices

- Keep components small and focused
- Use consistent naming conventions
- Implement proper error handling
- Add loading states where appropriate
- Use TypeScript for better type safety
- Implement proper testing structure

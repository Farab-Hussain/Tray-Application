# Tray Mobile App

![Tray Mobile App](https://via.placeholder.com/800x400?text=Tray+Mobile+App)

## Overview

The Tray mobile application is built with React Native, providing a cross-platform solution for both students and consultants. The app enables browsing consultants, booking sessions, real-time chat, video consultations, and profile management.

## Features

### Student Experience
- Browse and search consultants by expertise, ratings, and availability
- View detailed consultant profiles and service offerings
- Book consultation sessions with preferred time slots
- Real-time chat with consultants
- Video consultations through WebRTC
- Manage bookings and payment history
- Leave reviews and ratings after sessions

### Consultant Experience
- Manage professional profile and service offerings
- Set availability through a calendar interface
- Accept or decline booking requests
- Conduct video consultations
- Chat with students
- Track earnings and booking history

## Technology Stack

- **Framework**: React Native
- **Navigation**: React Navigation
- **State Management**: Context API
- **API Integration**: Axios
- **Real-time Communication**: Socket.IO client
- **Video Calls**: WebRTC
- **UI Components**: Custom components with consistent design
- **Form Handling**: Formik with Yup validation

## Getting Started

### Prerequisites
- Node.js (v18+)
- React Native development environment
  - For iOS: Xcode (Mac only)
  - For Android: Android Studio

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd frontend
npm install
```

3. Install iOS dependencies (Mac only):

```bash
bundle install
bundle exec pod install --project-directory=ios
```

### Running the App

#### iOS (Mac only)

```bash
npm run ios
```

#### Android

```bash
npm run android
```

### Development

```bash
# Start Metro bundler
npm start

# Run with specific simulator/emulator
npm run ios -- --simulator="iPhone 14 Pro"
npm run android -- --device="Pixel_4_API_30"
```

## Project Structure

```
frontend/
├── src/
│   ├── api/           # API service integration
│   ├── assets/        # Images, fonts, and other static files
│   ├── components/    # Reusable UI components
│   ├── context/       # React Context for state management
│   ├── hooks/         # Custom React hooks
│   ├── navigation/    # Navigation configuration
│   ├── screens/       # Screen components
│   ├── services/      # Business logic services
│   ├── theme/         # Theme configuration (colors, spacing, etc.)
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── App.tsx            # Application entry point
└── index.js           # React Native entry point
```

## Best Practices

- Use functional components with hooks
- Follow the container/presentational component pattern
- Implement proper error handling and loading states
- Maintain consistent styling through the theme system
- Write meaningful comments and documentation

## Troubleshooting

See the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting) for common issues.

## License

MIT
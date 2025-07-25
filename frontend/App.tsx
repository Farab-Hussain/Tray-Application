import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import RootNavigator, { navigationRef } from './src/navigation/RootNavigator';
// import { initializeDeepLinks } from './src/services/authService';
import { SocketProvider } from './src/services/SocketContext';
import { NotificationProvider } from './src/context/NotificationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from './src/services/authService';

// Create context for userRole
export const UserRoleContext = React.createContext({
  userRole: undefined as string | undefined,
  setUserRole: (_role: string | undefined) => {},
});

function AuthLoader({ children }: { children: React.ReactNode }) {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const setEmail = useUserStore((state: { setEmail: (email: string) => void }) => state.setEmail);

  useEffect(() => {
    const restoreAuth = async () => {
      const token = await AsyncStorage.getItem('auth_token');
      const user = await AsyncStorage.getItem('user');
      if (token && user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.email) {
          setEmail(parsedUser.email);
        }
      }
      setIsAuthReady(true);
    };
    restoreAuth();
  }, [setEmail]);

  if (!isAuthReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#60C169" />
      </View>
    );
  }
  return <>{children}</>;
}

function handleDeepLink(event: { url: string }) {
  if (event.url.startsWith('myapp://consultantHome')) {
    if ((navigationRef as any).isReady()) {
      (navigationRef as any).navigate('ConsultantTabs', {
        screen: 'Menu',
      });
    }
  }
}

export default function App() {
  const [userRole, setUserRole] = useState<string | undefined>(undefined);

  // Initialize deep linking for OAuth
  useEffect(() => {
    Linking.addEventListener('url', handleDeepLink);
    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  return (
    <SocketProvider>
      <NotificationProvider>
        <AuthLoader>
          <UserRoleContext.Provider value={{ userRole, setUserRole }}>
            <View style={styles.container}>
              <NavigationContainer ref={navigationRef}>
                <RootNavigator userRole={userRole} />
              </NavigationContainer>
            </View>
          </UserRoleContext.Provider>
        </AuthLoader>
      </NotificationProvider>
    </SocketProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import RootNavigator, { navigationRef } from './src/navigation/RootNavigator';
import { initializeDeepLinks } from './src/services/authService';

// Create context for userRole
export const UserRoleContext = React.createContext({
  userRole: undefined as string | undefined,
  setUserRole: (_role: string | undefined) => {},
});

export default function App() {
  const [userRole, setUserRole] = useState<string | undefined>(undefined);

  // Initialize deep linking for OAuth
  useEffect(() => {
    // Setup deep link handler
    const unsubscribe = initializeDeepLinks(navigationRef.current);
    
    // Cleanup on unmount
    return unsubscribe;
  }, []);

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      <View style={styles.container}>
        <NavigationContainer ref={navigationRef}>
          <RootNavigator userRole={userRole} />
        </NavigationContainer>
      </View>
    </UserRoleContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
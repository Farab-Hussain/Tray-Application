import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import RootNavigator, { navigationRef } from './src/navigation/RootNavigator';

// Create context for userRole
export const UserRoleContext = React.createContext({
  userRole: undefined as string | undefined,
  setUserRole: (_role: string | undefined) => {},
});

export default function App() {
  const [userRole, setUserRole] = useState<string | undefined>(undefined);

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

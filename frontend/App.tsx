import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import StudentNavigation from './src/navigation/studentNavigation';
import { navigationRef } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <StudentNavigation />
      </NavigationContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

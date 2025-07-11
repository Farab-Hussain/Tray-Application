import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      (navigation as any).navigate('splashScreenTwo');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.img}
      />
    </View>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  img:{
    width: 200,
    height: 140
  }
});
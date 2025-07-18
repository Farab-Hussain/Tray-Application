import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

export default function ConsultantVerificationPending() {
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get('/profile/me');
        if (res.data.isVerified) {
          clearInterval(interval);
          (navigation as any).navigate('Menu');
        }
      } catch (err) {
        // Optionally handle error
      }
    }, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your application is under review. You will be notified once approved!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center' },
  text: { fontSize: 16, textAlign: 'center' }
}); 
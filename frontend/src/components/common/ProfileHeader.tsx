import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const ProfileHeader = ({ title }: { title: String }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>{title}</Text>
      </SafeAreaView>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  safeArea: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  container: {
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#60C169',
    // marginTop:40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

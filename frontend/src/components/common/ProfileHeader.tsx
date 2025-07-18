import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';

interface ProfileHeaderProps {
  title: string;
  userName?: string;
  userImage?: string;
}

const ProfileHeader = ({ title, userName, userImage }: ProfileHeaderProps) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.row}>
          {userImage && (
            <Image source={{ uri: userImage }} style={styles.avatar} />
          )}
          <View style={styles.textContainer}>
            {userName && <Text style={styles.userName}>{userName}</Text>}
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
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
    paddingHorizontal: 10,
  },
  container: {
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#60C169',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#fff',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

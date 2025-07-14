import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { ChevronRight, User } from 'lucide-react-native';
import { MessageCircle, Bell, HelpCircle, LogOut } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/common/Header';
// import { navigationRef } from '../../Navigation/RootNavigation';
const profile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};

const menuItems = [
  {
    key: 'myCart',
    label: 'Check My Cart',
    icon: <User size={22} color="#ADEBB3" />,
  },
  {
    key: 'Conversations',
    label: 'Message',
    icon: <MessageCircle size={22} color="#ADEBB3" />,
  },
  {
    key: 'review',
    label: 'My Consultant',
    icon: <Bell size={22} color="#ADEBB3" />,
  },
  {
    key: 'NotificationScreen',
    label: 'Notifications',
    icon: <Bell size={22} color="#ADEBB3" />,
  },
  {
    key: 'Help',
    label: 'Help & Support',
    icon: <HelpCircle size={22} color="#ADEBB3" />,
  },
  {
    key: 'logout',
    label: 'Logout',
    icon: <LogOut size={22} color="#ADEBB3" />,
  },
];

const Profile = () => {
  const navigation = useNavigation<any>();
  const handlePress = (key: string) => {
    switch (key) {
      case 'myCart':
        navigation.navigate('myCart');
        break;
      case 'Conversations':
        navigation.navigate('Message');
        break;
      case 'review':
        navigation.navigate('Review');
        break;
      case 'NotificationScreen':
        navigation.navigate('Notifications');
        break;
      case 'Help':
        navigation.navigate('Help');
        break;
      case 'logout':
        Alert.alert('Logout', 'Are you sure you want to logout?', [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Yes',
            style: 'destructive',
            onPress: () => navigation.replace('Login'),
          },
        ]);
        break;
      default:
        break;
    }
  };
  const renderItem = ({ item }: { item: (typeof menuItems)[0] }) => (
    <TouchableOpacity
      style={styles.menuRow}
      onPress={() => handlePress(item.key)}
    >
      <View style={styles.menuIconBg}>{item.icon}</View>
      <Text style={styles.menuLabel}>{item.label}</Text>
      <ChevronRight size={20} color="#888" style={styles.menuArrow} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <View style={styles.profileSection}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>
      <View style={styles.menuSection}>
        <FlatList
          data={menuItems}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    color: '#222',
    marginBottom: 4,
  },
  email: {
    fontFamily: 'DM Sans',
    fontWeight: '400',
    fontSize: 14,
    color: '#888',
  },
  menuSection: {
    marginTop: 8,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  menuIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#60C16920', // lighter background
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 16,
    color: '#222',
  },
  menuArrow: {
    fontSize: 18,
    color: '#888',
    marginLeft: 8,
  },
});

export default Profile;

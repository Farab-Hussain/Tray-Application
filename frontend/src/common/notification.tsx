import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import SearchBar from '../components/common/SearchBar';
import Header from '../components/common/Header';

const notifications = [
  {
    id: '1',
    name: 'Dr. Sarah Khan',
    message: 'Appointment Approved',
    time: '10 mins ago',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    name: 'Dr. Bella',
    message: 'Appointment Cancelled',
    time: '1 hour ago',
    image: 'https://randomuser.me/api/portraits/men/47.jpg',
  },
  {
    id: '3',
    name: 'Dr. Ayesha Siliqua',
    message: 'Appointment Rescheduled',
    time: 'Yesterday',
    image: 'https://randomuser.me/api/portraits/women/56.jpg',
  },
];

const Notification = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.notificationCard}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.notificationText}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.messageRow}>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Notifications" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar />
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Notification;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    color: '#374151',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 4,
  },
});

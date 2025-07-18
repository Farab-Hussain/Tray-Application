import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import SearchBar from '../components/common/SearchBar';
import Header from '../components/common/Header';
import { useNotification } from '../context/NotificationContext';

const Notification = () => {
  const { notifications, markAsRead } = useNotification();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => markAsRead(item._id)}>
      <View style={[styles.notificationCard, item.read && { backgroundColor: '#eee' }] }>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View style={styles.notificationText}>
          <Text style={styles.name}>{item.title || item.name}</Text>
          <View style={styles.messageRow}>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{item.time || item.createdAt}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Notifications" />
      <View style={styles.searchContainer}>
        <SearchBar />
      </View>
      <FlatList
        data={notifications}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text>No notifications found.</Text>}
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

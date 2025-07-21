import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../components/common/SearchBar';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/common/Header';

const demoConversations = [
  {
    id: '1',
    name: 'John Deering',
    image: require('../assets/images/consultant.png'),
    lastMessage: 'See you at 2pm!',
    time: '10:30 AM',
    unread: 2,
    email: 'john@example.com',
    role: 'Consultant',
  },
  {
    id: '2',
    name: 'Jane Smith',
    image: require('../assets/images/consultant.png'),
    lastMessage: 'Thank you for your help!',
    time: 'Yesterday',
    unread: 0,
    email: 'jane@example.com',
    role: 'Consultant',
  },
  {
    id: '3',
    name: 'Alex Brown',
    image: require('../assets/images/consultant.png'),
    lastMessage: 'Let me know if you have questions.',
    time: '2 days ago',
    unread: 1,
    email: 'alex@example.com',
    role: 'Consultant',
  },
];

const Conversation = () => {
  const navigation = useNavigation<any>();
  // Remove backend logic
  const chatList = demoConversations;
  return (
    <View style={styles.container}>
      <Header title="Conversations" />
      <SearchBar />
      {/* Optionally add active users here if available from API */}
      <Text style={styles.messagesLabel}>Messages</Text>
      <FlatList
        data={chatList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatRow}
            onPress={() =>
              navigation.navigate('Chart', {
                name: item.name,
                image: item.image,
                role: item.role || 'Senior Consultant',
                email: item.email,
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.chatInfo}>
              <View style={styles.row}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.message}>{item.lastMessage}</Text>
                {item.unread > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Conversation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 12,
    color: '#000',
  },
  activeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  activeAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  chatRow: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  message: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 20,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  messagesLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  flatListContentContainer: {
    paddingBottom: 20,
  },
});

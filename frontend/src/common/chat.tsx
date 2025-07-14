import { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  ChevronLeft,
  Phone,
  Video,
  Smile,
  Camera,
  SendHorizontal,
} from 'lucide-react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useSocket from '../services/useSocket';
import React from 'react';

type StudentStackParamList = {
  VoiceCallScreen: { name: string; image: string; roomId: string };
  VideoCallScreen: { name: string; image: string; roomId: string };
  // ...other screens as needed
};

const Chart = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StudentStackParamList>>();
  const route =
    useRoute<
      RouteProp<
        {
          params: { name: string; image: string; role: string; email?: string };
        },
        'params'
      >
    >();
  const { name, image, role, email: otherUserEmail } = route.params;
  const myUserEmail = null;
  const roomId = [myUserEmail, otherUserEmail].sort().join('_');

  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hi there!',
      sender: 'other',
      timestamp: Date.now() - 60000,
    },
    {
      id: '2',
      text: 'Hello! How can I help you today?',
      sender: 'me',
      timestamp: Date.now() - 59000,
    },
    {
      id: '3',
      text: 'I have a few questions about the course.',
      sender: 'other',
      timestamp: Date.now() - 58000,
    },
    {
      id: '4',
      text: 'Sure, go ahead.',
      sender: 'me',
      timestamp: Date.now() - 57000,
    },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const [typing, setTyping] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    socket.on('receiveMessage', msg => {
      setMessages(prev => [
        ...prev,
        {
          ...msg,
          sender: 'other',
          id: msg.id || Date.now().toString(),
          timestamp: msg.timestamp || Date.now(),
          status: 'sent',
        },
      ]);
      setTyping(false);
    });
    socket.on('typing', () => setTyping(true));
    socket.on('stopTyping', () => setTyping(false));
    return () => {
      socket.off('receiveMessage');
      socket.off('typing');
      socket.off('stopTyping');
    };
  }, [socket]);

  useEffect(() => {
    // Scroll to bottom on new message
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      const msgObj = {
        id: Date.now().toString(),
        text: input,
        sender: 'me',
        timestamp: Date.now(),
        status: 'sending',
      };
      setMessages(prev => [...prev, msgObj]); // Optimistic update
      socket.emit('sendMessage', msgObj);
      setInput('');
      socket.emit('stopTyping');
      // Simulate confirmation after 500ms
      setTimeout(() => {
        setMessages(prev =>
          prev.map(m => (m.id === msgObj.id ? { ...m, status: 'sent' } : m)),
        );
      }, 500);
    }
  };

  // Typing indicator logic
  useEffect(() => {
    if (input) {
      socket.emit('typing');
      const timeout = setTimeout(() => {
        socket.emit('stopTyping');
      }, 1500);
      return () => clearTimeout(timeout);
    } else {
      socket.emit('stopTyping');
    }
  }, [input, socket]);

  const renderMessage = ({ item }: any) => {
    const isMe = item.sender === 'me';
    return (
      <View
        style={[
          styles.messageBubble,
          isMe ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.statusText}>
          {isMe && item.status === 'sending'
            ? 'Sending...'
            : isMe
            ? 'Sent'
            : ''}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
        >
          <ChevronLeft size={26} color="#000" />
        </TouchableOpacity>
        <Image source={{ uri: image }} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userRole}>{role}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              navigation.navigate('VoiceCallScreen', {
                name,
                image,
                roomId,
              })
            }
          >
            <Phone size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              navigation.navigate('VideoCallScreen', {
                name,
                image,
                roomId,
              })
            }
          >
            <Video size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Chat Messages */}
      <FlatList
        ref={
          flatListRef as React.RefObject<
            FlatList<{
              id: string;
              text: string;
              sender: string;
              timestamp: number;
            }>
          >
        }
        data={[...messages].reverse()}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
      />
      inverted={true}
      {/* Typing Indicator */}
      {typing && (
        <View style={{ paddingHorizontal: 16, paddingBottom: 4 }}>
          <Text style={{ color: '#888', fontSize: 12 }}>User is typing...</Text>
        </View>
      )}
      {/* Input Field */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={styles.emojiIcon}
            onPress={() => {
              /* TODO: Show emoji picker */
            }}
          >
            <Smile size={24} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={() => {
              /* TODO: Camera action */
            }}
          >
            <Camera size={24} color="#888" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <SendHorizontal size={22} color="#000" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backIcon: {
    paddingRight: 8,
    borderWidth: 1,
    padding: 6,
    borderRadius: 10,
    marginRight: 10,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  userInfo: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
  userRole: {
    fontSize: 12,
    color: 'gray',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    marginLeft: 10,
  },
  messageList: {
    padding: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#ADEBB3',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 15,
  },
  statusText: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 10,
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  emojiIcon: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    zIndex: 1,
  },
  cameraIcon: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    zIndex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 25,
    paddingLeft: 44,
    paddingRight: 44,
    height: 44,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#ADEBB3',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  sendText: {
    fontWeight: '600',
    color: '#000',
  },
  inputIcon: {
    marginHorizontal: 6,
  },
});

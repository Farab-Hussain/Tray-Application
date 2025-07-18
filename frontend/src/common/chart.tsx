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
  SafeAreaView, // <-- add this import
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
import { useSocket } from '../services/SocketContext';
import { sendMessageAPI } from '../services/chatService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

type StudentStackParamList = {
  VoiceCallScreen: { name: string; image: string; roomId: string };
  VideoCallScreen: { name: string; image: string; roomId: string };
  call: { name: string; image: string; roomId: string };
  VideoCall: { name: string; image: string; roomId: string };
  // ...other screens as needed
};

const Chart = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StudentStackParamList>>();
  const route = useRoute<
    RouteProp<
      {
        params: { name: string; image: string; role: string; email?: string };
      },
      'params'
    >
  >();
  const { name, image, role, email: otherUserEmail } = route.params;
  const [myUserEmail, setMyUserEmail] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const [typing, setTyping] = useState(false);
  const [isTypingLocal, setIsTypingLocal] = useState(false);
  const { socket } = useSocket();

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) setMyUserEmail(JSON.parse(user).email);
    });
  }, []);

  const roomId = [myUserEmail, otherUserEmail].sort().join('_');

  useEffect(() => {
    if (roomId && myUserEmail) {
      api.get(`/messages?roomId=${roomId}`).then(res => setMessages(res.data)).catch(() => setMessages([]));
    }
  }, [roomId, myUserEmail]);

  useEffect(() => {
    if (!socket) return;

    // Receive new message
    const handleReceiveMessage = (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    };
    socket.on('receiveMessage', handleReceiveMessage);

    // Message delivered confirmation
    const handleDelivered = (messageId: string) => {
      setMessages((prev) =>
        prev.map((msg) =>
          (msg.id === messageId || msg._id === messageId)
            ? { ...msg, status: 'delivered' } : msg
        )
      );
    };
    socket.on('messageDelivered', handleDelivered);

    // Message read receipt
    const handleRead = ({ messageId, reader }: { messageId: string; reader: string }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          (msg.id === messageId || msg._id === messageId)
            ? { ...msg, readBy: [...(msg.readBy || []), reader] } : msg
        )
      );
    };
    socket.on('messageRead', handleRead);

    // Typing
    socket.on('typing', () => setTyping(true));
    socket.on('stopTyping', () => setTyping(false));

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
      socket.off('messageDelivered', handleDelivered);
      socket.off('messageRead', handleRead);
      socket.off('typing');
      socket.off('stopTyping');
    };
  }, [socket]);

  useEffect(() => {
    if (socket && roomId) {
      socket.emit('joinRoom', roomId);
    }
  }, [socket, roomId]);

  useEffect(() => {
    // Scroll to bottom on new message
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Listen for delivery and read receipts
  useEffect(() => {
    if (!socket) return;
    const handleDelivered = (messageId: string) => {
      // Optionally update UI to show message delivered
      setMessages(prev => prev.map(m => (m._id === messageId ? { ...m, delivered: true } : m)));
    };
    const handleRead = ({ messageId, reader }: { messageId: string; reader: string }) => {
      setMessages(prev => prev.map(m =>
        m._id === messageId && !m.readBy?.includes(reader)
          ? { ...m, readBy: [...(m.readBy || []), reader] }
          : m
      ));
    };
    socket.on('messageDelivered', handleDelivered);
    socket.on('messageRead', handleRead);
    return () => {
      socket.off('messageDelivered', handleDelivered);
      socket.off('messageRead', handleRead);
    };
  }, [socket]);

  // Emit markAsRead for unread messages from others after messages update
  useEffect(() => {
    if (socket && messages.length && myUserEmail) {
      messages.forEach(item => {
        if (item.sender !== 'me' && !(item.readBy || []).includes(myUserEmail)) {
          socket.emit('markAsRead', { messageId: item.id || item._id, reader: myUserEmail });
        }
      });
    }
  }, [messages, socket, myUserEmail]);

  const sendMessage = async () => {
    if (input.trim() && myUserEmail) {
      const msgObj = {
        id: Date.now().toString(),
        text: input,
        sender: myUserEmail,
        timestamp: Date.now(),
        status: 'sending',
        roomId,
      };
      setMessages(prev => [...prev, msgObj]);
      if (socket) {
        socket.emit('sendMessage', msgObj);
      }
      await sendMessageAPI(roomId, input, myUserEmail);
      setInput('');
      setIsTypingLocal(false);
      if (socket) socket.emit('stopTyping', roomId);
    }
  };

  // Typing indicator logic
  useEffect(() => {
    if (input) {
      setIsTypingLocal(true);
      socket?.emit('typing', roomId);
      const timeout = setTimeout(() => {
        setIsTypingLocal(false);
        socket?.emit('stopTyping', roomId);
      }, 1500);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingLocal(false);
      socket?.emit('stopTyping', roomId);
    }
  }, [input, socket, roomId]);

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
            : isMe && item.status === 'delivered'
            ? 'Delivered'
            : isMe && item.readBy && item.readBy.length > 1
            ? 'Read'
            : isMe
            ? 'Sent'
            : ''}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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
                navigation.navigate('call', {
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
                navigation.navigate('VideoCall', {
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
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
          inverted={true}
        />
        {/* Typing Indicator */}
        {typing && (
          <View style={{ paddingHorizontal: 16, paddingBottom: 4 }}>
            <Text style={{ color: '#888', fontSize: 12 }}>
              User is typing...
            </Text>
          </View>
        )}
        {isTypingLocal && (
          <View style={{ paddingHorizontal: 16, paddingBottom: 4 }}>
            <Text style={{ color: '#888', fontSize: 12 }}>
              You are typing...
            </Text>
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
    </SafeAreaView>
  );
};

export default Chart;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
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

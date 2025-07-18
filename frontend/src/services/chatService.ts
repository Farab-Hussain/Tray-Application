import api from './api';
import { API_BASE_URL } from './config';

export const getChatList = async (userEmail: string) => {
  const response = await api.get('/chats', {
    params: { userEmail },
  });
  return response.data;
};

export const getMessagesByRoomId = async (roomId: string) => {
  const response = await api.get('/messages', {
    params: { roomId },
  });
  return response.data;
};

export const sendMessageAPI = async (roomId: string, message: string, sender: string) => {
  const response = await api.post('/messages', {
    roomId,
    text: message,
    sender,
  });
  return response.data;
}; 
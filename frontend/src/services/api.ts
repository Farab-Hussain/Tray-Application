import axios from 'axios';
import { API_BASE_URL } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Attach token to every request if available
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const updateConsultantServices = async (serviceIds: string[]) => {
  const res = await api.put('/profile/services', { serviceIds });
  return res.data;
};

export const getMyProfile = async () => {
  const res = await api.get('/profile');
  return res.data;
};

export const getConsultantApprovedServices = async () => {
  const profile = await getMyProfile();
  // Assuming profile.services is an array of approved service objects or IDs
  return profile.services || [];
};

export const createService = async (service: { name: string; description: string; image: string }) => {
  const res = await api.post('/services', service);
  return res.data;
};

export const getAllServices = async () => {
  const res = await api.get('/api/services');
  return res.data;
};

export const getConsultantServices = async (consultantId: string) => {
  const res = await api.get(`/api/users/consultants/${consultantId}/services`);
  return res.data;
};

export const getAllConsultants = async () => {
  const res = await api.get('/api/users/consultants');
  return res.data;
};

export const getUserProfile = async (userId: string) => {
  const res = await api.get(`/api/users/${userId}`); // or your actual endpoint
  return res.data;
};

// Student Slot APIs

/**
 * Get available slots for a consultant and service
 * @param consultantId string
 * @param serviceId string
 * @returns Promise<any[]>
 */
export const getAvailableSlots = async (consultantId: string, serviceId: string) => {
  const res = await api.get(`/api/slots/available/${consultantId}/${serviceId}`);
  return res.data;
};

/**
 * Book a specific slot
 * @param slotId string
 * @param studentId string
 * @returns Promise<any>
 */
export const bookSlot = async (slotId: string, studentId: string) => {
  // Assuming backend expects slotId and studentId in the body
  const res = await api.post('/api/slots/book', { slotId, studentId });
  return res.data;
};

/**
 * Get bookings for a student
 * @param studentId string
 * @returns Promise<any[]>
 */
export const getMyBookings = async (studentId: string) => {
  const res = await api.get(`/api/slots/my-bookings/${studentId}`);
  return res.data;
}; 
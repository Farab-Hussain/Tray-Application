import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import axios from 'axios';
import { API_BASE_URL } from './config';

// Token storage keys
const AUTH_TOKEN_KEY = 'auth_token';
const USER_ID_KEY = 'user_id';

/**
 * Initialize deep linking for OAuth callbacks
 * @param navigation - Navigation object to handle redirects after OAuth
 */
export const initializeDeepLinks = (navigation: any) => {
  if (!navigation) {
    console.error('Navigation object is undefined in initializeDeepLinks');
    return;
  }
  // Handle deep links when the app is already open
  const handleUrl = ({ url }: { url: string }) => {
    handleDeepLink(url, navigation);
  };

  // Set up event listener for deep links
  Linking.addEventListener('url', handleUrl);

  // Check for initial URL (app opened via deep link)
  Linking.getInitialURL().then((url) => {
    if (url) {
      handleDeepLink(url, navigation);
    }
  });

  // Return cleanup function
  return () => {
    Linking.removeAllListeners('url');
  };
};

/**
 * Handle deep link URLs for OAuth callbacks
 * @param url - The deep link URL
 * @param navigation - Navigation object
 */
const handleDeepLink = (url: string, navigation: any) => {
  if (!url) return;

  // Parse the URL
  const parsedUrl = new URL(url);
  
  // Check if this is an auth callback
  if (parsedUrl.pathname.includes('/auth/callback')) {
    // Extract token and userId from URL parameters
    const params = new URLSearchParams(parsedUrl.search);
    const token = params.get('token');
    const userId = params.get('userId');

    if (token && userId) {
      // Store authentication data
      storeAuthData(token, userId);
      
      // Navigate to the main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'StudentTabs' }],
      });
    }
  } else if (parsedUrl.pathname.includes('/auth/error')) {
    // Handle authentication error
    navigation.navigate('login', { 
      error: 'Authentication failed. Please try again.' 
    });
  }
};

/**
 * Store authentication data in AsyncStorage
 * @param token - JWT token
 * @param userId - User ID
 */
export const storeAuthData = async (token: string, userId: string) => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_ID_KEY, userId);
    return true;
  } catch (error) {
    console.error('Error storing auth data:', error);
    return false;
  }
};

/**
 * Get stored authentication token
 */
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Get stored user ID
 */
export const getUserId = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(USER_ID_KEY);
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
};

/**
 * Clear authentication data (logout)
 */
export const clearAuthData = async (): Promise<boolean> => {
  try {
    await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_ID_KEY]);
    return true;
  } catch (error) {
    console.error('Error clearing auth data:', error);
    return false;
  }
};

export const login = async (email: string, password: string) => {
  const response = await api.post('/api/auth/login', { email, password });
  const { token, userId } = response.data;
  await storeAuthData(token, userId);
  return response.data;
};

export const register = async (userData: any) => {
  const response = await api.post('/api/auth/signup', userData);
  return response.data;
};

export const signup = async (userData: any) => {
  // Alias for register
  return register(userData);
};

export const forgotPassword = async (email: string) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async (email: string, otp: string, newPassword: string) => {
  const response = await api.post('/api/auth/reset-password', { email, otp, newPassword });
  return response.data;
};

export const googleLogin = async (idToken: string) => {
  const response = await api.post('/api/auth/google-login', { idToken });
  return response.data;
};

export const facebookLogin = async (accessToken: string, userID: string) => {
  const response = await api.post('/api/auth/facebook-login', { accessToken, userID });
  return response.data;
};

export const appleLogin = async (identityToken: string) => {
  const response = await api.post('/api/auth/apple-login', { identityToken });
  return response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, {
    email,
    otp,
  });
  return response.data;
};
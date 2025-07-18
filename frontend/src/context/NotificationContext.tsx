import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSocket } from '../services/SocketContext';

type Notification = {
  _id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};

type NotificationContextType = {
  notifications: Notification[];
  markAsRead: (notificationId: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on('newNotification', (notification: Notification) => {
      setNotifications(prev => [notification, ...prev]);
    });
    return () => {
      socket.off('newNotification');
    };
  }, [socket]);

  const markAsRead = (notificationId: string) => {
    if (socket) {
      socket.emit('markNotificationAsRead', { notificationId });
    }
    setNotifications(prev =>
      prev.map(n => (n._id === notificationId ? { ...n, read: true } : n))
    );
  };

  return (
    <NotificationContext.Provider value={{ notifications, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
}; 
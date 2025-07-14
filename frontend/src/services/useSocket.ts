import { useEffect } from 'react';
import socket from './socket';

const useSocket = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, []);
  return socket;
};

export default useSocket;

import { io } from 'socket.io-client';

const socket = io('192.168.110.56'); // 👈 Change to your IP when testing on real device

export default socket;

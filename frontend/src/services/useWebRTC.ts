// src/hooks/useWebRTC.ts
import { useEffect, useRef, useState, useCallback } from 'react';
import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  mediaDevices,
} from 'react-native-webrtc';
import io from 'socket.io-client';
import { SOCKET_URL } from './config';

const SIGNALING_SERVER = SOCKET_URL;

export const useWebRTC = (roomId: string) => {
  const [localStream, setLocalStream] = useState<any>(null);
  const [remoteStream, setRemoteStream] = useState<any>(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const socketRef = useRef<any>(null);
  const pcRef = useRef<any>(null);
  const videoTrackRef = useRef<any>(null);

  const enableVideo = useCallback(
    async (remote = false) => {
      if (!localStream) return;
      if (videoTrackRef.current) return;
      const videoStream = await mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      const videoTrack = videoStream.getVideoTracks()[0];
      if (videoTrack) {
        localStream.addTrack(videoTrack);
        pcRef.current.addTrack(videoTrack, localStream);
        videoTrackRef.current = videoTrack;
        setLocalStream(localStream.clone()); // force re-render
        setVideoEnabled(true);
        if (!remote) socketRef.current.emit('video-on', { to: roomId });
      }
    },
    [localStream, roomId],
  );

  const disableVideo = useCallback(
    (remote = false) => {
      if (!localStream || !videoTrackRef.current) return;
      localStream.removeTrack(videoTrackRef.current);
      const senders = pcRef.current.getSenders();
      const videoSender = senders.find(
        (s: any) => s.track && s.track.kind === 'video',
      );
      if (videoSender) pcRef.current.removeTrack(videoSender);
      videoTrackRef.current.stop();
      videoTrackRef.current = null;
      setLocalStream(localStream.clone()); // force re-render
      setVideoEnabled(false);
      if (!remote) socketRef.current.emit('video-off', { to: roomId });
    },
    [localStream, roomId],
  );

  useEffect(() => {
    console.log('useWebRTC mounted', roomId);
    const socket = io(SIGNALING_SERVER);
    socketRef.current = socket;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    pcRef.current = pc;

    socket.emit('join', roomId);

    mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        stream.getTracks().forEach((track: any) => pc.addTrack(track, stream));
      });

    socket.on('offer', async ({ from, offer }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('answer', { to: from, answer });
    });

    socket.on('answer', async ({ answer }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on('ice-candidate', async ({ candidate }) => {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (err) {
        console.error('Error adding received ICE candidate', err);
      }
    });

    // Video signaling
    socket.on('video-on', async () => {
      await enableVideo(true); // true = remote trigger
    });
    socket.on('video-off', async () => {
      disableVideo(true); // true = remote trigger
    });

    (pc as any).onicecandidate = (event: any) => {
      if (event.candidate) {
        socket.emit('ice-candidate', {
          to: roomId,
          candidate: event.candidate,
        });
      }
    };

    (pc as any).ontrack = (event: any) => {
      setRemoteStream(event.streams[0]);
    };

    return () => {
      console.log('useWebRTC unmounted', roomId);
      pc.close();
      socket.disconnect();
    };
  }, [disableVideo, enableVideo, roomId]);

  const startCall = async () => {
    const offer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(offer);
    socketRef.current.emit('offer', { to: roomId, offer });
  };

  return {
    localStream,
    remoteStream,
    startCall,
    enableVideo,
    disableVideo,
    videoEnabled,
  };
};

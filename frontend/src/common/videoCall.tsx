import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { PhoneOff, Video, Volume2, MicOff } from 'lucide-react-native';
import { RTCView } from 'react-native-webrtc';
import { useWebRTC } from '../services/useWebRTC';

const VideoCall = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: { name: string; image: string; roomId?: string } }, 'params'>>();
  const { name, roomId } = route.params;
  const { localStream, remoteStream, startCall, enableVideo, disableVideo, videoEnabled } = useWebRTC(roomId || name);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Start the call and enable video on mount
    startCall();
    enableVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        setIsMuted(!audioTracks[0].enabled);
      }
    }
  }, [localStream]);

  const handleEndCall = () => {
    navigation.goBack();
  };

  const handleMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        const currentlyEnabled = audioTracks[0].enabled;
        audioTracks.forEach((track: any) => {
          track.enabled = !currentlyEnabled;
        });
        setIsMuted(!audioTracks[0].enabled);
      }
    }
  };

  const handleVideoToggle = async () => {
    if (!videoEnabled) {
      await enableVideo();
    } else {
      disableVideo();
    }
  };

  return (
    <View style={styles.container}>
      {/* Remote Video */}
      {remoteStream ? (
        <RTCView
          streamURL={remoteStream.toURL()}
          style={styles.remoteVideo}
          objectFit="cover"
        />
      ) : (
        <View style={styles.remoteVideoPlaceholder} />
      )}
      {/* Local Video (PIP) */}
      {localStream && (
        <RTCView
          streamURL={localStream.toURL()}
          style={styles.localVideo}
          objectFit="cover"
        />
      )}
      {/* Controls */}
      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.whiteButton} onPress={handleVideoToggle}>
          <Video size={28} color={videoEnabled ? '#EF4444' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.redButton} onPress={handleEndCall}>
          <PhoneOff size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.whiteButton} onPress={handleMute}>
          {isMuted ? <MicOff size={28} color="#EF4444" /> : <Volume2 size={28} color="black" />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoCall;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
  remoteVideo: { flex: 1, alignSelf: 'stretch' },
  remoteVideoPlaceholder: { flex: 1, alignSelf: 'stretch', backgroundColor: '#1E293B' },
  localVideo: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    width: 100,
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    borderColor: 'white',
    borderWidth: 2,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  whiteButton: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  redButton: {
    backgroundColor: '#EF4444',
    padding: 22,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});
  
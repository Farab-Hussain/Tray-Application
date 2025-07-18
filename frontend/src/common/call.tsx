import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Button } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { PhoneOff, Video, Volume2, MicOff } from 'lucide-react-native';
import { RTCView } from 'react-native-webrtc';
import { useWebRTC } from '../services/useWebRTC';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const Call = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: { name: string; image: string; roomId?: string } }, 'params'>>();
  const { name, image, roomId } = route.params;
  const { localStream, remoteStream, startCall, enableVideo, disableVideo, videoEnabled } = useWebRTC(roomId || name);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    console.log('CallScreen mounted');
    return () => {
      console.log('CallScreen unmounted');
    };
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

  const handleVideoCall = async () => {
    if (!videoEnabled) {
      await enableVideo();
    } else {
      disableVideo();
    }
  };

  // Video UI
  if (videoEnabled && localStream) {
    return (
      <View style={styles.container}>
        {remoteStream ? (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.remoteVideo}
            objectFit="cover"
          />
        ) : (
          <View style={styles.remoteVideoPlaceholder} />
        )}
        <RTCView
          streamURL={localStream.toURL()}
          style={styles.localVideo}
          objectFit="cover"
        />
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.whiteButton} onPress={handleVideoCall}>
            {/* Show camera-off icon if video is enabled */}
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
  }

  // Voice call UI
  return (
    <LinearGradient colors={["#60C169", "#187D22"]} style={styles.voiceContainer}>
      <Image source={{ uri: image }} style={styles.profileImage} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.status}>Ringing...</Text>
      <Text style={styles.indicator}>
        {localStream ? 'Mic Ready' : 'No Mic'} | {remoteStream ? 'Connected' : 'Waiting for peer...'}
      </Text>
      <View style={styles.spacer80} />
      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.whiteButton} onPress={handleVideoCall}>
          <Video size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.redButton} onPress={handleEndCall}>
          <PhoneOff size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.whiteButton} onPress={handleMute}>
          {isMuted ? <MicOff size={28} color="#EF4444" /> : <Volume2 size={28} color="black" />}
        </TouchableOpacity>
      </View>
      <Button title="Start Call" onPress={startCall} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
  voiceContainer: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
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
  redButton: {
    backgroundColor: '#EF4444',
    padding: 22,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  whiteButton: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
    marginBottom: 24,
    marginTop: 24,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  status: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 4,
  },
  indicator: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 8,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  spacer80: { height: 80 },
});

export default Call; 
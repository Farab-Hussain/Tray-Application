import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const TopCard = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.box}>
      {/* Left Side */}
      <View style={styles.leftSide}>
        <Image
          source={require('../../assets/images/tray.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Tray</Text>
        <Text style={styles.subheading}>Top Consultant</Text>
        <Button
          title="Book now"
          onPress={() => {
            navigation.navigate('services' as never);
          }}
          customStyle={styles.topBtn}
          textStyle={styles.topBtnText}
        />
        <View style={styles.socialRow}>
          <View style={styles.socialIcon} />
          <View style={styles.socialIcon} />
          <View style={styles.socialIcon} />
        </View>
      </View>
      {/* Right Side */}
      <View style={styles.rightSide}>
        <View style={styles.badgeContainer}>
          <Image
            source={require('../../assets/images/Badge.png')}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.para}>
          Expert in business strategy and growth. 10+ years experience.
        </Text>
        <View style={styles.ratingRow}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.star}>★</Text>
          <Text style={styles.star}>★</Text>
          <Text style={styles.star}>★</Text>
          <Text style={styles.star}>★</Text>
          <Text style={styles.ratingText}>5</Text>
        </View>
      </View>
    </View>
  );
};

export default TopCard;

const CARD_HEIGHT = Math.max(260, height * 0.18);
const AVATAR_SIZE = Math.max(80, width * 0.18);

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: CARD_HEIGHT,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    flexDirection: 'row',
    padding: Math.max(12, width * 0.03),
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  leftSide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginBottom: 6,
  },
  name: {
    fontWeight: 'bold',
    fontSize: Math.max(16, width * 0.045),
    marginBottom: 0,
    textAlign: 'center',
    color: '#222',
  },
  subheading: {
    fontWeight: '500',
    fontSize: Math.max(13, width * 0.035),
    color: '#7E7D7D',
    marginBottom: 4,
    textAlign: 'center',
  },
  topBtn: {
    backgroundColor: '#FFCB4B',
    borderRadius: 8,
    paddingVertical: 0,
    paddingHorizontal: 1,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
    height: 30,
    minHeight: 20,
  },
  topBtnText: {
    fontWeight: '600',
    color: '#000',
    fontSize: Math.max(11, width * 0.028),
    lineHeight: Math.max(14, width * 0.03),
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2,
  },
  socialIcon: {
    width: Math.max(26, width * 0.06),
    height: Math.max(26, width * 0.06),
    borderRadius: Math.max(13, width * 0.03),
    backgroundColor: '#eee',
    marginHorizontal: 2,
  },
  rightSide: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
    alignSelf: 'center',
  },
  badge: {
    backgroundColor: '#FFCB4B',
    color: '#000',
    fontWeight: 'bold',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: Math.max(13, width * 0.035),
    overflow: 'hidden',
    textAlign: 'center',
  },
  para: {
    marginTop: 24,
    fontSize: Math.max(14, width * 0.037),
    color: '#333',
    textAlign: 'left',
    maxWidth: '100%',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
    gap: 1,
  },
  star: {
    color: '#FFD700',
    fontSize: Math.max(18, width * 0.05),
  },
  ratingText: {
    fontWeight: 'bold',
    fontSize: Math.max(15, width * 0.04),
    color: '#000',
  },
});

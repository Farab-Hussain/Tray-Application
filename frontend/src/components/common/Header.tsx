import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SPACING } from '../../theme/spacing';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { getMyProfile } from '../../services/api';
import { UserRoleContext } from '../../../App';

const DEMO_IMAGE = require('../../assets/images/consultant.png');

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState<any>(null);
  const { userRole } = useContext(UserRoleContext);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch (err) {
        setProfile(null);
      }
    })();
  }, [userRole]); // Re-fetch profile when userRole changes

  // If consultant is logged in, show name left, image right
  if (profile && profile.role === 'consultant') {
    return (
      <View>
        <SafeAreaView>
          <View style={styles.box}>
            <TouchableOpacity
              style={styles.iconLeft}
              onPress={() => navigation.goBack()}
            >
              <ChevronLeft />
            </TouchableOpacity>
            <Text style={styles.consultantName}>{profile.name}</Text>
            <View style={styles.imageRight}>
              <Image
                source={profile.profileImage ? { uri: profile.profileImage } : DEMO_IMAGE}
                style={styles.profileImage}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  // Default header
  return (
    <View>
      <SafeAreaView>
        <View style={styles.box}>
          <TouchableOpacity
            style={styles.iconLeft}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  box: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: SPACING.horizontal,
  },
  iconLeft: {
    position: 'absolute',
    left: SPACING.horizontal,
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    paddingLeft: 40,
  },
  consultantName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1,
    marginLeft: 40,
  },
  imageRight: {
    position: 'absolute',
    right: SPACING.horizontal,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f0f0f0',
  },
});

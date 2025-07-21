import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MessageCircle, Phone, Video } from 'lucide-react-native';
import Button from './Button';
import { useNavigation} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
// Define the navigation param list for your stack
// Use lowercase 'services' to match the route name
type RootStackParamList = {
  services: { consultantId: string };
  // ... other routes
};

interface ConsultantCardProps {
  name: string;
  role: string;
  rating: number;
  image?: string;
  consultantId: string;
}

const RecommendedCard: React.FC<ConsultantCardProps> = ({
  name,
  role,
  rating,
  image,
  consultantId,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.card}>
      <Image
        source={
          image ? { uri: image } : require('../../assets/images/consultant.png')
        }
        style={styles.avatar}
      />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>{role}</Text>
      <Button
        title="Book now"
        onPress={() => {
          navigation.navigate('services', { consultantId });
        }}
        customStyle={styles.bookBtn}
        textStyle={styles.bookBtnText}
      />
      <View style={styles.iconRow}>
        <View style={styles.iconWrapper}>
          <MessageCircle style={styles.icon} size={18} color="#187D22" />
        </View>
        <View style={styles.iconWrapper}>
          <Phone style={styles.icon} size={18} color="#187D22" />
        </View>
        <View style={styles.iconWrapper}>
          <Video style={styles.icon} size={18} color="#187D22" />
        </View>
      </View>
      <View style={styles.ratingRow}>
        <Text style={styles.star}>★</Text>
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    </View>
  );
};

export default RecommendedCard;

const styles = StyleSheet.create({
  card: {
    height: 240,
    width: 165, // Increased from 152 to 180
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 8,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    marginTop: 2,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#7E7D7D',
    textAlign: 'center',
    marginBottom: 0, // Remove space below subtitle
  },
  bookBtn: {
    height: 28,
    minHeight: 18,
    borderRadius: 8,
    backgroundColor: '#FFCB4B',
    alignSelf: 'center',
    marginVertical: 0, // Reduced vertical margin
    // paddingHorizontal: 8,
    paddingVertical: 0,
    marginTop: 10, // Remove space above button
  },
  bookBtnText: {
    fontSize: 11,
    color: '#000',
    fontWeight: '600',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 2,
    gap: 8,
  },
  iconWrapper: {
    borderWidth: 1.5,
    borderColor: '#187D22',
    borderRadius: 20,
    padding: 4,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    marginHorizontal: 0,
    color: '#187D22',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  star: {
    color: '#FFD700',
    fontSize: 15,
    marginRight: 2,
  },
  ratingText: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#000',
  },
});
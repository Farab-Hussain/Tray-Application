import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  selectSlot: { consultantId: string; serviceId: string };
  // ...other routes
};

interface ServicesCardProps {
  name: string;
  desc: string;
  image?: string;
  consultantId: string;
  serviceId: string;
}

const ServicesCard: React.FC<ServicesCardProps> = ({ name, desc, image, consultantId, serviceId }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.box}>
      <Image
        source={image ? image : require('../../assets/images/services.png')}
        style={styles.avatar}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.desc}>{desc}</Text>
      <Button
        title={'Book Now'}
        onPress={() => navigation.navigate('selectSlot', { consultantId, serviceId })}
        customStyle={styles.btn}
        textStyle={styles.btnText}
      />
    </View>
  );
};

export default ServicesCard;

const styles = StyleSheet.create({
  box: {
    width: 175,
    height: 230,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
    margin: 2,
  },
  avatar: {
    width: '100%',
    height: 70,
    marginBottom: 8,
    marginTop: 8,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  name: {
    fontSize: 15,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 2,
    alignSelf: 'flex-start',
  },
  desc: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#7E7D7D',
    // textAlign: 'center',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  btn: {
    backgroundColor: '#FFCB4B',
    height: 37,
    marginTop: 8,
  },
  btnText: {
    color: '#000',
  },
});

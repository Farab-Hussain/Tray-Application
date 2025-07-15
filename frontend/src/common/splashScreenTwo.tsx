import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { UserRoleContext } from '../../App';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const { setUserRole } = useContext(UserRoleContext);
  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
      <Image source={require('../assets/images/logo.png')} style={styles.img} />
      <View style={styles.box}>
        <Text style={styles.title}>Let’s get started</Text>
        <View style={styles.buttonGroup}>
          <Button
            title="Pick a Consultant"
            onPress={() => navigation.navigate('profile' as never)}
            customStyle={StyleSheet.flatten([styles.btnYellow])}
            textStyle={styles.btnTextBlack}
          />
          <Button
            title="REGISTER AS CONSULTANT"
            onPress={() => setUserRole('consultant')}
            customStyle={StyleSheet.flatten([
              styles.btnBlack,
              styles.buttonSpacing,
            ])}
            textStyle={styles.btnTextWhite}
          />
          <Button
            title="Register"
            customStyle={StyleSheet.flatten([
              styles.btnYellow,
              styles.buttonSpacing,
            ])}
            onPress={() => navigation.navigate('register' as never)}
            textStyle={styles.btnTextBlack}
          />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  img: {
    width: 200,
    height: 140,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  box: {
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
    padding: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnYellow: {
    backgroundColor: '#FFCB4B',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnBlack: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnTextBlack: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    includeFontPadding: false,
  },
  btnTextWhite: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    includeFontPadding: false,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  buttonSpacing: {
    marginTop: 8,
  },
});

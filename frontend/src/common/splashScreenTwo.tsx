import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<any>();
    navigation.navigate('register');

  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.img}
      />
      <View style={styles.box}>
        <Text style={styles.title}>Let’s get started</Text>
        <TouchableOpacity style={styles.btn} onPress={()=>{
            navigation.navigate('register');
        }}>
            <Text style={styles.btnText}>Pick a Consultant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn1}>
            <Text style={styles.btnText}>REGISTER AS CONSULTANT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>{
            navigation.navigate('register');
        }}>
            <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
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
  img:{
    width: 200,
    height: 140
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  box:{
    width: '100%',
    height: '30%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    borderRadius:20,
    padding: 30,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btn:{
    minHeight:48,
    width:320,
    backgroundColor:'#FFCB4B',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    paddingHorizontal:16,
    paddingVertical:8
  },
  btn1:{
    minHeight:48,
    width:320,
    backgroundColor:'#000',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    paddingHorizontal:16,
    paddingVertical:8
  },
  btnText:{
    color:'#fff',
    fontSize:16,
    fontWeight:'bold',
    textTransform:'uppercase',
    textAlign:'center',
    includeFontPadding:false
  }
});
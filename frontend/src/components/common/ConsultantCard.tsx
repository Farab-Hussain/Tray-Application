import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Button from './Button';

interface ConsultantCardProps {
  name?: string;
  service?: string;
}

const ConsultantCard: React.FC<ConsultantCardProps> = ({
  name = 'Williams Joe',
  service = 'Adjudication Prep',
}) => {
  return (
    <View style={styles.box}>
      <View style={styles.row}>
        <Image
          source={require('../../assets/images/consultant.png')}
          style={styles.avatar}
        />
        <Text style={styles.label}>Matched</Text>
      </View>
      <Text style={styles.heading}>Client Name</Text>
      <Text style={styles.subheading}>{name}</Text>
      <Text style={styles.heading}>Service Needed</Text>
      <Text style={styles.subheading}>{service}</Text>
      <Button title={'Accept Request'} onPress={() => {}} textStyle={styles.btnText} customStyle={styles.btn} />
      <Button title={'Decline'} onPress={() => {}} textStyle={styles.btnTextDecline} customStyle={styles.btnDecline} />
    </View>
  );
};

export default ConsultantCard;

const styles = StyleSheet.create({
  box: {
    height: 240,
    width: 165,
    backgroundColor: '#fff',
    flex: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 8,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 4,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  label: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#187D22',
    textAlign: 'center',
    backgroundColor: '#ADEBB3',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  heading: {
    fontSize: 11,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  subheading: {
    fontSize: 10,
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 10,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 2,
  },
  btn: {
    backgroundColor: '#FFCB4B',
    height: 32,
    width: '90%',
    marginTop: 6,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
  },
  btnText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  btnDecline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E64646',
    height: 32,
    width: '90%',
    marginTop: 4,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
  },
  btnTextDecline: {
    color: '#E64646',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});

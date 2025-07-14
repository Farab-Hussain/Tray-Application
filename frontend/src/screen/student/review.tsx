import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/common/Header';
import { TextInput } from 'react-native';
// import { ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const Review = () => {
  const [recommend, setRecommend] = useState<'yes' | 'no' | null>(null);
  return (
    <KeyboardAvoidingView
      style={styles.full}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header title={'Review'} />
      <SafeAreaView style={styles.main}>
        <Image
          source={require('../../assets/images/review.png')}
          style={styles.avatar}
        />
        <Text style={styles.title}>
          How was your experience with Alex Zender?
        </Text>
        <View style={styles.ratingRow}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.star}>★</Text>
          <Text style={styles.star}>★</Text>
          <Text style={styles.star}>★</Text>
          <Text style={styles.star}>★</Text>
        </View>
        <Text style={styles.heading}>Write your review</Text>
        <View style={styles.inputWrapper}>
          <TextInput placeholder="Add your review here"  />
        </View>
        <Text style={styles.heading}>
          Would you recommend Dr. Alex Zender to your friends?
        </Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity style={styles.radioOption} onPress={() => setRecommend('yes')}>
          <View style={recommend === 'yes' ? styles.radioCircleSelected : styles.radioCircle} />
          <Text style={styles.radioLabel}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.radioOption} onPress={() => setRecommend('no')}>
          <View style={recommend === 'no' ? styles.radioCircleSelected : styles.radioCircle} />
          <Text style={styles.radioLabel}>No</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Review;

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  avatar: {
    width: 100,
    height: 100,
  },
  title: {
    paddingVertical: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    width: '50%',
    textAlign: 'center',
    lineHeight: 24,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  star: {
    color: '#FFD700',
    fontSize: Math.max(18, width * 0.05),
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    width: '70%',
    alignSelf: 'flex-start',
    lineHeight: 24,
    marginTop: 20,
  },
  inputWrapper: {
    width: '100%',
    height: 200,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  radioGroup:{
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: 'transparent',
  },
  radioCircleSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  menuRowSelected: {
    backgroundColor: '#ADEBB3', // or any color to indicate selection
  },
  menuIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  menuArrow: {
    marginLeft: 10,
  },
});

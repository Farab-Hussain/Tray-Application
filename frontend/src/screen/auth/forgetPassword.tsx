import React, { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/common/Header';
import AuthFooter from '../../components/auth/AuthFooter';
import Button from '../../components/auth/Button';

const { width, height } = Dimensions.get('window');
const SPACING = Math.max(16, width * 0.04);

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleSendOtp = () => navigation.navigate('OTPScreen' as never);

  return (
    <KeyboardAvoidingView
      style={styles.flexFullWhite}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.flexFullWhite}>
        <View style={styles.flexFull}>
          {/* Header at the top */}
          <Header title="Forgot Password" />

          {/* Content in the middle */}
          <View style={styles.flexFull}>
            <ScrollView
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.title}>Forgot Password</Text>
              <Text style={styles.description}>
                Don't worry! It happens. Please enter the email associated with
                your account.
              </Text>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter your email address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  accessibilityLabel="Email address"
                />
              </View>
              <Button
                title="Send OTP"
                onPress={() => {
                  handleSendOtp();
                }}
                customStyle={styles.button}
                textStyle={styles.buttonText}
              />
            </ScrollView>
          </View>

          {/* Footer at the bottom */}
          <AuthFooter
            promptText="Don't have an account?"
            buttonLabel="Register"
            onPress={handleSendOtp}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  flexFullWhite: {
    flex: 1,
    backgroundColor: 'white',
  },
  flexFull: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Math.max(20, width * 0.05),
    paddingTop: height * 0.04,
    paddingBottom: height * 0.04,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: Math.max(30, width * 0.06),
    fontWeight: '700',
    color: 'black',
    fontFamily: 'Poppins',
    marginBottom: 10,
  },
  description: {
    fontSize: Math.max(16, width * 0.04),
    fontWeight: '400',
    color: 'gray',
    fontFamily: 'Inter',
    marginBottom: 20,
  },
  label: {
    fontSize: Math.max(16, width * 0.04),
    fontWeight: '400',
    color: 'black',
    lineHeight: Math.max(16, width * 0.04),
    fontFamily: 'Poppins',
    marginTop: height * 0.02,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginTop: SPACING / 2,
    height: Math.max(56, height * 0.07),
  },
  inputField: {
    flex: 1,
    fontSize: Math.max(14, width * 0.035),
    color: 'black',
  },
  button: {
    backgroundColor: '#FFCB4B',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: Math.max(16, width * 0.04),
    fontFamily: 'Inter',
    fontWeight: '600',
    lineHeight: Math.max(16, width * 0.04),
    color: 'black',
    textAlign: 'center',
  },
});

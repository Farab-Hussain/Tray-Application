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
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Header from '../../components/common/Header';
import AuthFooter from '../../components/auth/AuthFooter';
import AuthButton from '../../components/auth/Button';

const { width, height } = Dimensions.get('window');
const SPACING = Math.max(16, width * 0.04); // Responsive base spacing

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { email, otp } = (route as any).params || {};

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:5050/api/auth/resetPassword', {
        email,
        otp,
        newPassword,
      });
      Alert.alert('Success', 'Password has been reset');
      navigation.navigate('Login' as never);
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Password reset failed',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flexFullWhite}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.flexFullWhite}>
        <View style={styles.flexFull}>
          {/* Header at the top */}
          <Header title="Reset password" />

          {/* Content in the middle */}
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Reset password</Text>
            <Text style={styles.description}>
              Please type something you’ll remember for your account.
            </Text>
            <Text style={styles.label}>New password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputField}
                placeholder="must be 8 characters"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                accessibilityLabel="New password"
              />
            </View>
            <Text style={styles.label}>Confirm new password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputField}
                placeholder="repeat password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                accessibilityLabel="Confirm new password"
              />
            </View>
            <AuthButton
              title="Reset password"
              onPress={handleResetPassword}
              customStyle={styles.button}
              textStyle={styles.buttonText}
            />
          </ScrollView>

          {/* Footer at the bottom */}
          <AuthFooter
            promptText="Already have an account?"
            buttonLabel="Log in"
            onPress={() => navigation.navigate('Login' as never)}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;

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
    marginTop: height * 0.04,
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

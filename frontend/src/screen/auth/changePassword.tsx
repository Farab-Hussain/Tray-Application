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
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../components/common/Header';
import AuthFooter from '../../components/auth/AuthFooter';
import AuthButton from '../../components/common/Button';
import { resetPassword } from '../../services/authService';

const { width, height } = Dimensions.get('window');
const SPACING = Math.max(16, width * 0.04); // Responsive base spacing

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const { email, otp } = route.params || {};

  const handleResetPassword = async () => {
    setError(null);
    setSuccess(null);

    if (!newPassword) {
      setError('Please enter a new password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email, otp, newPassword);
      setSuccess('Password reset successful!');
      setTimeout(() => {
        navigation.navigate('Login' as never);
      }, 1500);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Failed to reset password'
      );
    } finally {
      setLoading(false);
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
            {error && <Text style={styles.errorText}>{error}</Text>}
            {success && <Text style={styles.successText}>{success}</Text>}
            <AuthButton
              title={loading ? 'Resetting...' : 'Reset password'}
              onPress={handleResetPassword}
              customStyle={styles.button}
              textStyle={styles.buttonText}
              disabled={loading}
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
    paddingHorizontal: 10,
    paddingTop: height * 0.04,
    paddingBottom: height * 0.04,
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
  errorText: {
    color: 'red',
    fontSize: Math.max(14, width * 0.035),
    marginTop: SPACING / 2,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    fontSize: Math.max(14, width * 0.035),
    marginTop: SPACING / 2,
    textAlign: 'center',
  },
});

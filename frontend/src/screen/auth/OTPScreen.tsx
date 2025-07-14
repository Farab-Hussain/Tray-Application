import React, { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
  //   Alert,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import AuthFooter from '../../components/auth/AuthFooter';
import Button from '../../components/auth/Button';
// import axios from 'axios';

const { width, height } = Dimensions.get('window');
const SPACING = Math.max(16, width * 0.04); // Responsive base spacing

const OTPScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputs: React.RefObject<RNTextInput | null>[] = [
    useRef<RNTextInput>(null),
    useRef<RNTextInput>(null),
    useRef<RNTextInput>(null),
    useRef<RNTextInput>(null),
  ];
  const navigation = useNavigation();
  //   const route = useRoute<RouteProp<{ params: { email: string } }, 'params'>>();
  //   const email = route.params.email;

  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResendCode = () => {
    setResendTimer(30);
    setCanResend(false);
    // Add your resend logic here
  };

  const handleGoBack = () => navigation.goBack();
  //    const handleSignup = () => navigation.navigate('Signup' as never);

  // TODO: Pass the correct email value to this function, e.g. via props or navigation params
  //   const verifyOtp = async () => {
  //     const otpCode = otp.join('');
  //     if (otpCode.length !== 4) {
  //       Alert.alert('Error', 'Please enter the 4-digit OTP');
  //       return;
  //     }
  //     try {
  //       const response = await axios.post('http://localhost:5050/api/auth/verifyOtp', { email, otp: otpCode });
  //       if (response.status === 200 && response.data.message === "OTP verified successfully") {
  //         (navigation.navigate as any)('ResetPassword', { otp: otpCode, email });
  //       } else {
  //         Alert.alert('Error', response.data.message || 'Incorrect OTP');
  //       }
  //     } catch (error: any) {
  //       Alert.alert('Error', error.response?.data?.message || 'Incorrect OTP');
  //     }
  //   }

  return (
    <KeyboardAvoidingView
      style={styles.flexFullWhite}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.flexFullWhite}>
        <View style={styles.flexFull}>
          {/* Header at the top */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={handleGoBack}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <ChevronLeft size={24} color="black" strokeWidth={2} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Please check your email</Text>
          </View>

          {/* Content in the middle */}
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Please check your email</Text>
            <Text style={styles.description}>
              We've sent a code to helloworld@gmail.com
            </Text>
            <View style={styles.otpContainer}>
              {otp.map((digit, idx) => (
                <RNTextInput
                  key={idx}
                  ref={inputs[idx]}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={text => {
                    if (/^\d?$/.test(text)) {
                      const newOtp = [...otp];
                      newOtp[idx] = text;
                      setOtp(newOtp);
                      if (text && idx < 3) {
                        inputs[idx + 1].current?.focus();
                      }
                    }
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  returnKeyType="next"
                  textAlign="center"
                  accessibilityLabel={`Digit ${idx + 1}`}
                  onKeyPress={({ nativeEvent }) => {
                    if (
                      nativeEvent.key === 'Backspace' &&
                      !otp[idx] &&
                      idx > 0
                    ) {
                      inputs[idx - 1].current?.focus();
                    }
                  }}
                />
              ))}
            </View>
            <Button
              title="Verify"
              onPress={() => navigation.navigate('changePassword' as never)}
              customStyle={styles.btn}
              textStyle={styles.btnText}
            />
            <View style={styles.resendContainer}>
              {canResend ? (
                <TouchableOpacity
                  onPress={handleResendCode}
                  style={styles.resendButton}
                  accessibilityRole="button"
                >
                  <Text style={styles.resendText}>Send code again</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.timerText}>
                  Send code again in {resendTimer}s
                </Text>
              )}
            </View>
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

export default OTPScreen;

const styles = StyleSheet.create({
  flexFullWhite: { flex: 1, backgroundColor: 'white' },
  flexFull: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: Math.max(20, width * 0.05),
  },
  headerTitle: {
    fontSize: Math.max(20, width * 0.05),
    fontWeight: '700',
    color: 'black',
    fontFamily: 'Poppins',
    marginLeft: 10,
  },
  contentContainer: {
    paddingHorizontal: Math.max(20, width * 0.05),
    paddingTop: height * 0.04,
    paddingBottom: height * 0.04,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 22,
    zIndex: 1,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  title: {
    paddingTop: height * 0.07, // replaces 59 with a responsive value
    fontSize: Math.max(30, width * 0.06),
    fontWeight: '700',
    color: 'black',
    fontFamily: 'Poppins',
  },
  btn: {
    backgroundColor: '#FFCB4B',
    color: '#000',
  },
  btnText: {
    color: '#000',
  },
  description: {
    fontSize: Math.max(16, width * 0.04),
    fontWeight: '400',
    color: 'gray',
    fontFamily: 'Inter',
    paddingVertical: SPACING / 4,
  },
  label: {
    fontSize: Math.max(16, width * 0.04),
    fontWeight: '400',
    color: 'black',
    lineHeight: Math.max(16, width * 0.04),
    fontFamily: 'Poppins',
    marginTop: height * 0.02,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING / 1.5,
    marginBottom: SPACING / 1.5,
  },
  otpInput: {
    width: Math.max(77, width * 0.12),
    height: Math.max(77, height * 0.07),
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    backgroundColor: 'white',
    fontSize: Math.max(20, width * 0.05),
    color: 'black',
    textAlign: 'center',
    marginHorizontal: 4,
    fontFamily: 'Poppins',
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: SPACING,
    marginBottom: SPACING / 2,
  },
  resendButton: {
    paddingVertical: SPACING / 4,
  },
  resendText: {
    fontSize: Math.max(16, width * 0.035),
    color: '#000000B2',
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  timerText: {
    fontSize: Math.max(14, width * 0.035),
    color: 'gray',
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  button: {
    width: '100%',
    height: Math.max(56, height * 0.07),
    backgroundColor: '#FFCB4B',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.04, // replaces height * 0.05 with 0.04 for more scalable spacing
  },
  buttonText: {
    fontSize: Math.max(16, width * 0.04),
    fontFamily: 'Inter',
    fontWeight: '600',
    lineHeight: Math.max(16, width * 0.04),
    color: 'black',
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: height * 0.4, // replaces 360 with a responsive value
  },
  signupText: {
    fontSize: 14,
    color: 'gray',
  },
  signupButton: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
    fontFamily: 'Inter',
  },
});

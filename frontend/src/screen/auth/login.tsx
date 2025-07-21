import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  // Linking,
} from 'react-native';
import { useState } from 'react';
import AuthFooter from '../../components/auth/AuthFooter';
import Button from '../../components/common/Button';
import { CheckCircle, Eye, EyeOff } from 'lucide-react-native';
import 'lucide-react-native';
import Header from '../../components/common/Header';
import { login as loginApi, googleLogin, facebookLogin, appleLogin } from '../../services/authService';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from '../../navigation/RootNavigator';
import { useContext } from 'react';
import { UserRoleContext } from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEmailValid = email.includes('@') && email.includes('.');
  const { setUserRole } = useContext(UserRoleContext);

  const handleLogin = async () => {
    setError(null);
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      const res = await loginApi(email, password);
      const user = res.user;
      if (!user) {
        setError(res.message || 'Login failed. Please check your credentials.');
        return;
      }
      // Store user in AsyncStorage for later role checks
      await AsyncStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'consultant') {
        setUserRole('consultant');
        navigationRef.reset({
          index: 0,
          routes: [{ name: 'ConsultantTabs' }],
        });
      } else if (user.role === 'student') {
        setUserRole('student');
        navigation.navigate('StudentTabs');
      } else {
        setError('Unknown user role.');
      }
    } catch (err) {
      if (err && typeof err === 'object') {
        // Try to extract error message safely
        const errorMessage =
          (err as any)?.response?.data?.message ||
          (err as any)?.message ||
          'Login failed.';
        setError(errorMessage);
      } else {
        setError('Login failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    setError(null);
    setLoading(true);
    try {
      if (provider === 'google') {
        // TODO: Get idToken from Google SDK
        const idToken = '';
        await googleLogin(idToken);
      } else if (provider === 'facebook') {
        // TODO: Get accessToken and userID from Facebook SDK
        const accessToken = '';
        const userID = '';
        await facebookLogin(accessToken, userID);
      } else if (provider === 'apple') {
        // TODO: Get identityToken from Apple SDK
        const identityToken = '';
        await appleLogin(identityToken);
      }
      navigation.navigate('StudentTabs');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Social login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <SafeAreaView>
          <Header title="Login" />
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Login</Text>
              {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}
              <View style={styles.formContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {isEmailValid && (
                    <CheckCircle size={22} color="green" style={styles.icon} />
                  )}
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.inputField}
                      placeholder="Password"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      accessibilityRole="button"
                    >
                      {showPassword ? (
                        <Eye size={22} color="gray" style={styles.icon} />
                      ) : (
                        <EyeOff size={22} color="gray" style={styles.icon} />
                      )}
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.link}
                    onPress={() => navigation.navigate('forgetPassword')}
                  >
                    <Text style={styles.linkText}>Forget  Password ?</Text>
                  </TouchableOpacity>
                </View>

                <Button
                  title={loading ? 'Logging in...' : 'Login'}
                  onPress={handleLogin}
                  customStyle={styles.button}
                  textStyle={styles.buttonText}
                  disabled={loading}
                />
              </View>

              <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <TouchableOpacity
                  style={styles.dividerTextContainer}
                  accessibilityRole="button"
                >
                  <Text style={styles.dividerText}>or login with</Text>
                </TouchableOpacity>
                <View style={styles.line} />
              </View>

              <View style={styles.socialContainer}>
                <TouchableOpacity
                  style={styles.socialButton}
                  accessibilityRole="button"
                  onPress={() => handleSocialLogin('facebook')}
                >
                  <Image
                    source={require('../../assets/images/social-icon/facebook.png')}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialButton}
                  accessibilityRole="button"
                  onPress={() => handleSocialLogin('google')}
                >
                  <Image
                    source={require('../../assets/images/social-icon/google.png')}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialButton}
                  accessibilityRole="button"
                  onPress={() => handleSocialLogin('apple')}
                >
                  <Image
                    source={require('../../assets/images/social-icon/apple.png')}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <AuthFooter
              promptText="Don't have an account?"
              buttonLabel="Register"
              onPress={() => {
                navigation.navigate('register');
              }}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: Math.max(20, width * 0.05),
    justifyContent: 'center',
    maxWidth: 400,
    width: '100%',
  },
  formContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: Math.min(30, width * 0.08),
    fontWeight: '700',
    color: 'black',
    lineHeight: Math.min(30, width * 0.08),
    fontFamily: 'Poppins',
    marginBottom: height * 0.03,
    textAlign: 'left',
    // paddingTop: 100,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginTop: 10,
    height: Math.max(56, height * 0.05),
  },
  inputField: {
    flex: 1,
    fontSize: Math.max(14, width * 0.035),
    color: 'black',
    fontFamily: 'Poppins',
    paddingVertical: 0,
  },
  icon: {
    marginLeft: 8,
  },
  label: {
    fontSize: Math.max(16, width * 0.04),
    fontWeight: '400',
    color: 'black',
    lineHeight: Math.max(16, width * 0.04),
    fontFamily: 'Poppins',
    marginTop: height * 0.02,
  },
  link: {
    marginTop: height * 0.02,
    alignSelf: 'flex-end',
  },
  linkText: {
    fontSize: Math.max(14, width * 0.035),
    color: 'black',
    fontFamily: 'Poppins',
    fontWeight: '400',
    lineHeight: Math.max(14, width * 0.035),
    textAlign: 'right',
    marginBottom: height * 0.02,
  },
  button: {
    width: '100%',
    height: Math.max(56, height * 0.07),
    backgroundColor: '#FFCB4B',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  buttonText: {
    fontSize: Math.max(16, width * 0.04),
    fontFamily: 'Inter',
    fontWeight: '600',
    lineHeight: Math.max(16, width * 0.04),
    color: 'black',
    textAlign: 'center',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    marginTop: height * 0.04,
    marginBottom: height * 0.02,
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
    opacity: 0.5,
  },
  dividerText: {
    fontSize: Math.max(14, width * 0.035),
    color: 'black',
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  dividerTextContainer: {
    marginHorizontal: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
  },
  socialButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    width: '30%',
    height: 56,
    borderWidth: 1,
    borderColor: 'gray',
  },
  socialIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  registerText: {
    fontSize: 14,
    color: 'gray',
  },
  registerButton: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
    fontFamily: 'Inter',
  },
});
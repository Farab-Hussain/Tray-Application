/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/common/splashScreen';
import SplashScreenTwo from './src/common/splashScreenTwo';
import RegisterScreen from './src/screen/auth/register';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen}  options={{headerShown:false}}/>
        <Stack.Screen name="SplashScreenTwo" component={SplashScreenTwo}  options={{headerShown:false}}/>
        <Stack.Screen name="register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
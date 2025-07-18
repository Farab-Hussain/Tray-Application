import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../common/splashScreen';
import SplashScreenTwo from '../common/splashScreenTwo';
import login from '../screen/auth/login';
import forgetPassword from '../screen/auth/forgetPassword';
import Register from '../screen/auth/register';
import OTPScreen from '../screen/auth/OTPScreen';
import changePassword from '../screen/auth/changePassword';
import Home from '../screen/student/home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Menu, BookOpen, MessageCircle, Bell, User } from 'lucide-react-native';
import Services from '../common/services';
import selectSlot from '../common/selectSlot';
import MyCart from '../screen/student/myCart';
import Profile from '../common/profile'; // adjust the import path if needed
import Conversation from '../common/conversation';
import Chart from '../common/chart';
import Notification from '../common/notification';
import Call from '../common/call';
import VideoCall from '../common/videoCall';
import review from '../screen/student/review';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StudentTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color }) => {
          if (route.name === 'Menu') return <Menu size={size} color={color} />;
          if (route.name === 'Courses')
            return <BookOpen size={size} color={color} />;
          if (route.name === 'Message')
            return <MessageCircle size={size} color={color} />;
          if (route.name === 'Notifications')
            return <Bell size={size} color={color} />;
          if (route.name === 'Profile')
            return <User size={size} color={color} />;
          return <User size={size} color={color} />;
        },
        tabBarLabel: route.name,
        tabBarActiveTintColor: '#187D22',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#60C169',
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '400', marginBottom: 12 },
      })}
    >
      <Tab.Screen
        name="Menu"
        component={Home}
        options={{ title: 'Menu', headerShown: false }}
      />
      <Tab.Screen
        name="Courses"
        component={Services}
        options={{ title: 'Courses', headerShown: false }}
      />
      <Tab.Screen
        name="Message"
        component={Conversation}
        options={{ title: 'Messages', headerShown: false }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notification}
        options={{ title: 'Notifications', headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Account', headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const StudentNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFCB4B',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SplashScreenTwo"
        component={SplashScreenTwo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="forgetPassword"
        component={forgetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="changePassword"
        component={changePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StudentTabs"
        component={StudentTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="services"
        component={Services}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="selectSlot"
        component={selectSlot}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="myCart"
        component={MyCart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chart"
        component={Chart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="call"
        component={Call}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoCall"
        component={VideoCall}
        options={{ headerShown: false }}
      />
      <Stack.Screen
      name='Review'
      component={review}
      options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default StudentNavigation;

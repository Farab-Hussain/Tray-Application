import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import consultantHome from '../screen/consultant/consultantHome';
import services from '../common/services';
import selectSlot from '../common/selectSlot';
import call from '../common/call';
import chart from '../common/chart';
import chat from '../common/chat';
import conversation from '../common/conversation';
import notification from '../common/notification';
import myCart from '../screen/student/myCart';
import VideoCall from '../common/videoCall';
import { Menu, Calendar, MessageCircle, Bell } from 'lucide-react-native';
import ConsultantProfileSetup from '../screen/consultant/ConsultantProfileSetup';
import ConsultantServiceApplication from '../screen/consultant/ConsultantServiceApplication';
import ConsultantVerificationPending from '../screen/consultant/ConsultantVerificationPending';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ConsultantTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color }) => {
          if (route.name === 'Menu') return <Menu size={size} color={color} />;
          if (route.name === 'Availability') return <Calendar size={size} color={color} />;
          if (route.name === 'Message') return <MessageCircle size={size} color={color} />;
          if (route.name === 'Notification') return <Bell size={size} color={color} />;
          return <Menu size={size} color={color} />;
        },
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
        component={consultantHome}
        options={{ title: 'Menu', headerShown: false }}
      />
      <Tab.Screen
        name="Availability"
        component={services}
        options={{ title: 'Availability', headerShown: false }}
      />
      <Tab.Screen
        name="Message"
        component={conversation}
        options={{ title: 'Message', headerShown: false }}
      />
      <Tab.Screen
        name="Notification"
        component={notification}
        options={{ title: 'Notification', headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const ConsultantNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ConsultantTabs" component={ConsultantTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ConsultantProfileSetup" component={ConsultantProfileSetup} options={{ headerShown: false }} />
      <Stack.Screen name="ConsultantServiceApplication" component={ConsultantServiceApplication} options={{ headerShown: false }} />
      <Stack.Screen name="ConsultantVerificationPending" component={ConsultantVerificationPending} options={{ headerShown: false }} />
      <Stack.Screen name="selectSlot" component={selectSlot} options={{ headerShown: false }} />
      <Stack.Screen name="call" component={call} options={{ headerShown: false }} />
      <Stack.Screen name="chart" component={chart} options={{ headerShown: false }} />
      <Stack.Screen name="chat" component={chat} options={{ headerShown: false }} />
      <Stack.Screen name="conversation" component={conversation} options={{ headerShown: false }} />
      <Stack.Screen name="notification" component={notification} options={{ headerShown: false }} />
      <Stack.Screen name="myCart" component={myCart} options={{ headerShown: false }} />
      <Stack.Screen name="VideoCall" component={VideoCall} options={{ headerShown: false }} />
      {/* Add more consultant-specific screens here */}
    </Stack.Navigator>
  );
};

export default ConsultantNavigation;

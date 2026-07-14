import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  HeartHandshake,
  MessageCircleMore,
  UserRound,
  Flame,
} from 'lucide-react-native';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import RequestsScreen from '../screens/requests/RequestsScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import Colors from '../theme/colors';
const Tab = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#BDBDBD',

        tabBarStyle: {
          position: 'absolute',
          left: 15,
          right: 15,
          bottom: 20,

          height: 70,

          backgroundColor: '#FFFFFF',

          // borderRadius: 20,

          borderTopWidth: 0,

          // elevation: 10,

          // shadowColor: '#000',
          // shadowOpacity: 0.08,
          // shadowRadius: 12,
          // shadowOffset: {
          //   width: 0,
          //   height: 4,
          // },

          paddingTop: 10,
          paddingBottom: 10,
        },

        tabBarIcon: ({ color, size, focused }) => {
          const iconSize = focused ? 32 : 28;
          switch (route.name) {
            case 'Home':
              return <Flame color={color} size={iconSize} />;

            case 'Requests':
              return <HeartHandshake color={color} size={iconSize} />;

            case 'Chat':
              return <MessageCircleMore color={color} size={iconSize} />;

            case 'Profile':
              return <UserRound color={color} size={iconSize} />;

            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen name="Requests" component={RequestsScreen} />

      <Tab.Screen name="Chat" component={ChatScreen} />

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

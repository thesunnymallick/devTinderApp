import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppNavigator from './AppNavigator';
import OnbordingScreen from '../screens/onbording/OnbordingScreen';
import AuthNavigator from './AuthNavigator';
const Stack = createNativeStackNavigator();
const RootNavigator = () => {
  const isLoggedIn = false;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <>
         <Stack.Screen name="Onbording" component={OnbordingScreen} />
          <Stack.Screen name="Auth" component={AuthNavigator} />
        </>
      ) : (
        <Stack.Screen name="Main" component={AppNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/common/SplashScreen';
import LoginScreen from '../screens/common/LoginScreen';

const Stack = createStackNavigator();

const RootSwitchNavigator = () => {
  const authStateLoading = false;

  if (authStateLoading) {
    return (
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
};

export default RootSwitchNavigator;

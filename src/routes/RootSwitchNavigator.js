/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/common/SplashScreen';
import LoginScreen from '../screens/common/LoginScreen';
import PickTabsNavigator from '../routes/PickTabsNavigator';
import { AuthContext } from '../context/AuthContext';
import PackTabsNavigator from './PackTabsNavigator';
import { useSubscribeTopic } from '../hooks/useFirebase';
import { PickerContextProvider } from '../context/PickerContext';
import { PackerContextProvider } from '../context/PackerContext';

const Stack = createStackNavigator();

const RootSwitchNavigator = () => {
  const { authStateLoading, userType } = useContext(AuthContext);

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
  } else if (userType === 'Picker') {
    return (
      <PickerContextProvider>
        <PickTabsNavigator />
      </PickerContextProvider>
    );
  } else if (userType === 'Packer') {
    return (
      <PackerContextProvider>
        <PackTabsNavigator />
      </PackerContextProvider>
    );
  } else {
    useSubscribeTopic('picker');

    useSubscribeTopic('packer');
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

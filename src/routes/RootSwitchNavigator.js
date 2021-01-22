import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/common/SplashScreen';
import LoginScreen from '../screens/common/LoginScreen';
import PickTabsNavigator from '../routes/PickTabsNavigator';
import { AuthContext } from '../context/AuthContext';
import PackStackNavigators from './PackStackNavigators';
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
  } else if (userType === 'picker') {
    return <PickTabsNavigator />;
  } else if (userType === 'packer') {
    return <PackStackNavigators />;
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

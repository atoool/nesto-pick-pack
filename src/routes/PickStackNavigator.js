import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ItemScreen from '../screens/pick/ItemScreen';
import PickScreen from '../screens/pick/PickScreen';

const Stack = createStackNavigator();

const PickStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="PickScreen">
      <Stack.Screen
        name="PackTabsNavigator"
        component={PickScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ItemScreen"
        component={ItemScreen}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PickStackNavigator;

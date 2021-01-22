import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ItemScreen from '../screens/pack/ItemScreen';
import PackSuccessScreen from '../screens/pack/PackSuccessScreen';
import PrintLabelsScreen from '../screens/pack/PrintLabelsScreen';
import RepickSuccessScreen from '../screens/pack/RepickSuccessScreen';
import ScanScreen from '../screens/pack/ScanScreen';
import StatisticsScreen from '../screens/pack/StatisticsScreen';
import PackTabsNavigator from './PackTabsNavigator';

const Stack = createStackNavigator();

const PackStackNavigators = () => {
return (
    <Stack.Navigator initialRouteName="PackTabsNavigator">
         <Stack.Screen
      name="PackTabsNavigator"
      component={PackTabsNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ItemScreen"
      component={ItemScreen}
      options={{ headerShown: false }}
    />
     <Stack.Screen
      name="PackSuccessScreen"
      component={PackSuccessScreen}
      options={{ headerShown: false }}
    />
     <Stack.Screen
      name="PrintLabelsScreen"
      component={PrintLabelsScreen}
      options={{ headerShown: false }}
    />
     <Stack.Screen
      name="RepickSuccessScreen"
      component={RepickSuccessScreen}
      options={{ headerShown: false }}
    />
     <Stack.Screen
      name="ScanScreen"
      component={ScanScreen}
      options={{ headerShown: false }}
    />
     <Stack.Screen
      name="StatisticsScreen"
      component={StatisticsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
};

export default PackStackNavigators;
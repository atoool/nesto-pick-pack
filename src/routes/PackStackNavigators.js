import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ItemScreen from '../screens/pack/ItemScreen';
import PackSuccessScreen from '../screens/pack/PackSuccessScreen';
import PrintLabelsScreen from '../screens/pack/PrintLabelsScreen';
import RepickSuccessScreen from '../screens/pack/RepickSuccessScreen';
import ScanScreen from '../screens/pack/ScanScreen';
import StatisticsScreen from '../screens/pack/StatisticsScreen';
import BinAssignScreen from '../screens/pack/BinAssignScreen';
import PackScreen from '../screens/pack/PackScreen';
import ItemListScreen from '../screens/pack/ItemListScreen';

const Stack = createStackNavigator();

const PackStackNavigators = () => {
  return (
    <Stack.Navigator initialRouteName="PackScreen">
      <Stack.Screen
        name="PackScreen"
        component={PackScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ItemListScreen"
        component={ItemListScreen}
        options={({ route }) => ({
          title: route.params.orderId,
          ...headerOptions,
        })}
      />
      <Stack.Screen
        name="ItemScreen"
        component={ItemScreen}
        options={({ route }) => ({
          title: route.params.orderId,
          ...headerOptions,
        })}
      />
      <Stack.Screen
        name="PackSuccessScreen"
        component={PackSuccessScreen}
        options={{ headerShown: false, }}
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
      <Stack.Screen
        name="BinAssignScreen"
        component={BinAssignScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const headerOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default PackStackNavigators;

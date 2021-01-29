import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ItemScreen from '../screens/pick/ItemScreen';
import PickScreen from '../screens/pick/PickScreen';
import ScanScreen from '../screens/pick/ScanScreen';
import ItemSuccessScreen from '../screens/pick/ItemSuccessScreen'
import SubstituteRequestedScreen from '../screens/pick/SubstituteRequestedScreen'

const Stack = createStackNavigator();

const PickStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="PickScreen" header>
      <Stack.Screen
        name="PackTabsNavigator"
        component={PickScreen}
        options={{ headerShown: false }}
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
        name="ScanScreen"
        component={ScanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ItemSuccessScreen"
        component={ItemSuccessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubstituteRequestedScreen"
        component={SubstituteRequestedScreen}
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

export default PickStackNavigator;

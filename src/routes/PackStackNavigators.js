import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ItemScreen from '../screens/pack/ItemScreen';
import ItemSuccessScreen from '../screens/pack/ItemSuccessScreen';
import PrintLabelsScreen from '../screens/pack/PrintLabelsScreen';
import RepickSuccessScreen from '../screens/pack/RepickSuccessScreen';
import ScanScreen from '../screens/pack/ScanScreen';
import BinAssignScreen from '../screens/pack/BinAssignScreen';
import PackScreen from '../screens/pack/PackScreen';
import PackCompletedScreen from '../screens/pack/PackCompletedScreen';
import Browser from '../screens/common/Browser';
import { AppContext } from '../context/AppContext';

const Stack = createStackNavigator();

const PackStackNavigators = () => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  return (
    <Stack.Navigator initialRouteName="PackScreen">
      <Stack.Screen
        name="PackScreen"
        component={PackScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ItemScreen"
        component={ItemScreen}
        options={({ route }) => ({
          title: '#' + route.params.orderId,
          // sales_incremental_id
          ...headerOptions,
        })}
      />
      <Stack.Screen
        name="ItemSuccessScreen"
        component={ItemSuccessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PackCompletedScreen"
        component={PackCompletedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PrintLabelsScreen"
        component={PrintLabelsScreen}
        options={({ route }) => ({
          title: locale.headings.Print_Labels,
          ...headerOptions,
        })}
      />
      <Stack.Screen
        name="RepickSuccessScreen"
        component={RepickSuccessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScanScreen"
        component={ScanScreen}
        options={({ route }) => ({
          title: locale?.SS_scanbar,
          ...headerOptions,
        })}
      />
      <Stack.Screen
        name="BinAssignScreen"
        component={BinAssignScreen}
        options={({ route }) => ({
          title: locale.headings.Assign_Bin,
          ...headerOptions,
        })}
      />
      <Stack.Screen
        name="Browser"
        component={Browser}
        options={{ headerShown: false }}
        initialParams={{ src: 'https://nesto.store' }}
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

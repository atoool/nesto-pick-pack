import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HeaderInfoButton from '../components/HeaderInfoButton';
import ItemScreen from '../screens/pick/ItemScreen';
import PickScreen from '../screens/pick/PickScreen';
import ScanScreen from '../screens/pick/ScanScreen';
import ItemSuccessScreen from '../screens/pick/ItemSuccessScreen';
import SubstituteRequestedScreen from '../screens/pick/SubstituteRequestedScreen';
import PickCompletedScreen from '../screens/pick/PickCompletedScreen';
import SubstitutesScreen from '../screens/pick/SubstitutesScreen';
import SearchProductScreen from '../screens/pick/SearchProductScreen';
import Browser from '../screens/common/Browser';
import { AppContext } from '../context/AppContext';
import ViewImageScreen from '../screens/common/ViewImageScreen';

import { OrderDetailsStack } from '../routes/SharedRoute';

const Stack = createStackNavigator();

const PickStackNavigator = () => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  return (
    <Stack.Navigator initialRouteName="PickScreen" header>
      <Stack.Screen
        name="PickScreen"
        component={PickScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ItemScreen"
        component={ItemScreen}
        options={({ route }) => ({
          title: '#' + route?.params?.sales_incremental_id,
          headerRight: () => (
            <HeaderInfoButton id={route?.params?.sales_incremental_id} />
          ),
          ...headerOptions,
        })}
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
        name="ItemSuccessScreen"
        component={ItemSuccessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PickCompletedScreen"
        component={PickCompletedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubstituteRequestedScreen"
        component={SubstituteRequestedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubstitutesScreen"
        component={SubstitutesScreen}
        options={({ route }) => ({
          title: '#' + route?.params?.sales_incremental_id,
          ...headerOptions,
        })}
      />
      <Stack.Screen
        name="SearchProductScreen"
        component={SearchProductScreen}
        options={({ route }) => ({
          title: locale?.headings?.search,
          ...headerOptions,
        })}
      />
      <Stack.Screen
        name="Browser"
        component={Browser}
        options={{ headerShown: false }}
        initialParams={{ src: 'https://nesto.store' }}
      />
      <Stack.Screen
        name="ViewImageScreen"
        component={ViewImageScreen}
        options={({ route }) => ({
          title: '#' + route?.params?.sales_incremental_id,
          ...headerOptions,
        })}
      />
      {OrderDetailsStack(Stack)}
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

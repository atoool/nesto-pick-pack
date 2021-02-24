import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PrintLabelsScreen from '../screens/pack/PrintLabelsScreen';
import BinAssignScreen from '../screens/pack/BinAssignScreen';
import ProfileScreen from '../screens/pack/ProfileScreen';
import { AppContext } from '../context/AppContext';
import StatisticsScreen from '../screens/pack/StatisticsScreen';

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
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
        name="BinAssignScreen"
        component={BinAssignScreen}
        options={({ route }) => ({
          title: locale.headings.Bin_pos,
          ...headerOptions,
        })}
      />
      <Stack.Screen
        name="StatisticsScreen"
        component={StatisticsScreen}
        options={({ route }) => ({
          title: locale.headings.statistics,
          ...headerOptions,
        })}
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

export default ProfileStackNavigator;

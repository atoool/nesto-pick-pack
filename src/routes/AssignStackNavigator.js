import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PrintLabelsScreen from '../screens/pack/PrintLabelsScreen';
import BinAssignScreen from '../screens/pack/BinAssignScreen';
import AssignBinTabScreen from '../screens/pack/AssignBinTabScreen';
import { AppContext } from '../context/AppContext';

const Stack = createStackNavigator();

const AssignStackNavigator = () => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  return (
    <Stack.Navigator initialRouteName="AssignBinTabScreen">
      <Stack.Screen
        name="AssignBinTabScreen"
        component={AssignBinTabScreen}
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
          title: locale.headings.Assign_Bin,
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

export default AssignStackNavigator;

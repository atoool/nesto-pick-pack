import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ProfileScreen from '../screens/pick/ProfileScreen';
import { OrderDetailsStack } from '../routes/SharedRoute';

const Stack = createStackNavigator();

const PickProfileStackNavigator = () => {
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

export default PickProfileStackNavigator;

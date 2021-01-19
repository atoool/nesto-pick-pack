import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationsScreen from '../screens/pick/NotificationsScreen';

const Tabs = createBottomTabNavigator();

const PickTabsNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="NotificationsScreen" component={NotificationsScreen} />
    </Tabs.Navigator>
  );
};

export default PickTabsNavigator;

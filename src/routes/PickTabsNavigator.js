import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationsScreen from '../screens/pick/NotificationsScreen';
import PickScreen from '../screens/pick/PickScreen';
import HistoryScreen from '../screens/pick/HistoryScreen';
import ProfileScreen from '../screens/pick/ProfileScreen';

const Tabs = createBottomTabNavigator();

const PickTabsNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Notifications" component={NotificationsScreen} />
      <Tabs.Screen name="Pick Now" component={PickScreen} />
      <Tabs.Screen name="History" component={HistoryScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

export default PickTabsNavigator;

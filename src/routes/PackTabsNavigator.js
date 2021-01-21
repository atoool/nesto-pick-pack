import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PackScreen from '../screens/pack/PackScreen';
import HistoryScreen from '../screens/pack/HistoryScreen';
import ProfileScreen from '../screens/pack/ProfileScreen';
import NotificationsScreen from '../screens/pack/NotificationsScreen';

const Tabs = createBottomTabNavigator();

const PackTabsNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="NotificationsScreen" component={NotificationsScreen} />    
      <Tabs.Screen name="Pick Now" component={PackScreen} />
      <Tabs.Screen name="History" component={HistoryScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

export default PackTabsNavigator
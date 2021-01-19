import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator();

const PackTabsNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="NotificationsScreen" component={NotificationsScreen} />
    </Tabs.Navigator>
  );
};

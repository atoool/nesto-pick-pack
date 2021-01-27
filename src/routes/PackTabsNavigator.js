import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PackScreen from '../screens/pack/PackScreen';
import HistoryScreen from '../screens/pack/HistoryScreen';
import ProfileScreen from '../screens/pack/ProfileScreen';
import NotificationsScreen from '../screens/pack/NotificationsScreen';
import CustomTabBar from '../components/CustomTabBar';
import ScanScreen from '../screens/pack/ScanScreen';
import PackStackNavigators from './PackStackNavigators';

const Tabs = createBottomTabNavigator();

const PackTabsNavigator = () => {
  return (
    <Tabs.Navigator initialRouteName="PackNow" tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen name="PackNow" component={PackStackNavigators} />
      <Tabs.Screen name="Notifications" component={NotificationsScreen} />
      <Tabs.Screen name="Scan" component={ScanScreen} initialParams={{ totalItems: null }} />
      <Tabs.Screen name="History" component={HistoryScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

export default PackTabsNavigator
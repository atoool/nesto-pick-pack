import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography, Colors } from '../styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Screens/Navigators
import NotificationsScreen from '../screens/pack/NotificationsScreen';
import HistoryScreen from '../screens/pack/HistoryScreen';
import ProfileScreen from '../screens/pack/ProfileScreen';
import PackStackNavigator from '../routes/PackStackNavigators';
import ScanScreen from '../screens/pack/ScanScreen';
//SVG for Tab Icons
import HistorySVG from '../assets/svg/HistorySVG.svg';
import NotificationSVG from '../assets/svg/NotificationSVG.svg';
import PickSVG from '../assets/svg/PickSVG.svg';
import ProfileSVG from '../assets/svg/ProfileSVG.svg';
import PackScanSVG from '../assets/svg/PackScanSVG.svg';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Tabs = createBottomTabNavigator();

const PackTabsNavigator = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Pack now"
      tabBar={(props) => <PackTabBar {...props} />}>
      <Tabs.Screen name="Pack now" component={PackStackNavigator} />
      <Tabs.Screen name="Notifications" component={NotificationsScreen} />
      <Tabs.Screen name="Scan" component={ScanScreen} initialParams={{ totalItems: null }} />
      <Tabs.Screen name="History" component={HistoryScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

const PackTabBar = ({ state, descriptors, navigation, title }) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={[styles.row]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;
          const color = isFocused ? Colors.secondaryRed : Colors.tabBarInactive;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          if (index == 2)
            return (
              <TouchableOpacity
                onPress={onPress}
                style={styles.tabContainer}
                key={index.toString()}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: Colors.secondaryRed, marginBottom: 5,
                    justifyContent: 'center',
                    alignItems: 'center', elevation: 10
                  }}>
                  <PackScanSVG color={color} width={25} />
                </View>
              </TouchableOpacity>
            );
          return (
            <TouchableOpacity
              onPress={onPress}
              style={[styles.tabContainer, { marginBottom: insets.bottom }]}
              key={index.toString()}>
              {getIconBasedOnRouteName(route.name, color)}
              <Text style={[{ color, ...Typography.normal12 }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const getIconBasedOnRouteName = (routeName, color) => {
  if (routeName === 'Pack now') {
    return <PickSVG color={color} width={20} />;
  } else if (routeName === 'Notifications') {
    return <NotificationSVG color={color} width={20} />;
  } else if (routeName === 'History') {
    return <HistorySVG color={color} width={20} />;
  } else if (routeName === 'Profile') {
    return <ProfileSVG color={color} width={20} />;
  }
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  tabContainer: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PackTabsNavigator;

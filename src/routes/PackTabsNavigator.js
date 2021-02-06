import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography, Colors } from '../styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Screens/Navigators
import NotificationsScreen from '../screens/pack/NotificationsScreen';
import HistoryScreen from '../screens/pack/HistoryScreen';
import PackStackNavigator from '../routes/PackStackNavigators';
import ScanScreen from '../screens/pack/ScanScreen';
//SVG for Tab Icons
import HistorySVG from '../assets/svg/HistorySVG.svg';
import NotificationSVG from '../assets/svg/NotificationSVG.svg';
import PickSVG from '../assets/svg/PickSVG.svg';
import ProfileSVG from '../assets/svg/ProfileSVG.svg';
import PackScanSVG from '../assets/svg/PackScanSVG.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfileStackNavigator from './ProfileStackNavigator';
import { AppContext } from '../context/AppContext';
import { useFirebase, useSubscribeTopic } from '../hooks/useFirebase';
import AssignStackNavigator from './AssignStackNavigator';

const Tabs = createBottomTabNavigator();
const PackTabsNavigator = () => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  useFirebase();
  useSubscribeTopic('packer');
  return (
    <Tabs.Navigator
      initialRouteName="AssignBin"
      tabBar={(props) => <PackTabBar {...props} />}>
      <Tabs.Screen
        name="AssignBin"
        options={{ title: locale?.headings?.Assign_Now }}
        component={AssignStackNavigator}
      />
      <Tabs.Screen
        name="PackNow"
        options={{ title: locale?.headings?.pack }}
        component={PackStackNavigator}
      />

      <Tabs.Screen
        name="Scan"
        component={ScanScreen}
        initialParams={{ totalItems: null }}
      />
      <Tabs.Screen
        name="Notifications"
        options={{ title: locale?.headings?.notifications }}
        component={NotificationsScreen}
      />
      <Tabs.Screen
        name="Profile"
        options={{ title: locale?.headings?.profile }}
        component={ProfileStackNavigator}
      />
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
                activeOpacity={0.7}
                onPress={onPress}
                style={styles.tabContainer}
                key={index.toString()}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: Colors.secondaryRed,
                    marginBottom: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 1,
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
  if (routeName === 'PackNow') {
    return <PickSVG color={color} width={20} />;
  } else if (routeName === 'Notifications') {
    return <NotificationSVG color={color} width={20} />;
  } else if (routeName === 'AssignBin') {
    return <HistorySVG color={color} width={20} />;
  } else if (routeName === 'Profile') {
    return <ProfileSVG color={color} width={20} />;
  }
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  tabContainer: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PackTabsNavigator;

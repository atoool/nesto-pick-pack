import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography, Colors } from '../styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Screens/Navigators
import NotificationsScreen from '../screens/pick/NotificationsScreen';
import ProfileScreen from '../screens/pick/ProfileScreen';
import PickStackNavigator from '../routes/PickStackNavigator';
//SVG for Tab Icons
import DropSVG from '../assets/svg/DropSVG.svg';
import NotificationSVG from '../assets/svg/NotificationSVG.svg';
import PickSVG from '../assets/svg/PickSVG.svg';
import ProfileSVG from '../assets/svg/ProfileSVG.svg';
import { useFirebase, useSubscribeTopic } from '../hooks/useFirebase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppContext } from '../context/AppContext';
import DropScreen from '../screens/pick/DropScreen';

const Tabs = createBottomTabNavigator();

const PickTabsNavigator = () => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  useSubscribeTopic('picker');
  return (
    <Tabs.Navigator
      initialRouteName="Pick now"
      screenOptions={{ tabBarVisible: false }}
      tabBar={(props) => <PickTabBar {...props} />}>
      <Tabs.Screen
        name="Pick now"
        options={{ title: locale?.headings?.pick }}
        component={PickStackNavigator}
      />
      <Tabs.Screen
        name="Drop"
        options={{ title: locale?.headings?.drop }}
        component={DropScreen}
      />
      <Tabs.Screen
        name="Notifications"
        options={{ title: locale?.headings?.notifications }}
        component={NotificationsScreen}
      />
      <Tabs.Screen
        name="Profile"
        options={{ title: locale?.headings?.profile }}
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
};

const PickTabBar = ({ state, descriptors, navigation, title }) => {
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
  if (routeName === 'Pick now') {
    return <PickSVG color={color} width={20} />;
  } else if (routeName === 'Notifications') {
    return <NotificationSVG color={color} width={20} />;
  } else if (routeName === 'Drop') {
    return <DropSVG color={color} width={20} />;
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

export default PickTabsNavigator;

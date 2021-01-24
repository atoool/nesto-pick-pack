import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography, Colors } from '../styles';
const CustomTabBar = ({ state, descriptors, navigation, title }) => {
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
          //   const backgroundColor = 'red';

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
              style={styles.tabContainer}
              key={index.toString()}>
              <View
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: color,
                }}></View>
              <Text style={[{ color }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  flex1: { flex: 1 },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
export default CustomTabBar;

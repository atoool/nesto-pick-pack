import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, Typography } from '../styles';

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
          if (index === 2) {
            return (
              <TouchableOpacity
                onPress={onPress}
                style={styles.tabContainer}
                key={index.toString()}>
                <View style={styles.scanView}>
                  <Icon name="maximize" color={Colors.WHITE} size={30} />
                </View>
                {/* <Text style={[{ color }]}>{label}</Text> */}
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              onPress={onPress}
              style={styles.tabContainer}
              key={index.toString()}>
              <View style={[{ backgroundColor: color }, styles.touchableBox]} />
              <Text style={[{ color }, styles.label]}>{label}</Text>
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
    paddingTop: 10,
  },
  flex1: { flex: 1 },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
  },
  scanView: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.secondaryRed,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableBox: {
    width: 25,
    height: 25,
    marginTop: 7,
  },
  label: { ...Typography.normal12, marginTop: 5 },
});
export default CustomTabBar;

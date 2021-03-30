import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../styles';
import RepickSVG from '../assets/svg/RepickSVG';

const Notification = ({ title, body }) => {
  return (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationIconStyle}>
        <RepickSVG />
      </View>
      <View style={styles.notificationBodyContainer}>
        <Text style={Typography.bold17}>{title}</Text>
        <Text style={Typography.normal12}>{body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    marginHorizontal: 32,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationBodyContainer: { marginLeft: 20, flex: 1, marginTop: 5 },
  notificationIconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightYellow,
    width: 50,
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
  },
});
export default Notification;

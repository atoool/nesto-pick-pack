import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Typography } from '.././styles';

const StatusPill = ({
  text,
  backgroundColor,
  marginRight = 0,
  marginLeft = 0,
  borderRadius = 3,
}) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor, marginRight, marginLeft, borderRadius },
      ]}>
      <Text style={Typography.normal12White}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 25,
    paddingHorizontal: 10,
    marginRight: 10,
    justifyContent: 'center',
  },
});

export default StatusPill;

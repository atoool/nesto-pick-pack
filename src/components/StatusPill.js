import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Typography } from '.././styles';

const StatusPill = ({
  text,
  backgroundColor,
  marginRight = 0,
  marginLeft = 0,
  borderRadius = 3,
  paddingVertical = 3,
  textStyle,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          marginRight,
          marginLeft,
          borderRadius,
          paddingVertical,
        },
      ]}>
      <Text style={[Typography.normal12White, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StatusPill;

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Colors, Typography } from '../styles';

const TouchLink = ({ title, onPress, style, onLongPress }) => (
  <TouchableOpacity
    style={[{ backgroundColor: Colors.transparent }, style]}
    onPress={onPress}
    onLongPress={onLongPress}
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
    <Text style={{ color: Colors.secondaryRed, ...Typography.normal12 }}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default TouchLink;

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../styles';
import RightAngleSVG from '../assets/svg/RightAngleSVG';

const LinkButton = ({ title, topBorder, onPress }) => {
  const borderStyle = {
    borderTopWidth: topBorder ? 1 : 0,
  };
  return (
    <TouchableOpacity
      style={[styles.linkButton, borderStyle]}
      onPress={onPress}>
      <Text style={styles.linkButtonText}>{title}</Text>
      <RightAngleSVG />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkButton: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderColor: Colors.divider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkButtonText: {
    flex: 1,
    ...Typography.bold21,
  },
});

export default LinkButton;

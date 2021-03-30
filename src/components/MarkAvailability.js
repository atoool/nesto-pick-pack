import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import MarkAvailabilitySVG from '../assets/svg/MarkAvailabilitySVG';
import { Colors, Typography } from '../styles';

const MarkAvailability = ({ topBorder, title }) => {
  const borderStyle = {
    borderTopWidth: topBorder ? 1 : 0,
  };
  return (
    <TouchableOpacity style={[styles.linkButton, borderStyle]}>
      <Text style={styles.linkButtonText}>{title}</Text>
      <MarkAvailabilitySVG />
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

export default MarkAvailability;

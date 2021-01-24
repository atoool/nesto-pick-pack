import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../../styles';
import Loader from './Loader';

const Button = ({ title, onPress, customStyle, loading, style }) => (
  <TouchableOpacity
    style={[styles.btnStyle, style]}
    onPress={onPress}
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
    {loading && <Loader small={true} />}
    {!loading && <Text style={styles.testStyle}>{title}</Text>}
    {/* <Text style={styles.testStyle}>{title}</Text> */}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: Colors.secondaryRed,
    padding: 15,
    alignItems: 'center',
  },
  testStyle: Typography.buttonTitleText,
});

export default Button;

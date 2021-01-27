import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Typography } from '../styles';
import Loader from './Loader';

const Button = ({ title, onPress, loading, style }) => (
  <TouchableOpacity
    style={[styles.btnStyle, style]}
    onPress={onPress}
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
    <View style={[styles.btnStyle, style]}>
      {loading && <Loader small={true} />}
      {!loading && <Text style={styles.testStyle}>{title}</Text>}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: Colors.secondaryRed,
    padding: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  testStyle: Typography.buttonTitleText,
});

export default Button;

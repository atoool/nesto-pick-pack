import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../styles';

const Divider = () => {
  return <View style={styles.borderLine} />;
};

const styles = StyleSheet.create({
  borderLine: {
    height: 1,
    backgroundColor: Colors.divider,
  },
});
export default Divider;

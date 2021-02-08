import React from 'react';
import { StyleSheet, View } from 'react-native';

const Divider = () => {
  return <View style={styles.borderLine} />;
};

const styles = StyleSheet.create({
  borderLine: {
    height: 1,
    backgroundColor: '#DFDEDE',
  },
});
export default Divider;

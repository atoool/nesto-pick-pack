import React from 'react';
import { View, StyleSheet } from 'react-native';
import NoOrdersSVG from '../assets/svg/NoOrdersSVG';

const NoOrders = () => (
  <View style={styles.containerStyle}>
    <NoOrdersSVG width="100%" />
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 32,
  },
});

export default NoOrders;

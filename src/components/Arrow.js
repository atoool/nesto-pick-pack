import React from 'react';
import { View, StyleSheet } from 'react-native';
import RightArrowSVG from '../assets/svg/RightArrowSVG';
import { Colors } from '../styles';

const Arrow = ({ width = 50 }) => (
  <View style={styles.container}>
    <View style={[styles.arrow, { width }]} />
    <RightArrowSVG />
  </View>
);

const styles = StyleSheet.create({
  arrow: {
    height: 1,
    backgroundColor: Colors.BLACK,
  },
  container: { flexDirection: 'row', alignItems: 'center' },
});

export default Arrow;

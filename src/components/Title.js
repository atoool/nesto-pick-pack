import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Typography, Colors } from '../styles';

const Title = ({ text, style }) => (
  <View style={[styles.container, style]}>
    <Text style={Typography.bold30}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.offWhite,
  },
});

export default Title;

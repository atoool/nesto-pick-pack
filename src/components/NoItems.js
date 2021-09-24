import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typography } from '../styles';

const NoItems = () => {
  return (
    <View style={styles.container}>
      <Text style={Typography.normal15}>No Items</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default NoItems;

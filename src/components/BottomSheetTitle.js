import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typography } from '../styles';

const BottomSheetTitle = ({ title }) => {
  return (
    <View style={styles.bottomSheetTitleContainer}>
      <Text style={Typography.bold13}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetTitleContainer: { width: '100%' },
});

export default BottomSheetTitle;

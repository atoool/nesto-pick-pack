import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../styles';

const { height } = Dimensions.get('screen');

const Loader = ({ small, fullScreen, green, disabled }) => {
  if (small) {
    if (green) {
      return <ActivityIndicator size={'small'} color={Colors.primary1} />;
    } else if (disabled) {
      return <ActivityIndicator size={'small'} color={Colors.lightGray} />;
    } else {
      return <ActivityIndicator size={'small'} color={Colors.WHITE} />;
    }
  } else {
    if (fullScreen) {
      return (
        <View style={styles.fullScreenContainer}>
          <ActivityIndicator size={'small'} color={Colors.primary1} />
        </View>
      );
    } else {
      return (
        <View style={styles.blockContainer}>
          <ActivityIndicator size={'small'} color={Colors.primary1} />
        </View>
      );
    }
  }
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockContainer: {
    height: height - 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;

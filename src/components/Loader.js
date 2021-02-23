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
          <ActivityIndicator
            color={Colors.BLACK}
            size={30}
            style={styles.fullScreenLoader}
          />
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
    height: height - 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  fullScreenLoader: {
    backgroundColor: Colors.WHITE,
    width: 40,
    height: 40,
    borderRadius: 40,
    elevation: 5,
  },
  blockContainer: {
    height: height - 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;

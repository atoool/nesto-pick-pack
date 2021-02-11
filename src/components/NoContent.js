import React from 'react';
import { View, StyleSheet } from 'react-native';
// import NoOrdersSVG from '../assets/svg/NoOrdersSVG';
import GetIcon from './GetIcon';
import Loader from './Loader';

const NoContent = ({ name, isLoading }) =>
  isLoading ? (
    <Loader fullScreen />
  ) : (
    <View style={styles.containerStyle}>
      <GetIcon name={name} width="100%" />
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

export default NoContent;

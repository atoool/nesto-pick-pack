import React from 'react';
import { View, StyleSheet } from 'react-native';
import TickSVG from '../assets/svg/TickSVG';
import { Colors } from '../styles';

const TickComponent = ({ enabled }) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: enabled
            ? Colors.primaryGreen
            : Colors.lineDividerColor,
        },
      ]}>
      {enabled && <TickSVG />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TickComponent;

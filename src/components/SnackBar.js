import React, { useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { Colors, Typography } from '../styles';

const SnackBar = ({ style, title, titleStyle, showSnack }) => {
  const slideAnim = useRef(new Animated.Value(60)).current;

  const show = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const hide = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(slideAnim, {
      toValue: 150,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  showSnack ? show() : hide();
  return (
    <Animated.View
      style={[
        styles.snackView,
        style ? style : {},
        { transform: [{ translateY: slideAnim }] },
      ]}>
      <Text style={[titleStyle, styles.text]}>{title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackView: {
    position: 'absolute',
    height: 60,
    width: '95%',
    backgroundColor: Colors.errorRed,
    bottom: 10,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    ...Typography.bold16White,
    textAlignVertical: 'center',
    textAlign: 'center',
    height: '100%',
    width: '100%',
  },
});

export default SnackBar;

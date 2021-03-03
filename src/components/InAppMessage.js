/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { AppContext } from '../context/AppContext';
import { Colors, Typography } from '../styles';

const InAppMessage = ({ style, titleStyle, textStyle }) => {
  const slideAnim = useRef(new Animated.Value(-500)).current;
  const { showInAppMessage, inAppMessage, onSetShowInAppMessage } = useContext(
    AppContext,
  );
  const show = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      onSetShowInAppMessage(false);
    }, 5000);
  };

  const hide = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(slideAnim, {
      toValue: -500,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };
  showInAppMessage ? show() : hide();
  return (
    <Animated.View
      style={[
        styles.snackView,
        style ? style : {},
        { transform: [{ translateY: slideAnim }] },
      ]}>
      <Text style={[titleStyle, styles.title]}>{inAppMessage?.title}</Text>
      <Text style={[textStyle, styles.text]}>{inAppMessage?.body}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackView: {
    position: 'absolute',
    minHeight: 90,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.WHITE,
    top: 10,
    elevation: 5,
    borderRadius: 20,
    padding: 20,
  },
  title: {
    ...Typography.bold15,
  },
  text: {
    ...Typography.normal12,
    marginTop: 5,
  },
});

export default InAppMessage;

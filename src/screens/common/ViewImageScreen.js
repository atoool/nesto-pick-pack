import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {
  PanGestureHandler,
  PinchGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Colors } from '../../styles';

/**
 * Shared Image Popup screen with gesture support
 */
const ImagePopup = ({
  route: {
    params: { source },
  },
}) => {
  const transX = useSharedValue(0);
  const transY = useSharedValue(0);
  const scale = useSharedValue(1);

  const pinchHandlerRef = useRef();
  const panHandlerRef = useRef();

  const panHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      transX.value = event.translationX;
      transY.value = event.translationY;
    },
    onEnd: () => {
      transX.value = withTiming(0);
      transY.value = withTiming(0);
    },
  });

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => (scale.value = event.scale),
    onEnd: () => (scale.value = withTiming(1)),
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: transX.value },
      { translateY: transY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <SafeAreaView style={styles.imageContainer}>
      <PanGestureHandler
        ref={panHandlerRef}
        simultaneousHandlers={pinchHandlerRef}
        onGestureEvent={panHandler}>
        <Animated.View style={styles.imageContainer}>
          <PinchGestureHandler
            ref={pinchHandlerRef}
            simultaneousHandlers={panHandlerRef}
            onGestureEvent={pinchHandler}>
            <Animated.Image
              source={{ uri: source }}
              resizeMode="contain"
              style={[styles.image, animatedStyle]}
            />
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: { flex: 1, backgroundColor: Colors.WHITE },
  image: { height: '100%', width: '100%' },
});

export default ImagePopup;

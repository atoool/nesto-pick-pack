import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const Button = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    height: 70,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
});

export default Button;

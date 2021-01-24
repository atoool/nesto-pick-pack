import React from 'react';
import { TextInput, Platform, View, StyleSheet } from 'react-native';

const Input = ({
  placeholder,
  secureTextEntry,
  keyboardType,
  onChangeText,
  maxLength,
  value,
  numberOfLines,
  multiline,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
        multiline={multiline}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Input;

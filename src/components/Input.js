import React from 'react';
import { TextInput, Platform, View } from 'react-native';

const Input = ({
  placeholder,
  secureTextEntry,
  keyboardType,
  onChangeText,
  maxLength,
  value,
  numberOfLines,
  multiline,
}) => {
  return (
    <View>
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

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../styles';
import Input from './Input';

const InputWithLabel = ({
  label,
  top,
  onChangeText,
  value,
  keyboard,
  iconName,
  placeholder,
  maxLength,
  editable,
}) => {
  return (
    <View style={[styles.labelTextView, { marginTop: top }]}>
      <Text style={styles.labelText}>{label}</Text>
      <Input
        placeholder={placeholder}
        iconName={iconName}
        style={styles.inputStyle}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboard}
        maxLength={maxLength}
        editable={editable}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  labelTextView: { flex: 1 },
  labelText: { color: Colors.darkText, ...Typography.bold16 },
  inputStyle: { marginTop: 5 },
});

export default InputWithLabel;

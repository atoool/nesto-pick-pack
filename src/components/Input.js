import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../styles';

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
  iconName,
}) => {
  return (
    <View style={[styles.container, style]}>
      {iconName !== '' && (
        <Icon name={iconName} size={24} color="#18191F" style={styles.icon} />
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.darkText}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
        multiline={multiline}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#C5C5C5',
    borderRadius: 7,
  },
  icon: { marginHorizontal: 10 },
  textInput: { flex: 1 },
});

export default Input;

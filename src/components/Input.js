import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import GetIcon from './GetIcon';
import { Colors } from '../styles';

const Input = ({
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  onChangeText,
  maxLength,
  value,
  numberOfLines,
  multiline,
  style,
  iconName,
  textContentType = 'none',
  editable = true,
  rightIconName,
  onSearch,
}) => {
  return (
    <View style={[styles.container, style]}>
      {iconName && (
        <View style={styles.icon}>
          <GetIcon name={iconName} width={20} />
        </View>
      )}
      <TextInput
        placeholder={placeholder}
        autoCompleteType="off"
        placeholderTextColor={Colors.lightGray}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
        multiline={multiline}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={styles.textInput}
        textContentType={textContentType}
        editable={editable}
        onSubmitEditing={onSearch ? onSearch : () => {}}
      />
      {rightIconName && (
        <TouchableOpacity onPress={onSearch}>
          <GetIcon name={rightIconName} width={20} />
        </TouchableOpacity>
      )}
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
    borderColor: Colors.textInputBorder,
    borderRadius: 7,
  },
  icon: {
    paddingHorizontal: 10,
    marginRight: 5,
    borderRightWidth: 1,
    borderColor: Colors.primary6,
  },
  textInput: { flex: 1 },
});

export default Input;

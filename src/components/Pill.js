import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Typography, Colors } from '../styles';

const Pill = ({ title, onPress, selected }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.pill,
          {
            backgroundColor: selected ? Colors.secondaryRed : Colors.primary2,
          },
        ]}>
        <Text style={Typography.normal12White}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginLeft: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
});

export default Pill;

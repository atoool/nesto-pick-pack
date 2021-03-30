import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Typography } from '../styles';

const RadioItem = ({ toggle, onPress, title }) => (
  <TouchableOpacity style={styles.touchBox} onPress={onPress}>
    <View style={styles.radioRound}>
      {toggle && <View style={styles.radioDot} />}
    </View>
    <Text style={Typography.bold15}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  touchBox: {
    backgroundColor: Colors.offWhite,
    marginBottom: 10,
    height: 40,
    alignItems: 'center',
    borderRadius: 7,
    flexDirection: 'row',
  },
  radioRound: {
    height: 20,
    width: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.BLACK,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    height: 10,
    width: 10,
    backgroundColor: Colors.BLACK,
    borderRadius: 30,
  },
});

export default RadioItem;

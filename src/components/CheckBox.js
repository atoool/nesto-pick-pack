import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';

const Checkbox = ({ val, onChange }) => {
  const styles = StyleSheet.create({
    touchable: {
      borderColor: val ? Colors.primary : Colors.lightGray,
      borderWidth: 2,
      borderRadius: 4,
      width: 30,
      height: 30,
      backgroundColor: val ? Colors.primary : Colors.WHITE,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => {
        onChange();
      }}>
      {val && <Icon name="ios-checkmark" color={Colors.WHITE} size={26} />}
    </TouchableOpacity>
  );
};

export default Checkbox;

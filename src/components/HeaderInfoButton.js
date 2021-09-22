import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../styles';

const HeaderInfoButton = ({ navigate, id }) => (
  <TouchableOpacity
    onPress={() => navigate('OrderDetails', { id })}
    style={styles.btnStyle}>
    <Icon name="info" color={Colors.BLACK} size={24} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnStyle: { right: 10 },
});

export default HeaderInfoButton;

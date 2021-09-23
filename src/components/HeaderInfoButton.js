import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../styles';
import { useNavigation } from '@react-navigation/native';

const HeaderInfoButton = ({ nav, id }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.push('OrderDetails', { id })}
      style={styles.btnStyle}>
      <Icon name="info" color={Colors.BLACK} size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: { right: 20 },
});

export default HeaderInfoButton;

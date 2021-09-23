import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, Typography } from '../styles';

const IconTextInfo = ({ name, body }) => {
  return (
    <View style={styles.container}>
      <Icon
        name={name}
        color={Colors.secondaryRed}
        size={15}
        style={styles.iconStyle}
      />
      <Text style={Typography.normal13}>{body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: { paddingRight: 10 },
  container: { width: '100%', marginTop: 10, flexDirection: 'row' },
});

export default IconTextInfo;

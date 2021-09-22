import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Typography } from '../styles';

const InfoText = ({ title, body }) => {
  return (
    <View style={styles.container}>
      <Text style={Typography.bold13}>{title}</Text>
      <Text style={Typography.normal13}>{body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', marginTop: 10 },
});

export default InfoText;

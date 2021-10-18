import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../styles';
import { version, buildNumber } from '../../package.json';
import { env } from '../config';

const ShowVersion = () => (
  <View style={styles.container}>
    <Text style={[Typography.normal12, styles.text]}>
      v{version}-{buildNumber} {getEnv()}
    </Text>
  </View>
);

const getEnv = () => (env?.name === 'production' ? '' : env?.name);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: { color: Colors.lightGray },
});

export default ShowVersion;

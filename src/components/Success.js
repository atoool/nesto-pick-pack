import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Title from './Title';
import { Colors, Typography } from '../styles';
import DoneSVG from '../assets/svg/DoneSVG.svg';
import Button from './Button';

const Success = ({
  title,
  color,
  statusTitle,
  statusText,
  infoTitle,
  infoText,
  buttonText,
  onPress,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Title text={title} style={styles.title} />
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: color ? color : Colors.primaryGreen,
            },
          ]}>
          <DoneSVG width={40} />
        </View>
        <View style={styles.statusTextBox}>
          <Text style={Typography.bold21}>
            {statusTitle ? statusTitle : ''}
          </Text>
          <Text style={styles.statusText}>{statusText ? statusText : ''}</Text>
        </View>
        <View style={styles.infoTextBox}>
          <Text style={Typography.bold17}>{infoTitle ? infoTitle : ''}</Text>
          <Text style={styles.infoText}>{infoText ? infoText : ''}</Text>
          <Button
            title={buttonText ? buttonText : ''}
            style={styles.button}
            onPress={onPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.WHITE },
  title: { borderBottomWidth: 0, alignSelf: 'center' },
  iconBox: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  statusTextBox: {
    alignItems: 'center',
    marginHorizontal: 40,
    marginVertical: 60,
  },
  statusText: { ...Typography.normal15, textAlign: 'center', marginTop: 7 },
  infoTextBox: {
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 32,
    backgroundColor: Colors.primaryRed,
    borderRadius: 16,
  },
  infoText: {
    ...Typography.normal15,
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 20,
  },
  button: { paddingHorizontal: 10 },
});

export default Success;

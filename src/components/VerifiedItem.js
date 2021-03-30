import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Divider from './Divider';
import VerifiedSVG from '../assets/svg/VerifiedSVG';
import { Typography } from '../styles';

const VerifiedItem = ({ locale }) => {
  return (
    <>
      <Divider />
      <View style={styles.verifyBox}>
        <View style={styles.verifyTitleBox}>
          <VerifiedSVG />
          <Text style={styles.verifyTitle}>{locale?.IS_verifiedTitle}</Text>
        </View>
        <Text style={styles.verifyText}>{locale?.IS_verifiedText}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  verifyBox: { paddingVertical: 10, paddingHorizontal: 32, marginTop: 10 },
  verifyTitle: { ...Typography.bold20, marginLeft: 20 },
  verifyText: { ...Typography.normal14, marginTop: 5, marginBottom: 10 },
  verifyTitleBox: { flexDirection: 'row', alignItems: 'center' },
});
export default VerifiedItem;

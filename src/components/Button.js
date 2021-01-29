import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, Typography } from '../styles';
import Loader from './Loader';

const Button = ({ title, onPress, loading, style, titleStyle, subtitle, scanButton, disabled }) => (
  <TouchableOpacity
    disabled={disabled}
    style={Platform.OS == "ios" && [styles.btnStyle, style]}
    onPress={onPress}
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
  >

    <View style={[styles.btnStyle, style]}>
      <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: scanButton ? 'space-between' : 'center', width: '100%' }}>
        <View>
          {loading && <Loader small={true} />}
          {!loading && <Text style={[styles.textStyle, titleStyle]}>{title}</Text>}
          {scanButton && !loading && <Text style={styles.subtitleStyle}>{subtitle}</Text>}
        </View>
        {scanButton && <Icon name="chevron-right" color={Colors.secondaryRed} size={15} style={{ backgroundColor: Colors.WHITE, width: 40, height: 40, borderRadius: 40, textAlign: 'center', textAlignVertical: 'center', right: 20 }} />}
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: Colors.secondaryRed,
    padding: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  textStyle: Typography.buttonTitleText,
  subtitleStyle: { ...Typography.normal12White, marginBottom: 5 }
});

export default Button;

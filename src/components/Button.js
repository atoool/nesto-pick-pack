import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, Typography } from '../styles';
import Loader from './Loader';

const Button = ({
  title,
  onPress,
  loading,
  style,
  titleStyle,
  subtitle,
  scanButton,
  disabled,
}) => (
  <TouchableOpacity
    disabled={disabled || loading}
    style={Platform.OS === 'ios' && [styles.btnStyle, style]}
    onPress={onPress}
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
    <View style={[styles.btnStyle, style]}>
      <View
        style={[
          styles.titleView,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            justifyContent: scanButton ? 'space-between' : 'center',
          },
        ]}>
        <View>
          {loading && <Loader small={true} />}
          {!loading && (
            <Text style={[styles.textStyle, titleStyle]}>{title}</Text>
          )}
          {scanButton && !loading && (
            <Text style={styles.subtitleStyle}>{subtitle}</Text>
          )}
        </View>
        {scanButton && (
          <Icon
            name="chevron-right"
            color={Colors.secondaryRed}
            size={15}
            style={styles.iconStyle}
          />
        )}
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
  subtitleStyle: { ...Typography.normal12White, marginBottom: 5 },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  iconStyle: {
    backgroundColor: Colors.WHITE,
    width: 40,
    height: 40,
    borderRadius: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    right: 20,
  },
});

export default Button;

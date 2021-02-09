import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <ScrollView>
        <Title
          text={title}
          style={{ borderBottomWidth: 0, alignSelf: 'center' }}
        />
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 60,
            backgroundColor: color ? color : Colors.primaryGreen,
            width: 100,
            height: 100,
            borderRadius: 100,
          }}>
          <DoneSVG width={40} />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginHorizontal: 40,
            marginVertical: 60,
          }}>
          <Text style={Typography.bold21}>
            {statusTitle ? statusTitle : ''}
          </Text>
          <Text
            style={[
              Typography.normal15,
              { textAlign: 'center', marginTop: 7 },
            ]}>
            {statusText ? statusText : ''}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            padding: 20,
            marginHorizontal: 32,
            backgroundColor: Colors.primaryRed,
            borderRadius: 16,
          }}>
          <Text style={Typography.bold17}>{infoTitle ? infoTitle : ''}</Text>
          <Text
            style={[
              Typography.normal15,
              { textAlign: 'center', marginTop: 7, marginBottom: 20 },
            ]}>
            {infoText ? infoText : ''}
          </Text>
          <Button
            title={buttonText ? buttonText : ''}
            style={{ paddingHorizontal: 10 }}
            onPress={onPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Success;

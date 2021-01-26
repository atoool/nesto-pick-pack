import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { Typography, Colors } from '../../styles';
import useTimer from '../../hooks/useTimer';

const ItemScreen = () => {
  const ss = 3600;
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <TimerComponent ss={ss} />
      <ItemSection
        title="Colgate toothpaste"
        price="10"
        quantity="2"
        position="Aisle 1 Rack A12"
        department="Consumer Dept."
      />
    </SafeAreaView>
  );
};

const TimerComponent = ({ ss }) => {
  const now = useTimer(ss);
  const HoursString = Math.floor(now / 3600)
    .toString()
    .padStart(2, 0);
  const minutesString = Math.floor(now / 60)
    .toString()
    .padStart(2, 0);

  return (
    <View style={styles.timerContainer}>
      <Text style={Typography.bold17White}>Time remaining</Text>
      <View style={styles.timerDivider} />
      <Text style={Typography.bold17White}>
        {HoursString}:{minutesString} Hrs
      </Text>
    </View>
  );
};
const ItemSection = ({ title, price, quantity, position, department }) => {
  return (
    <View style={{ flexDirection: 'row', marginHorizontal: 32 }}>
      <View style={{ marginRight: 20 }}>
        <View
          style={{
            backgroundColor: Colors.offWhite,
            height: 166,
            width: 124,
            borderRadius: 7,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: '#A1C349',
              borderRadius: 3,
              height: 25,
              padding: 10,

              justifyContent: 'center',
            }}>
            <Text style={Typography.normal12White}>{position}</Text>
          </View>
          <View
            style={{
              backgroundColor: '#C5B171',
              borderRadius: 3,
              height: 25,
              padding: 10,
              marginHorizontal: 10,
              justifyContent: 'center',
            }}>
            <Text style={Typography.normal12White}>{department}</Text>
          </View>
        </View>
        <Text style={Typography.bold21}>{title}</Text>
        <Text style={Typography.normal15}>Picking now</Text>
        <Text style={[Typography.normal15, { marginVertical: 10 }]}>
          For 09:00 - 10:00 Express delivery
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={Typography.bold21}>${price}</Text>
          <Text> per quantity</Text>
          <View
            style={{
              backgroundColor: Colors.secondaryRed,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              borderRadius: 2,
              marginLeft: 10,
            }}>
            <Text style={Typography.bold13White}>x</Text>
            <Text style={Typography.bold20White}>{quantity}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timerDivider: {
    height: '100%',
    width: 1,
    backgroundColor: Colors.WHITE,
    opacity: 0.25,
  },
  timerContainer: {
    backgroundColor: Colors.secondaryRed,
    padding: 20,
    marginHorizontal: 32,
    marginVertical: 32,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ItemScreen;

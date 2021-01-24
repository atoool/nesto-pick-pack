import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Typography, Colors } from '../../styles';

const ItemScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <View
        style={{
          backgroundColor: Colors.secondaryRed,
          padding: 20,
          marginHorizontal: 32,
          marginVertical: 32,
          borderRadius: 7,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Text style={Typography.bold17White}>Time remaining</Text>
        <View
          style={{
            height: '100%',
            width: 1,
            backgroundColor: Colors.WHITE,
            opacity: 0.25,
          }}
        />
        <Text style={Typography.bold17White}>02:30 Hrs</Text>
      </View>
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
              <Text style={Typography.normal12White}>Aisle</Text>
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
              <Text style={Typography.normal12White}>Dept</Text>
            </View>
          </View>
          <Text style={Typography.bold21}>Colgate toothpaste</Text>
          <Text style={Typography.normal15}>Picking now</Text>
          <Text style={[Typography.normal15, { marginVertical: 10 }]}>
            For 09:00 - 10:00 Express delivery
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={Typography.bold21}>$10</Text>
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
              <Text style={Typography.bold20White}>1</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ItemScreen;

import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Colors, Typography } from '../../styles/';

const data = [
  {
    title: 'Best',
    subtitle: 'Timing on record',
    value: 20,
    unit: 'Min',
    avg: '3 Packs',
    color: '#87A53A',
  },
  {
    title: 'Average',
    subtitle: 'Timing on record',
    value: 20,
    unit: 'Min',
    avg: '3 Packs',
    color: '#22923F',
  },
  {
    title: 'Least timing',
    subtitle: 'Timing on record',
    value: 20,
    unit: 'Min',
    avg: '3 Packs',
    color: '#C71712',
  },
];
const StatisticsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {data.map((item, index) => {
        return <Card item={item} />;
      })}
    </SafeAreaView>
  );
};

const Card = ({ item }) => {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: item.color,
        },
      ]}>
      <View style={styles.cardTitleBox}>
        <Text style={Typography.bold20White}>{item.title}</Text>
        <Text style={Typography.normal12White}>{item.subtitle}</Text>
      </View>
      <Text style={styles.cardValue}>{item.value}</Text>
      <View>
        <Text style={Typography.normal12White}>{item.unit} /</Text>
        <Text style={Typography.normal12White}>{item.avg}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 32, backgroundColor: Colors.WHITE },
  card: {
    padding: 30,
    width: '100%',
    borderRadius: 7,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardValue: { ...Typography.bold30White, marginHorizontal: 15 },
  cardTitleBox: {
    width: '60%',
    borderRightWidth: 1,
    borderColor: Colors.lightGray,
  },
});

export default StatisticsScreen;

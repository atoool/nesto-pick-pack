import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList } from 'react-native';
import { Typography, Colors } from '../../styles';

const HistoryScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      {/* <Text>Pick: HistoryScreen</Text> */}
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.borderLine} />}
        // onRefresh={() => {
        //   console.log('hi');
        // }}
        // refreshing={TODO}
        renderItem={(i) => <HistoryItem />}
      />
    </SafeAreaView>
  );
};

const HistoryItem = () => {
  return (
    <View style={{ marginHorizontal: 32, marginVertical: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={Typography.bold17}>#-1234</Text>
          <Text style={Typography.normal15}>Packing Completed</Text>
        </View>
        <View style={styles.statusView}>
          <Text style={Typography.normal12White}>Awaiting delivery</Text>
        </View>
      </View>
      <View style={styles.historyBox}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.deliveryStatusCircle} />
          <Text style={Typography.bold15}>Express delivery</Text>
        </View>
        <View style={styles.flexDirectionRow}>
          <Text>9:00 AM</Text>
          <Text> ------------> </Text>
          <Text>10:00 AM</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexDirectionRow: { flexDirection: 'row' },
  statusView: {
    backgroundColor: '#889BFF',
    borderRadius: 10,
    height: 25,
    padding: 10,
    justifyContent: 'center',
  },
  deliveryStatusCircle: {
    width: 14,
    height: 14,
    backgroundColor: '#889BFF',
    borderRadius: 14,
    marginRight: 10,
  },
  borderLine: {
    height: 1,
    backgroundColor: '#DFDEDE',
  },
  historyBox: {
    backgroundColor: Colors.historyBox,
    padding: 10,
    marginTop: 10,
    borderRadius: 7,
  },
});

export default HistoryScreen;

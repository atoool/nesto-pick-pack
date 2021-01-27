import React from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import packerOrders from '../../mock/packerOrders.json';
import { Typography, Colors } from '../../styles';
import { useNavigation } from '@react-navigation/native';

const PackScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE }}>
      <FlatList
        data={packerOrders.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <AccordionItem order={item} />}
      />
    </SafeAreaView>
  );
};

const AccordionItem = ({ order: { orderId, items } }) => {
  const navigation = useNavigation();
  return (
    <View style={{ paddingHorizontal: 32, paddingTop: 10, marginVertical: 20, borderTopWidth: 0.5, borderColor: Colors.primary5 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={Typography.bold17}>{orderId}</Text>
          <Text style={Typography.normal15}>Picking Completed</Text>
        </View>
        <View style={styles.statusView}>
          <Text style={Typography.normal12White}>2/{items.length} Picked</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.historyBox}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.deliveryStatusCircle} />
            <Text style={Typography.bold15}>Express delivery</Text>
          </View>
          <View style={styles.flexDirectionRow}>
            <Text>9:00 AM</Text>
            <Text> ------------ </Text>
            <Text>10:00 AM</Text>
          </View>
        </View>
        <View style={styles.counter}>
          <Text>Time Left</Text>
          <Text>01:00 hrs</Text>
        </View>
      </View>
      <View
        style={{
          height: 46,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: '#A1C349',
          marginBottom: 10,
        }}>
        <Text style={[Typography.bold17, { color: '#A1C349' }]}>
          Printing labels
        </Text>
      </View>
      <FlatList
        data={items}
        style={styles.orderItemsList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => { index.toString() }}
        ItemSeparatorComponent={() => <View style={styles.borderLine} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderItem}
            onPress={() => navigation.navigate('ItemScreen', { item })}>
            <View
              style={{
                backgroundColor: '#A1C349',
                width: 24,
                height: 24,
                borderRadius: 4,
                marginHorizontal: 20,
              }}
            />
            <View>
              <Text style={Typography.bold15}>
                {item.qty}x {item.name}
              </Text>
              <Text style={Typography.normal12}>{item.department}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusView: {
    backgroundColor: '#889BFF',
    borderRadius: 10,
    height: 25,
    padding: 10,
    justifyContent: 'center',
  },
  borderLine: {
    height: 1,
    backgroundColor: '#DFDEDE',
  },
  flexDirectionRow: { flexDirection: 'row' },
  deliveryStatusCircle: {
    width: 14,
    height: 14,
    backgroundColor: '#889BFF',
    borderRadius: 14,
    marginRight: 10,
  },
  historyBox: {
    height: 70,
    backgroundColor: Colors.offWhite,
    padding: 10,
    marginVertical: 10,
    borderRadius: 7,
    flex: 3,
  },
  counter: {
    backgroundColor: Colors.offWhite,
    marginLeft: 10,
    height: 70,
    borderRadius: 7,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  orderItem: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderItemsList: {
    backgroundColor: Colors.offWhite,
    borderRadius: 7,
    paddingVertical: 10,
  },
});

export default PackScreen;

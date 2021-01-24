import React from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import pickerOrders from '../../mock/pickerOrders.json';
import { Typography, Colors } from '../../styles';

const PickScreen = () => {
  return (
    <SafeAreaView>
      {/* <Text>Pick: PickScreen</Text> */}
      <FlatList
        data={pickerOrders}
        renderItem={(i) => <AccordionItem order={i.item} />}
      />
      {/* <AccordionItem order={pickerOrders[0]} /> */}
    </SafeAreaView>
  );
};

const AccordionItem = ({ order: { orderId, items } }) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Text>{orderId}</Text>
        <Text>Picking in progress</Text>
        <View style={styles.statusView}>
          <Text style={Typography.normal12White}>14/56 picked</Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 2,
          borderRadius: 20,
          margin: 15,
          paddingVertical: 20,
        }}>
        {items.map((i) => {
          return (
            <TouchableOpacity
              style={{
                marginVertical: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'red',
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  marginHorizontal: 20,
                }}
              />
              <View>
                <Text>
                  {i.qty}x {i.name}
                </Text>
                <Text>Health Department</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
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
});

export default PickScreen;

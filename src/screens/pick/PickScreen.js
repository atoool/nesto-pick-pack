import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import AccordionItem from '../../components/pick/AccordionItem';

const PickScreen = () => {
  return (
    <SafeAreaView>
      <Text>Pick: PickScreen</Text>
      <AccordionItem order={order} />
    </SafeAreaView>
  );
};
const order = {
  orderId: '#12345',
  items: [
    {
      _id: 1,
      name: 'Colgate Toothpaste',
      qty: 1,
      dept: 'Health Department',
      position: 'Aisle 1 Bin 1',
    },
    {
      _id: 1,
      name: 'Pepsodant Toothpaste',
      qty: 1,
      dept: 'Health Department',
      position: 'Aisle 1 Bin 1',
    },
    {
      _id: 1,
      name: 'Chandrika',
      qty: 1,
      dept: 'Health Department',
      position: 'Aisle 1 Bin 1',
    },
    {
      _id: 1,
      name: 'Santoor',
      qty: 1,
      dept: 'Health Department',
      position: 'Aisle 1 Bin 1',
    },
    {
      _id: 1,
      name: 'Lux',
      qty: 1,
      dept: 'Health Department',
      position: 'Aisle 1 Bin 1',
    },
  ],
};

export default PickScreen;

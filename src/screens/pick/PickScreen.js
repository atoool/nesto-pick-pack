import React from 'react';
import { SafeAreaView, Text, FlatList } from 'react-native';
import pickerOrders from '../../mock/pickerOrders.json';
import AccordionItem from '../../components/pick/AccordionItem';

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

export default PickScreen;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AccordionItem = ({ order: { orderId, items } }) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Text>{orderId}</Text>
        <Text>#12345</Text>
        <View style={{ backgroundColor: 'blue' }}>
          <Text>#12345</Text>
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

const styles = StyleSheet.create({});

export default AccordionItem;

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
import { useNavigation } from '@react-navigation/native';
import Title from '../../components/Title';
import NoOrders from '../../components/NoOrders';
import StatusPill from '../../components/StatusPill';
import TickComponent from '../../components/TickComponent';
import Arrow from '../../components/Arrow';
import RightCaretSVG from '../../assets/svg/RightCaretSVG';

const PickScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <Title text="Pick now" />
      <FlatList
        data={pickerOrders}
        ListEmptyComponent={() => <NoOrders />}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <AccordionItem order={item} />}
      />
    </SafeAreaView>
  );
};

const AccordionItem = ({ order: { orderId, items } }) => {
  const navigation = useNavigation();
  return (
    <View style={{ marginHorizontal: 32, marginVertical: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={Typography.bold17}>{orderId}</Text>
          <Text style={Typography.normal15}>Picking Completed</Text>
        </View>
        <StatusPill
          backgroundColor="#A1C349"
          text={'2/20 Picked'}
          borderRadius={100}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.historyBox}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.deliveryStatusCircle} />
            <Text style={Typography.bold15}>Express delivery</Text>
          </View>
          <View style={styles.deliveryBox}>
            <Text>9:00 AM</Text>
            <Arrow />
            <Text>10:00 AM</Text>
          </View>
        </View>
        <View style={styles.counter}>
          <Text>Time Left</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={Typography.timeLeft}>01:00</Text>
            <Text> Hrs</Text>
          </View>
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
        ItemSeparatorComponent={() => <View style={styles.borderLine} />}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.orderItem}
            onPress={() => navigation.navigate('ItemScreen', { orderId })}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TickComponent enabled={index === 0} />
              <View>
                <Text style={Typography.bold15}>
                  {item.qty}x {item.name}
                </Text>
                <Text style={Typography.normal12}>{item.dept}</Text>
              </View>
            </View>
            <RightCaretSVG style={{ marginRight: 20 }} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  borderLine: {
    height: 1,
    backgroundColor: '#DFDEDE',
  },
  deliveryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
    justifyContent: 'space-between',
  },
  orderItemsList: {
    backgroundColor: Colors.offWhite,
    borderRadius: 7,
    paddingVertical: 10,
  },
});

export default PickScreen;

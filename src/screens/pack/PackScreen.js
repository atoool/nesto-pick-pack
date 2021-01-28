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
import StatusPill from '../../components/StatusPill';
import Arrow from '../../components/Arrow';
import RightCaretSVG from '../../assets/svg/RightCaretSVG';
import TickSVG from '../../assets/svg/TickSVG';

const PackScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <Title text="Pack now" />
      <FlatList
        data={pickerOrders}
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
    <TouchableOpacity onPress={() => { navigation.navigate('ItemListScreen', { orderId, items }) }}>
      <View style={{ paddingHorizontal: 32, marginTop: 20, borderBottomWidth: 1, borderColor: Colors.offWhite }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={Typography.bold17}>{orderId}</Text>
            <Text style={Typography.normal15}>Picking Completed</Text>
          </View>
          <StatusPill backgroundColor="#A1C349" text={'2/20 Picked'} />
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

      </View>
    </TouchableOpacity>
  );
};

const TickComponent = ({ enabled }) => {
  return (
    <View
      style={{
        backgroundColor: enabled
          ? Colors.primaryGreen
          : Colors.lineDividerColor,
        width: 24,
        height: 24,
        borderRadius: 4,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {enabled && <TickSVG />}
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

export default PackScreen;

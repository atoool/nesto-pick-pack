import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography, Colors } from '../../styles';
//Components
import Title from '../../components/Title';
import NoContent from '../../components/NoContent';
import StatusPill from '../../components/StatusPill';
import TickComponent from '../../components/TickComponent';
import Arrow from '../../components/Arrow';
//SVGs
import RightCaretSVG from '../../assets/svg/RightCaretSVG';
//Mock Imports
import pickerOrders from '../../mock/pickerOrders.json';

import { getOrdersList } from '../../api';
import { AppContext } from '../../context/AppContext';

const PickScreen = () => {
  const {
    locale: { locale },
  } = useContext(AppContext);

  const _getOrdersList = async () => {
    setRefreshing(true);
    try {
      const res = await getOrdersList();
      setOrders(pickerOrders);
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setOrders(pickerOrders);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // _getOrdersList();
  }, []);

  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <Title text={locale?.headings.pick} />
      <FlatList
        data={orders}
        ListEmptyComponent={() => <NoContent name="NoOrdersSVG" />}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.orderId}
        onRefresh={() => _getOrdersList()}
        refreshing={refreshing}
        renderItem={({ item }) => <AccordionItem order={item} />}
      />
    </SafeAreaView>
  );
};

const AccordionItem = ({ order: { orderId, items } }) => {
  const navigation = useNavigation();

  const {
    locale: { locale },
  } = useContext(AppContext);

  return (
    <View style={{ marginHorizontal: 32, marginVertical: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={Typography.bold17}>{orderId}</Text>
          <Text style={Typography.normal15}>{locale?.status.Pi}</Text>
        </View>
        <StatusPill
          backgroundColor="#A1C349"
          text={'1/20 ' + locale?.picked}
          borderRadius={100}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.historyBox}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.deliveryStatusCircle} />
            <Text style={Typography.bold15}>{locale?.status.ED}</Text>
          </View>
          <View style={styles.deliveryBox}>
            <Text>9:00 AM</Text>
            <Arrow />
            <Text>10:00 AM</Text>
          </View>
        </View>
        <View style={styles.counter}>
          <Text>{locale.timeLeft}</Text>
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
          {locale?.PS_printingLabel}
        </Text>
      </View>
      <FlatList
        data={items}
        style={styles.orderItemsList}
        keyExtractor={(item) => `${item._id}`}
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

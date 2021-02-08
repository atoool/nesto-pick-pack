import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography, Colors, width } from '../../styles';
//Components
import Title from '../../components/Title';
import NoContent from '../../components/NoContent';
//Mock Imports
import pickerOrders from '../../mock/pickerOrders.json';

// import { getOrdersList } from '../../api';
import { AppContext } from '../../context/AppContext';
import Button from '../../components/Button';
import OrderComponent from '../../components/OrderComponent';
import Divider from '../../components/Divider';

const AssignBinTabScreen = () => {
  const {
    locale: { locale },
  } = useContext(AppContext);

  const _getOrdersList = async () => {
    setRefreshing(true);
    try {
      // const res = await getOrdersList();
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
    <SafeAreaView style={styles.container}>
      <Title text={locale?.headings.Assign_Now} />
      <FlatList
        data={orders}
        ListEmptyComponent={() => <NoContent name="NoOrdersSVG" />}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.orderId}
        onRefresh={() => _getOrdersList()}
        refreshing={refreshing}
        renderItem={({ item, index }) => (
          <AccordionItem order={item} index={index} />
        )}
      />
    </SafeAreaView>
  );
};

const AccordionItem = ({ order: { orderId, items }, index }) => {
  const navigation = useNavigation();

  const {
    locale: { locale },
  } = useContext(AppContext);

  return (
    <View style={styles.accordion}>
      <OrderComponent
        orderId={orderId}
        items={'20 ' + locale?.items}
        status={locale?.status.BA}
        orderType={locale?.status.ED}
        index={index}
      />

      <Button
        onPress={() => {
          navigation.navigate('PrintLabelsScreen', { orderId: orderId });
        }}
        title={locale?.printBinButton}
        style={styles.buttonBox}
      />

      <FlatList
        data={items}
        style={styles.orderItemsList}
        keyExtractor={(item) => `${item._id}`}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <View style={styles.orderNameBox}>
              <View style={[styles.deliveryStatusCircle]} />
              <Text style={Typography.bold15}>
                {item.qty}x {item.name}
              </Text>
            </View>
            <Text style={styles.departmentBox}>{item.dept}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  contentContainer: { paddingBottom: 60 },
  accordion: { marginHorizontal: 32, marginVertical: 20 },
  buttonBox: { width: width - 60, marginBottom: 10 },
  deliveryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deliveryStatusCircle: {
    width: 12,
    height: 12,
    backgroundColor: Colors.secondaryRed,
    borderRadius: 14,
    marginRight: 10,
    marginTop: 1,
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
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  orderItemsList: {
    backgroundColor: Colors.offWhite,
    borderRadius: 7,
    paddingVertical: 10,
  },
  departmentBox: { ...Typography.normal12, marginLeft: 22 },
  orderNameBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AssignBinTabScreen;

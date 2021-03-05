import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography, Colors, width } from '../../styles';
//Components
import Title from '../../components/Title';
import NoContent from '../../components/NoContent';
import { AppContext } from '../../context/AppContext';
import Button from '../../components/Button';
import OrderComponent from '../../components/OrderComponent';
import Divider from '../../components/Divider';
import { PackerContext } from '../../context/PackerContext';
import { Constants } from '../../utils';

const AssignBinTabScreen = () => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  const { assignBinList, getAssignBinList } = useContext(PackerContext);

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const _getOrdersList = async () => {
    setRefreshing(true);
    try {
      await getAssignBinList();
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setRefreshing(false);
    }
  };
  const getOrders = async () => {
    setLoading(true);
    await getAssignBinList();
    setLoading(false);
  };
  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Title text={locale?.headings.Assign_Bin} />
      <FlatList
        data={assignBinList}
        ListEmptyComponent={() => (
          <NoContent name="NoOrdersSVG" isLoading={isLoading} />
        )}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={(item, indx) => `${indx}${item.id}`}
        onRefresh={() => _getOrdersList()}
        refreshing={refreshing}
        renderItem={({ item, index }) => (
          <AccordionItem
            order={item}
            index={index}
            timeLeft={item?.hand_off_time}
          />
        )}
      />
    </SafeAreaView>
  );
};

const AccordionItem = ({
  order: {
    id,
    items,
    bins_assigned,
    order_type,
    time_slot,
    timeLeft,
    order_start_time,
    order_end_time,
    sales_incremental_id,
    sales_order_id,
  },
  index,
}) => {
  const now = Date.now();
  const navigation = useNavigation();
  const orderId = id ? id : '';
  time_slot = time_slot ? time_slot : { start_time: now, end_time: now };
  timeLeft = timeLeft ? timeLeft : now;
  const {
    locale: { locale },
  } = useContext(AppContext);
  return (
    <View style={styles.accordion}>
      <OrderComponent
        orderId={orderId}
        items={items?.length + ' ' + locale?.items}
        status={bins_assigned ? locale?.status.BA : locale?.status.BAP}
        orderType={order_type}
        index={index}
        startTime={time_slot.start_time}
        endTime={time_slot.end_time}
        timeLeft={timeLeft}
      />

      <Button
        onPress={() => {
          navigation.navigate('PrintLabelsScreen', {
            orderId: `${orderId}`,
            // sales_incremental_id
          });
        }}
        title={bins_assigned ? locale?.printBinButton2 : locale?.printBinButton}
        style={styles.buttonBox}
      />

      {items.length !== 0 && (
        <FlatList
          data={items}
          style={styles.orderItemsList}
          keyExtractor={(item, indx) => `${indx}${item.id}`}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <View style={styles.orderNameBox}>
                <View style={[styles.deliveryStatusCircle]} />
                <Text style={Typography.bold15}>
                  {item?.qty ? item?.qty : 1}x{' '}
                  {item?.name ? item?.name : Constants.emptyItemName}
                </Text>
              </View>
              <Text style={styles.departmentBox}>
                {item?.department
                  ? item?.department
                  : Constants.emptyDepartment}{' '}
                | {item?.position ? item?.position : Constants.emptyPosition}
              </Text>
            </View>
          )}
        />
      )}
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

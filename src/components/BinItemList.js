import { useNavigation } from '@react-navigation/core';
import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AppContext } from '../context/AppContext';
import { Colors, Typography, width } from '../styles';
import { Constants } from '../utils';
import getColorBin from '../utils/getColorBin';
import Button from './Button';
import Divider from './Divider';
import OrderComponent from './OrderComponent';
import StatusPill from './StatusPill';

const BinItemList = ({
  order: {
    id,
    items,
    bins_assigned,
    binsAssigned,
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
        orderId={sales_incremental_id}
        items={items?.length + ' ' + locale?.items}
        status={bins_assigned ? locale?.status.BA : locale?.status.BAP}
        orderType={order_type}
        index={index}
        startTime={time_slot.start_time}
        endTime={time_slot.end_time}
        timeLeft={timeLeft}
      />
      <View style={styles.positionBox}>
        {binsAssigned &&
          binsAssigned?.map((itm, i) => (
            <View key={i} style={styles.statusPill}>
              <StatusPill
                backgroundColor={getColorBin(itm?.bin_number)}
                marginRight={5}
                text={itm?.bin_number}
                paddingVertical={5}
                textStyle={Typography.bold13White}
              />
            </View>
          ))}
      </View>
      <Button
        onPress={() => {
          navigation.navigate('PrintLabelsScreen', {
            orderId: `${orderId}`,
            sales_incremental_id,
            binsAssigned: !binsAssigned ? [] : binsAssigned,
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
                <View
                  style={[
                    styles.deliveryStatusCircle,
                    {
                      backgroundColor: item?.dfc
                        ? Colors[item?.dfc?.toLowerCase()]
                          ? Colors[item.dfc.toLowerCase()]
                          : Colors.dfcFallback
                        : Colors.dfcFallback,
                    },
                  ]}
                />
                <Text style={styles.itemNameText}>
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
  departmentBox: {
    ...Typography.normal12,
    marginLeft: 22,
    width: '90%',
    flexWrap: 'wrap',
  },
  orderNameBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemNameText: { ...Typography.bold15, flexWrap: 'wrap', width: '90%' },
  statusPill: { marginBottom: 5 },
  positionBox: { flexDirection: 'row', marginBottom: 5, flexWrap: 'wrap' },
});
export default BinItemList;

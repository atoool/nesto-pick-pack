import React from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography, Colors } from '../styles';
import { RightCaretSVG } from '../assets/svg';
import StatusPill from './StatusPill';
import OrderComponent from './OrderComponent';
import Divider from './Divider';
import { Constants } from '../utils';
import getColorBin from '../utils/getColorBin';
import getDotColor from '../utils/getDotColor';

const PickList = ({
  items,
  index,
  itemCount,
  orderType,
  startTime,
  endTime,
  timeLeft,
  locale,
  onManualEntry,
}) => {
  const navigation = useNavigation();

  const LeftActions = () => {
    return (
      <View style={styles.leftAction}>
        <Text style={Typography.bold16White}>{locale?.PS_addToDrop}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <OrderComponent
        orderId={''}
        items={itemCount}
        status={''}
        orderType={orderType}
        index={index}
        startTime={startTime}
        endTime={endTime}
        timeLeft={timeLeft}
        pick
      />
      <FlatList
        data={items}
        keyExtractor={(item, indx) => `${indx}`}
        showsVerticalScrollIndicator={false}
        style={styles.orderItemsList}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item, indx }) => (
          <View>
            <TouchableOpacity
              style={styles.orderItem}
              onPress={() =>
                navigation.navigate('ItemScreen', {
                  orderId: item?.orderId,
                  sales_incremental_id: item?.sales_incremental_id
                    ? item?.sales_incremental_id
                    : Constants.emptyOrderId,
                  item,
                  timeLeft,
                  startTime,
                  endTime,
                })
              }>
              <View style={styles.itemBox}>
                <View style={styles.itemTitleBox}>
                  <View
                    style={[
                      styles.deliveryStatusCircle,
                      {
                        backgroundColor: getDotColor(item?.dfc),
                      },
                    ]}
                  />
                  <Text style={Typography.bold15}>
                    {item.qty
                      ? item.qty
                      : item?.repick_qty
                      ? item?.repick_qty
                      : 1}
                    x {item.name ? item.name : Constants.emptyItemName}
                  </Text>
                </View>
                <View style={styles.departmentBox}>
                  <Text style={Typography.normal12}>
                    #
                    {item?.sales_incremental_id
                      ? item?.sales_incremental_id
                      : Constants.emptyOrderId}{' '}
                    |{' '}
                    {item?.department
                      ? item?.department
                      : Constants.emptyDepartment}{' '}
                    {item?.position ? item?.position : Constants.emptyPosition}
                  </Text>
                </View>
                {item.binsAssigned && item.binsAssigned?.length !== 0 && (
                  <View style={styles.positionBox}>
                    {item.binsAssigned.map(
                      (itm, i) =>
                        itm?.bin_number[0]?.toLowerCase() ===
                          item?.dfc[0]?.toLowerCase() && (
                          <View key={i} style={styles.statusPill}>
                            <StatusPill
                              backgroundColor={getColorBin(itm?.bin_number)}
                              marginRight={5}
                              text={itm?.bin_number}
                              paddingVertical={0}
                            />
                          </View>
                        ),
                    )}
                  </View>
                )}
              </View>

              <RightCaretSVG />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 32, marginVertical: 20 },
  deliveryStatusCircle: {
    width: 12,
    height: 12,
    backgroundColor: Colors.lightViolet,
    borderRadius: 14,
    marginRight: 10,
    marginTop: 1,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingRight: 20,
  },
  orderItemsList: {
    backgroundColor: Colors.offWhite,
    borderRadius: 7,
  },
  itemTitleBox: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  positionBox: {
    flexDirection: 'row',
    marginTop: 5,
    width: '90%',
    flexWrap: 'wrap',
  },
  departmentBox: { marginBottom: 5 },
  statusPill: { marginBottom: 5 },
  itemBox: { width: '85%' },
  leftAction: {
    flex: 1,
    backgroundColor: Colors.secondaryGreen,
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 10,
  },
});

export default PickList;

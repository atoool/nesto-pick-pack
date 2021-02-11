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

const PickList = ({
  items,
  index,
  itemCount,
  orderType,
  startTime,
  endTime,
}) => {
  const navigation = useNavigation();
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
        pick
      />
      <FlatList
        data={items}
        style={styles.orderItemsList}
        keyExtractor={(item, indx) => `${indx}`}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item, indx }) => (
          <TouchableOpacity
            style={styles.orderItem}
            onPress={() =>
              navigation.navigate('ItemScreen', {
                orderId: item.orderId,
                item,
              })
            }>
            <View>
              <View style={styles.itemTitleBox}>
                <View
                  style={[
                    styles.deliveryStatusCircle,
                    {
                      backgroundColor:
                        item.dfc === 'chilled'
                          ? Colors.chilled
                          : Colors.secondaryRed,
                    },
                  ]}
                />
                <Text style={Typography.bold15}>
                  {item.qty}x {item.name}
                </Text>
              </View>
              <View style={styles.departmentBox}>
                <Text style={Typography.normal12}>
                  {item.orderId} | {item.department} {item.position}
                </Text>
              </View>
              {item.assigned_bins && item.assigned_bins?.length !== 0 && (
                <View style={styles.positionBox}>
                  {item.assigned_bins.map((itm, i) => (
                    <StatusPill
                      key={i}
                      backgroundColor={'#C5B171'}
                      marginRight={5}
                      text={itm}
                      paddingVertical={0}
                    />
                  ))}
                </View>
              )}
            </View>
            <RightCaretSVG style={styles.rightIcon} />
          </TouchableOpacity>
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
    backgroundColor: '#889BFF',
    borderRadius: 14,
    marginRight: 10,
    marginTop: 1,
  },
  rightIcon: { marginRight: 20 },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
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
  positionBox: { flexDirection: 'row', marginTop: 5 },
  departmentBox: { marginBottom: 5 },
});

export default PickList;
import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AppContext } from '../context/AppContext';
import { Colors, Typography } from '../styles';
import Arrow from './Arrow';
import StatusPill from './StatusPill';

const OrderComponent = ({ orderId, status, items, orderType, index, pick }) => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  return (
    <>
      {!pick && (
        <View style={styles.container}>
          <View>
            <Text style={Typography.bold17}>{orderId}</Text>
            <Text style={Typography.normal15}>{status}</Text>
          </View>
          <View>
            <StatusPill
              backgroundColor="#A1C349"
              text={items}
              borderRadius={100}
              paddingVertical={5}
            />
          </View>
        </View>
      )}
      <View style={styles.timeBox}>
        <View style={styles.historyBox}>
          <View style={styles.statusBox}>
            <View style={styles.deliveryStatusCircle} />
            <Text style={Typography.bold15}>{locale?.status.ED}</Text>
          </View>
          <View style={styles.deliveryBox}>
            <Text style={Typography.normal15}>9:00 AM</Text>
            <Arrow />
            <Text style={Typography.normal15}>10:00 AM</Text>
          </View>
        </View>
        {(!pick || index === 0) && (
          <View style={styles.counter}>
            <Text style={Typography.normal12}>{locale.timeLeft}</Text>
            <View style={styles.timeLeftBox}>
              <Text style={Typography.timeLeft}>01:00</Text>
              <Text style={Typography.normal12}> Hrs</Text>
            </View>
          </View>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between' },
  timeBox: { flexDirection: 'row', alignItems: 'center' },
  statusBox: { flexDirection: 'row', alignItems: 'center' },
  deliveryBox: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 5,
  },
  deliveryStatusCircle: {
    width: 12,
    height: 12,
    backgroundColor: '#889BFF',
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
  timeLeftBox: { flexDirection: 'row', alignItems: 'center' },
});

export default OrderComponent;

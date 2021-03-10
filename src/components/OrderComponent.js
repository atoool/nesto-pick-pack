import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AppContext } from '../context/AppContext';
import { Colors, Typography } from '../styles';
import { Constants } from '../utils';
import formatAmPm from '../utils/formatAmPm';
import Arrow from './Arrow';
import StatusPill from './StatusPill';
import TimerComponent from './TimerComponent';

const OrderComponent = ({
  orderId,
  status,
  items,
  orderType,
  index,
  pick,
  startTime,
  endTime,
  timeLeft,
}) => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  const sTime = formatAmPm(startTime);
  const eTime = formatAmPm(endTime);
  const timer = timeLeft
    ? new Date(timeLeft) <= new Date()
      ? 0
      : new Date(timeLeft) / 1000 - new Date() / 1000
    : 0;
  return (
    <>
      {!pick && (
        <View style={styles.container}>
          <View>
            <Text style={Typography.bold17}>
              {`#${orderId ? orderId : Constants.emptyOrderId}`}
            </Text>
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
            <Text style={Typography.bold15}>Scheduled delivery</Text>
            {/* mock orderType */}
          </View>
          <View style={styles.deliveryBox}>
            <Text style={Typography.normal13}>{sTime}</Text>
            <Arrow />
            <Text style={Typography.normal13}>{eTime}</Text>
          </View>
        </View>
        {/* {(!pick || index === 0) && ( */}
        <View style={styles.counter}>
          <Text style={Typography.normal12}>{locale?.timeLeft}</Text>
          <View style={styles.timeLeftBox}>
            <TimerComponent ss={timer} />
            <Text style={Typography.normal12}> Hrs</Text>
          </View>
        </View>
        {/* )} */}
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
    flexWrap: 'wrap',
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
    height: 'auto',
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
  timerDivider: {
    height: '100%',
    width: 1,
    backgroundColor: Colors.WHITE,
    opacity: 0.25,
  },
  timerContainer: {
    backgroundColor: Colors.secondaryRed,
    padding: 20,
    marginHorizontal: 32,
    marginVertical: 24,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default OrderComponent;

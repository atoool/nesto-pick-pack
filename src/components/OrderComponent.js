import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment-timezone';

import { AppContext } from '../context/AppContext';
import { Colors, Typography } from '../styles';
import { Constants } from '../utils';
import formatAmPm from '../utils/formatAmPm';
import Arrow from './Arrow';
import StatusPill from './StatusPill';
import Timer from './Timer';

const OrderComponent = ({
  orderId,
  status,
  items,
  pick,
  startTime,
  endTime,
  timeLeft,
  slotType,
}) => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  const sTime = formatAmPm(startTime);
  const eTime = formatAmPm(endTime);

  const backgroundColor =
    slotType === 'Scheduled' ? Colors.lightViolet : '#A1C349';

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
              backgroundColor={Colors.primaryGreen}
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
            <View style={[styles.deliveryStatusCircle, { backgroundColor }]} />
            <Text style={Typography.bold15}>{slotType} delivery</Text>
          </View>
          <Text style={styles.centerSelf}>
            {moment(startTime)?.format('Do MMM, YYYY')}
          </Text>
          <View style={styles.deliveryBox}>
            <Text style={Typography.normal13}>{sTime}</Text>
            <Arrow />
            <Text style={Typography.normal13}>{eTime}</Text>
          </View>
        </View>
        <View style={styles.counter}>
          <Text style={Typography.normal12}>{locale?.timeLeft}</Text>
          <View style={styles.timeLeftBox}>
            <Timer timeStamp={timeLeft} />
            <Text style={Typography.normal12}> Hrs</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between' },
  timeBox: { flexDirection: 'row', alignItems: 'center' },
  statusBox: { flexDirection: 'row', alignItems: 'center' },
  deliveryBox: { flexDirection: 'row', marginTop: 5, flexWrap: 'wrap' },
  deliveryStatusCircle: {
    width: 12,
    height: 12,
    borderRadius: 14,
    marginRight: 10,
    marginTop: 1,
  },
  historyBox: {
    height: 83,
    backgroundColor: Colors.offWhite,
    padding: 10,
    marginVertical: 10,
    borderRadius: 7,
    flex: 3,
  },
  counter: {
    backgroundColor: Colors.offWhite,
    marginLeft: 10,
    height: 83,
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
  centerSelf: { alignSelf: 'center' },
});

export default OrderComponent;

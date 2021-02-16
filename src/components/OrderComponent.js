import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AppContext } from '../context/AppContext';
import useTimer from '../hooks/useTimer';
import { Colors, Typography } from '../styles';
import Arrow from './Arrow';
import StatusPill from './StatusPill';

function formatAmPm(date) {
  let dt = new Date(date);
  var minutes = dt.getMinutes();
  var hours = dt.getHours();
  var AmPm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + AmPm;
  return strTime;
}

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
    ? new Date(timeLeft).getSeconds() - new Date().getSeconds()
    : 0;
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
            <Text style={Typography.bold15}>{orderType}</Text>
          </View>
          <View style={styles.deliveryBox}>
            <Text style={Typography.normal15}>{sTime}</Text>
            <Arrow />
            <Text style={Typography.normal15}>{eTime}</Text>
          </View>
        </View>
        {(!pick || index === 0) && (
          <View style={styles.counter}>
            <Text style={Typography.normal12}>{locale.timeLeft}</Text>
            <View style={styles.timeLeftBox}>
              <TimerComponent ss={timer} />
              <Text style={Typography.normal12}> Hrs</Text>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const TimerComponent = ({ ss }) => {
  const now = useTimer(ss);
  const HoursString = Math.floor(now / 3600)
    .toString()
    .padStart(2, 0);
  const minutesString = Math.floor(now / 60)
    .toString()
    .padStart(2, 0);

  return (
    <Text style={Typography.timeLeft}>
      {HoursString}:{minutesString}
    </Text>
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

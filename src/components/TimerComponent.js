import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppContext } from '../context/AppContext';
import useTimer from '../hooks/useTimer';
import { Colors, Typography } from '../styles';
import { Constants } from '../utils';

const TimerComponent = ({ ss, fullTimer, inMinute, call }) => {
  let HoursString = '00';
  let minutesString = '00';
  let secondString = '00';
  const now = useTimer(ss);
  if (ss !== 0) {
    HoursString = Math.floor(now / 3600)
      .toString()
      .padStart(2, 0);
    minutesString = Math.floor((now % 3600) / 60)
      .toString()
      .padStart(2, 0);
    secondString = Math.floor(now - Math.floor(now / 60) * 60)
      .toString()
      .padStart(2, 0);
  }

  inMinute && now <= 0 && call();
  const {
    locale: { locale },
  } = useContext(AppContext);
  if (fullTimer) {
    return (
      <View style={[styles.timerContainer, inMinute && styles.timerContainer2]}>
        {!inMinute && (
          <>
            <Text style={Typography.bold17White}>{locale?.timeRemain}</Text>
            <View style={styles.timerDivider} />
          </>
        )}
        <View style={styles.timeBox}>
          <Text
            style={!inMinute ? Typography.bold30White : Typography.bold13White}>
            {HoursString.length > 2
              ? Constants.timerUpperLimit
              : !inMinute && `${HoursString}:${minutesString} `}
          </Text>
          {!inMinute && <Text style={Typography.bold17White}>Hrs</Text>}
          <Text
            style={!inMinute ? Typography.bold30White : Typography.bold13White}>
            {inMinute && `${minutesString}:${secondString}`}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <Text style={Typography.timeLeft}>
      {HoursString.length > 2
        ? Constants.timerUpperLimit
        : `${HoursString}:${minutesString}`}
    </Text>
  );
};

const styles = StyleSheet.create({
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
    alignItems: 'center',
  },
  timerContainer2: { padding: 10, marginHorizontal: 0, marginVertical: 0 },
  timeBox: { flexDirection: 'row', alignItems: 'center' },
});

export default TimerComponent;

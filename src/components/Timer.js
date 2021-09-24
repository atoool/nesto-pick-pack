import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppContext } from '../context/AppContext';
import useInterval from '../hooks/useInterval';
import { Colors, Typography } from '../styles';
import { Constants } from '../utils';

const getTimeDiff = (timeStamp) => {
  const now = new Date().getTime() / 1000;
  const then = new Date(timeStamp).getTime() / 1000;
  return then - now;
};

const Timer = ({ timeStamp, full = false }) => {
  const [diff, setDiff] = useState(0);
  let displayString = `${Constants.paddedZeros}:${Constants.paddedZeros}`;

  if (diff > 0 && diff < Constants.DAY_MAX) {
    const hour = Math.floor(diff / 3600)
      .toString()
      .padStart(2, 0);
    const minute = Math.floor((diff % 3600) / 60)
      .toString()
      .padStart(2, 0);
    displayString = `${hour}:${minute}`;
  } else if (diff >= Constants.DAY_MAX) {
    displayString = Constants.timerUpperLimit;
  }

  useEffect(() => {
    setDiff(getTimeDiff(timeStamp));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    setDiff(getTimeDiff(timeStamp));
  }, Constants.MINUTES_MS);

  const {
    locale: { locale },
  } = useContext(AppContext);
  if (full) {
    return (
      <View style={[styles.timerContainer]}>
        <Text style={Typography.bold17White}>{locale?.timeRemain}</Text>
        <View style={styles.timerDivider} />
        <View style={styles.timeBox}>
          <Text style={Typography.bold30White}>{` ${displayString} `}</Text>
          <Text style={Typography.bold17White}>Hrs</Text>
        </View>
      </View>
    );
  } else {
    return <Text style={Typography.timeLeft}>{`${displayString}`}</Text>;
  }
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

export default Timer;

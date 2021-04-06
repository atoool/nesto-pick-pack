import React, { useContext, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  ToastAndroid,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import { AppContext } from '../context/AppContext';
import { Colors, Typography } from '../styles';
import { Constants } from '../utils';
import Button from './Button';
import Divider from './Divider';
import RadioItem from './RadioItem';
import TimerComponent from './TimerComponent';

const VerifyItemSection = ({
  navigation,
  item,
  timeOut,
  setTimerOut,
  onManualEntry,
  startTime,
  endTime,
}) => {
  const [status, setStatus] = useState(-1);
  const someOutofStock = status === 1 || status === 3;
  const substituteItems = status === 1 || status === 0;
  const [itemsQty, setItemQty] = useState(0);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const onVerifyButton = () => {
    const qty = item?.qty ? item?.qty : item?.repick_qty ? item?.repick_qty : 0;
    if (!itemsQty && status === 1) {
      ToastAndroid.show(locale?.IS_fieldIsEmpty, ToastAndroid.SHORT);
    } else if (
      // eslint-disable-next-line radix
      (itemsQty === '0' || parseInt(itemsQty) >= qty) &&
      status === 1
    ) {
      ToastAndroid.show(locale?.invalidValue, ToastAndroid.SHORT);
    } else {
      const qtys = qty ? qty : 0;
      const requiredQty = status === 0 ? qtys : isNaN(itemsQty) ? 0 : itemsQty;
      const existingQty =
        qtys === 0 ? qtys : status === 0 ? qtys : qtys - requiredQty;

      const routeTo = timeOut ? 'ContactFCMScreen' : 'SubstitutesScreen';
      routeTo !== 'ContactFCMScreen' &&
        navigation.navigate(routeTo, {
          item,
          orderId: item?.orderId,
          sales_incremental_id: item?.sales_incremental_id
            ? item?.sales_incremental_id
            : Constants?.emptyOrderId,
          existingQty,
          requiredQty,
          startTime,
          endTime,
        });
    }
  };

  const getTimeRemain = (substituteInitTime) => {
    let timeLeft = 0;
    if (!timeOut && substituteInitTime) {
      const initTimeInSeconds = new Date(substituteInitTime).valueOf() / 1000;
      const endTimeInSeconds = Constants.awaitTime + initTimeInSeconds;
      const timeInSecondsNow = new Date().valueOf() / 1000;
      if (endTimeInSeconds > timeInSecondsNow) {
        timeLeft = endTimeInSeconds - timeInSecondsNow;
      }
      return timeLeft;
    }
  };
  return (
    <>
      <Divider />
      <View>
        {(item?.substituted || (!item?.substitution_initiated && !timeOut)) && (
          <>
            <View style={styles.radioBox}>
              <Text style={Typography.bold21}>{locale?.IS_verifyit}</Text>
              <Text style={styles.verifyText}>{locale?.IS_verifyText}</Text>
              <RadioItem
                onPress={() => setStatus(2)}
                toggle={status === 2}
                title={locale?.IS_verifyOpt1}
              />
              {!item?.assigned_item && (
                <>
                  <RadioItem
                    onPress={() => setStatus(0)}
                    toggle={status === 0}
                    title={locale?.IS_verifyOpt2}
                  />
                  {item?.qty !== 1 && (
                    <RadioItem
                      onPress={() => setStatus(1)}
                      toggle={status === 1}
                      title={locale?.IS_verifyOpt3}
                    />
                  )}
                </>
              )}
              <RadioItem
                onPress={() => setStatus(3)}
                toggle={status === 3}
                title={locale?.IS_critical}
              />
              {someOutofStock && (
                <TextInput
                  placeholder={
                    status === 3
                      ? locale?.placeholder?.critical
                      : locale?.placeholder?.countOfOutStock
                  }
                  keyboardType={'number-pad'}
                  onChangeText={(t) =>
                    setItemQty(t.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))
                  }
                  value={itemsQty}
                  style={styles.textInput}
                  maxLength={
                    status === 3
                      ? Constants.criticalStockLimit
                      : Constants.outOfStockLimit
                  }
                />
              )}
            </View>

            <Divider />
          </>
        )}

        {(item?.substitution_initiated && !item?.substituted) ||
        substituteItems ? (
          <View style={styles.verifySubmitBox}>
            <View style={styles.awaitTimer}>
              <Text style={Typography.bold21}>
                {!timeOut
                  ? item?.substitution_initiated
                    ? substituteItems
                      ? locale?.IS_substituteTitle
                      : locale?.IS_waitSubstituteTitle
                    : locale?.IS_substituteTitle
                  : locale?.IS_noRespSubstituteTitle}
              </Text>
              {!item?.substituted && item?.substitution_initiated && (
                <TimerComponent
                  ss={getTimeRemain(item?.substitution_initiated_timestamp)}
                  call={setTimerOut}
                  fullTimer
                  inMinute
                />
              )}
            </View>
            <Text style={styles.awaitText}>
              {!timeOut
                ? item?.substitution_initiated
                  ? locale?.IS_waitSubstituteText
                  : locale?.IS_substituteText
                : locale?.IS_noRespSubstituteText}
            </Text>
            {(!item?.substitution_initiated || timeOut || substituteItems) && (
              <Button
                title={
                  timeOut
                    ? locale?.IS_contactButton
                    : locale?.IS_substituteButton
                }
                style={styles.substButton}
                onPress={onVerifyButton}
              />
            )}
          </View>
        ) : (
          <View style={styles.scanBox}>
            <Button
              scanButton
              title={locale?.IS_scanBar}
              subtitle={locale?.IS_toVerify}
              titleStyle={Typography.bold17White}
              style={styles.scanButton}
              onPress={() => {
                navigation.navigate('ScanScreen', {
                  totalItem: item?.qty
                    ? item?.qty
                    : item?.repick_qty
                    ? item?.repick_qty
                    : null,
                  itemId: item?.id,
                  criticalQty:
                    status === 2 ? Constants.defaultCriticalValue : itemsQty,
                  itemType: item?.item_type,
                  barcodeId: item?.barcode,
                });
              }}
            />
            <View style={styles.scanFailBox}>
              <Text>{locale?.IS_scanFailed}</Text>
              <TouchableOpacity
                onPress={() =>
                  onManualEntry(
                    status === 2 ? Constants.defaultCriticalValue : itemsQty,
                  )
                }>
                <Text style={styles.scanManual}>{locale?.IS_scanManual}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 32, marginVertical: 20 },
  mainMargin: { marginHorizontal: 32 },
  verifyText: { marginVertical: 10 },
  textInput: {
    borderWidth: 1,
    borderRadius: 7,
    height: 50,
    paddingLeft: 20,
    borderColor: Colors.offWhite,
  },
  verifySubmitBox: { marginHorizontal: 32, marginTop: 20 },
  scanBox: { marginHorizontal: 32, marginTop: 20 },
  awaitTimer: { flexDirection: 'row', justifyContent: 'space-between' },
  awaitText: { marginVertical: 10 },
  substButton: { flex: 0, width: 200, marginBottom: 20 },
  scanButton: { padding: 30 },
  scanFailBox: { alignItems: 'center', paddingVertical: 32 },
  scanManual: {
    textDecorationLine: 'underline',
    ...Typography.bold17,
    color: Colors.secondaryRed,
  },
  radioBox: { marginHorizontal: 32, marginVertical: 20 },
});

export default VerifyItemSection;

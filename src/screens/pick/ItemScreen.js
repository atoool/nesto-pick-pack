import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ToastAndroid,
} from 'react-native';
import { Typography, Colors } from '../../styles';
import Button from '../../components/Button';
import { AppContext } from '../../context/AppContext';
import { Constants } from '../../utils';
import { PickerContext } from '../../context/PickerContext';
import VerifiedSVG from '../../assets/svg/VerifiedSVG';
import Loader from '../../components/Loader';
import TimerComponent from '../../components/TimerComponent';
import ItemSection from '../../components/ItemSection';

const now = new Date();

const ItemScreen = ({
  navigation,
  route: {
    params: { item, timeLeft, startTime, endTime },
  },
}) => {
  console.warn(item?.sku, 'sku');
  const ss = timeLeft
    ? new Date(timeLeft) <= now
      ? 0
      : new Date(timeLeft) / 1000 - now / 1000
    : 0;
  const [timeOut, setTimeOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    locale: { locale },
  } = useContext(AppContext);

  const { setItemPicked, getOrdersList, getDropList } = useContext(
    PickerContext,
  );

  const onManualEntry = async (itemsQty) => {
    setIsLoading(true);
    await setItemPicked(item?.id, item?.item_type, itemsQty).then(async () => {
      await getOrdersList();
      await getDropList();
      navigation.navigate('ItemSuccessScreen');
    });
    // setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Loader fullScreen />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TimerComponent fullTimer ss={ss} />
        <ItemSection
          title={item?.name ? item?.name : Constants.emptyItemName}
          price={item?.price ? item?.price?.toFixed(2) : 0}
          quantity={
            item?.qty ? item?.qty : item?.repick_qty ? item?.repick_qty : 0
          }
          position={item?.position}
          department={item?.department}
          type={item?.order_type ? item?.order_type : locale?.status?.SD}
          status={
            item?.picking_completed
              ? locale?.status?.PiC
              : item?.assigned_item
              ? locale?.status?.subst
              : item?.substitution_initiated
              ? locale?.status?.si
              : item?.repick_completed === false
              ? locale?.status?.rp
              : locale?.status?.Pi
          }
          startTime={startTime}
          endTime={endTime}
          img={item?.image_url}
          locale={locale}
        />
        <View style={styles.skuBox}>
          <Text>SKU : {item?.sku ? item?.sku : Constants.emptySku}</Text>
        </View>

        {item?.assigned_item && (
          <>
            <Divider />
            <ItemSection
              originalItem
              title={
                item?.assigned_item?.name
                  ? item?.assigned_item?.name
                  : Constants.emptyItemName
              }
              price={
                item?.assigned_item?.price
                  ? item?.assigned_item?.price?.toFixed(2)
                  : 0
              }
              status={locale?.status?.original}
              startTime={startTime}
              endTime={endTime}
              img={item?.assigned_item?.image_url}
              locale={locale}
            />
          </>
        )}
        {item?.picker_checked ? (
          <VerifiedItem locale={locale} />
        ) : (
          <VerifyItemSection
            navigation={navigation}
            item={item}
            timeOut={timeOut}
            setTimerOut={() => {
              setTimeOut(true);
            }}
            onManualEntry={onManualEntry}
            startTime={startTime}
            endTime={endTime}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const VerifyItemSection = ({
  navigation,
  item,
  timeOut,
  setTimerOut,
  onManualEntry,
  startTime,
  endTime,
}) => {
  const [status, setStatus] = useState(2);
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
            <View style={{ marginHorizontal: 32 }}>
              <Text style={Typography.bold21}>{locale?.IS_verifyit}</Text>
              <Text style={{ marginVertical: 10 }}>
                {locale?.IS_verifyText}
              </Text>
              <RadioItem
                onPress={() => setStatus(2)}
                toggle={status === 2}
                title={locale?.IS_verifyOpt1}
              />
              {/* {(item?.substituted || item?.assigned_item) && ( */}
              <>
                <RadioItem
                  onPress={() => setStatus(0)}
                  toggle={status === 0}
                  title={locale?.IS_verifyOpt2}
                />
                <RadioItem
                  onPress={() => setStatus(1)}
                  toggle={status === 1}
                  title={locale?.IS_verifyOpt3}
                />
              </>
              {/* )} */}
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
                  style={{
                    borderWidth: 1,
                    borderRadius: 7,
                    height: 50,
                    paddingLeft: 20,
                    borderColor: Colors.offWhite,
                  }}
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
          <View style={{ marginHorizontal: 32 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
            <Text style={{ marginVertical: 10 }}>
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
                style={{ flex: 0, width: 200, marginBottom: 20 }}
                onPress={onVerifyButton}
              />
            )}
          </View>
        ) : (
          <View style={{ marginHorizontal: 32 }}>
            <Button
              scanButton
              title={locale?.IS_scanBar}
              subtitle={locale?.IS_toVerify}
              titleStyle={Typography.bold17White}
              style={{ padding: 30 }}
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
                });
              }}
            />
            <View style={{ alignItems: 'center', paddingVertical: 32 }}>
              <Text>{locale?.IS_scanFailed}</Text>
              <TouchableOpacity
                onPress={() =>
                  onManualEntry(
                    status === 2 ? Constants.defaultCriticalValue : itemsQty,
                  )
                }>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    ...Typography.bold17,
                    color: Colors.secondaryRed,
                  }}>
                  {locale?.IS_scanManual}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const RadioItem = ({ toggle, onPress, title }) => (
  <TouchableOpacity
    style={{
      backgroundColor: Colors.offWhite,
      marginBottom: 10,
      height: 40,
      alignItems: 'center',
      borderRadius: 7,
      flexDirection: 'row',
    }}
    onPress={onPress}>
    <View
      style={{
        height: 20,
        width: 20,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: Colors.BLACK,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {toggle && (
        <View
          style={{
            height: 10,
            width: 10,
            backgroundColor: Colors.BLACK,
            borderRadius: 30,
          }}
        />
      )}
    </View>
    <Text style={Typography.bold15}>{title}</Text>
  </TouchableOpacity>
);

const Divider = () => (
  <View
    style={{
      height: 1,
      backgroundColor: Colors.offWhite,
      marginVertical: 20,
    }}
  />
);

const VerifiedItem = ({ locale }) => {
  return (
    <>
      <Divider />
      <View style={[styles.verifyBox, { marginTop: 10 }]}>
        <View style={styles.verifyTitleBox}>
          <VerifiedSVG />
          <Text style={styles.verifyTitle}>{locale?.IS_verifiedTitle}</Text>
        </View>
        <Text style={styles.verifyText}>{locale?.IS_verifiedText}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  timerDivider: {
    height: '100%',
    width: 1,
    backgroundColor: Colors.WHITE,
    opacity: 0.25,
  },
  skuBox: {
    backgroundColor: Colors.offWhite,
    padding: 10,
    borderRadius: 7,
    height: 60,
    flex: 1,
    marginTop: 20,
    marginHorizontal: 32,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  loading: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.WHITE,
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
  flexDirectionRow: { flexDirection: 'row' },
  verifyBox: { paddingVertical: 10, paddingHorizontal: 32 },
  verifyTitle: { ...Typography.bold20, marginLeft: 20 },
  verifyText: { ...Typography.normal14, marginTop: 5, marginBottom: 10 },
  verifyTitleBox: { flexDirection: 'row', alignItems: 'center' },
});

export default ItemScreen;

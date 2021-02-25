import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ToastAndroid,
} from 'react-native';
import { Typography, Colors } from '../../styles';
import Button from '../../components/Button';
import StatusPill from '../../components/StatusPill';
import Arrow from '../../components/Arrow';
import { AppContext } from '../../context/AppContext';
import { Constants } from '../../utils';
import { PickerContext } from '../../context/PickerContext';
import VerifiedSVG from '../../assets/svg/VerifiedSVG';
import Loader from '../../components/Loader';
import formatAmPm from '../../utils/formatAmPm';
import TimerComponent from '../../components/TimerComponent';

const screenWidth = Math.round(Dimensions.get('window').width);
const w = screenWidth - 32;

const ItemScreen = ({
  navigation,
  route: {
    params: { orderId, item, timeLeft, startTime, endTime },
  },
}) => {
  const ss =
    (timeLeft
      ? new Date(timeLeft) - new Date() <= 0
        ? 0
        : new Date(timeLeft) - new Date()
      : 0) / 1000;
  const [timerOn, setTimerOn] = useState(item?.substitution_initiated);
  const [timeOut, setTimeOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const { setItemPicked } = useContext(PickerContext);

  const onManualEntry = async (itemsQty) => {
    setIsLoading(true);
    await setItemPicked(item?.id, item?.item_type, itemsQty).then(() => {
      navigation.pop();
    });
    setIsLoading(false);
  };
  item?.substitution_initiated && setTimerOn(true);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Loader fullScreen />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TimerComponent fullTimer ss={ss} />
        <ItemSection
          title={item?.name ? item?.name : Constants.emptyItemName}
          price={item?.price ? item.price.toFixed(2) : 0}
          quantity={item?.qty ? item?.qty : 0}
          position={item?.position ? item.position : Constants.emptyPosition}
          department={
            item?.department ? item?.department : Constants.emptyDepartment
          }
          type={item?.order_type ? item?.order_type : locale?.status?.SD}
          status={
            item?.picking_completed ? locale?.status?.PiC : locale?.status?.Pi
          }
          startTime={startTime}
          endTime={endTime}
          img={item?.image_url}
        />
        {item?.picker_checked ? (
          <VerifiedItem locale={locale} />
        ) : (
          <VerifyItemSection
            navigation={navigation}
            item={item}
            timeOut={timeOut}
            timerOn={timerOn}
            setTimerOn={() => {
              setTimerOn(true);
            }}
            setTimerOut={() => {
              setTimeOut(true);
              setTimerOn(false);
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

const ItemSection = ({
  title,
  price,
  quantity,
  position,
  department,
  type,
  status,
  startTime,
  endTime,
  img,
}) => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  const sTime = formatAmPm(startTime);
  const eTime = formatAmPm(endTime);
  return (
    <>
      <View style={styles.itemImageContainer}>
        <View style={styles.itemImage}>
          <Image
            source={{ uri: img }}
            resizeMode={'cover'}
            style={{ height: (1 * w) / 2, width: screenWidth - 64 }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 32 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <StatusPill
              backgroundColor="#A1C349"
              text={position}
              marginRight={10}
            />
            <StatusPill backgroundColor="#C5B171" text={department} />
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={Typography.bold21}>{title}</Text>
              <Text style={Typography.normal15}>{status}</Text>
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
              }}>
              <Text style={Typography.bold21}>${price}</Text>
              <Text> {locale?.IS_perQuantity}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.historyBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.deliveryStatusCircle} />
                <Text style={Typography.bold15}>{'Scheduled delivery'}</Text>
                {/* mock orderType */}
              </View>
              <View style={styles.deliverBoxRow2}>
                <Text>{sTime}</Text>
                <Arrow width={60} />
                {/* <Text> ------------> </Text> */}
                <Text>{eTime}</Text>
              </View>
            </View>
            <View style={styles.quantityPill}>
              <Text style={Typography.bold13White}>x</Text>
              <Text style={Typography.bold20White}>{quantity}</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const VerifyItemSection = ({
  navigation,
  item,
  setTimerOn,
  timeOut,
  timerOn,
  setTimerOut,
  onManualEntry,
  startTime,
  endTime,
}) => {
  const [status, setStatus] = useState(2);
  const someOutofStock = status === 1 || status === 3;
  const substituteItems = status === 1 || status === 0 || status === 3;
  const [itemsQty, setItemQty] = useState(0);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const onVerifyButton = () => {
    if (!itemsQty && status === 1) {
      ToastAndroid.show(locale?.IS_fieldIsEmpty, ToastAndroid.SHORT);
    } else if (
      // eslint-disable-next-line radix
      (itemsQty === '0' || parseInt(itemsQty) >= item?.qty) &&
      status === 1
    ) {
      ToastAndroid.show(locale?.invalidValue, ToastAndroid.SHORT);
    } else {
      const qtys = item?.qty ? item?.qty : 0;
      const requiredQty = status === 0 ? qtys : isNaN(itemsQty) ? 0 : itemsQty;
      const existingQty =
        qtys === 0 ? qtys : status === 0 ? qtys : qtys - requiredQty;

      const routeTo = item.substituted
        ? 'SubstitutionDetailsScreen'
        : timeOut
        ? 'ContactFCMScreen'
        : 'SubstitutesScreen';
      routeTo !== 'ContactFCMScreen' &&
        navigation.navigate(routeTo, {
          item,
          orderId: item.orderId,
          existingQty,
          requiredQty,
          startTime,
          endTime,
        });
    }
  };
  return (
    <>
      <Divider />
      <View style={{ marginHorizontal: 32 }}>
        {!timerOn && !timeOut && (
          <>
            <Text style={Typography.bold21}>{locale?.IS_verifyit}</Text>
            <Text style={{ marginVertical: 10 }}>{locale?.IS_verifyText}</Text>
            <RadioItem
              onPress={() => setStatus(2)}
              toggle={status === 2}
              title={locale?.IS_verifyOpt1}
            />
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
            <RadioItem
              onPress={() => setStatus(3)}
              toggle={status === 3}
              title={locale?.IS_critical}
            />
            {someOutofStock && (
              <TextInput
                placeholder={
                  status === 3
                    ? locale?.placeholder.critical
                    : locale?.placeholder.countOfOutStock
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
          </>
        )}

        <Divider />
        {substituteItems && status !== 3 ? (
          <>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={Typography.bold21}>
                {!timeOut
                  ? !item.substituted
                    ? timerOn
                      ? locale.IS_waitSubstituteTitle
                      : locale?.IS_substituteTitle
                    : locale?.IS_substitutedTitle
                  : locale?.IS_noRespSubstituteTitle}
              </Text>
              {!item.substituted && timerOn && (
                <TimerComponent
                  ss={Constants.awaitTime}
                  call={setTimerOut}
                  fullTimer
                  inMinute
                />
              )}
            </View>
            <Text style={{ marginVertical: 10 }}>
              {!timeOut
                ? !item.substituted
                  ? timerOn
                    ? locale?.IS_waitSubstituteText
                    : locale?.IS_substituteText
                  : locale?.IS_substitutedText
                : locale?.IS_noRespSubstituteText}
            </Text>
            {!timerOn && (
              <Button
                title={
                  item.substituted
                    ? locale?.IS_subDetailButton
                    : timeOut
                    ? locale?.IS_contactButton
                    : locale?.IS_substituteButton
                }
                style={{ flex: 0, width: 200, marginBottom: 20 }}
                onPress={onVerifyButton}
              />
            )}
          </>
        ) : (
          <>
            <Button
              scanButton
              title={locale?.IS_scanBar}
              subtitle={locale?.IS_toVerify}
              titleStyle={Typography.bold17White}
              style={{ padding: 30 }}
              onPress={() => {
                navigation.navigate('ScanScreen', {
                  totalItem: item?.qty,
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
          </>
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
  timerDivider: {
    height: '100%',
    width: 1,
    backgroundColor: Colors.WHITE,
    opacity: 0.25,
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
  itemImageContainer: {
    marginHorizontal: 32,
    marginBottom: 24,
    alignItems: 'center',
  },
  itemImage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.offWhite,
    height: (1 * w) / 2,
    width: screenWidth - 64,
    borderRadius: 7,
    overflow: 'hidden',
  },
  deliveryStatusCircle: {
    width: 14,
    height: 14,
    backgroundColor: '#889BFF',
    borderRadius: 14,
    marginRight: 10,
  },
  historyBox: {
    backgroundColor: Colors.offWhite,
    padding: 10,
    borderRadius: 7,
    height: 60,
    flex: 1,
  },
  quantityPill: {
    backgroundColor: Colors.secondaryRed,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 7,
    marginLeft: 10,
    height: 60,
  },
  flexDirectionRow: { flexDirection: 'row' },
  deliverBoxRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verifyBox: { paddingVertical: 10, paddingHorizontal: 32 },
  verifyTitle: { ...Typography.bold20, marginLeft: 20 },
  verifyText: { ...Typography.normal14, marginTop: 5, marginBottom: 10 },
  verifyTitleBox: { flexDirection: 'row', alignItems: 'center' },
});

export default ItemScreen;

import React, { createRef, useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import Button from '../../components/Button';
import { Typography, Colors, width } from '../../styles';
import useTimer from '../../hooks/useTimer';
import images from '../../assets/images';
import StatusPill from '../../components/StatusPill';
import Arrow from '../../components/Arrow';
import { AppContext } from '../../context/AppContext';
import { PackerContext } from '../../context/PackerContext';
import Divider from '../../components/Divider';
import VerifiedSVG from '../../assets/svg/VerifiedSVG';
import Loader from '../../components/Loader';
import TimerComponent from '../../components/TimerComponent';
import formatAmPm from '../../utils/formatAmPm';
import { Constants } from '../../utils';
import DropDown from '../../components/DropDown';

const screenWidth = width;
const w = width - 32;
const ItemScreen = ({
  route: {
    params: { item, orderId, time_slot, order_type, timeLeft },
  },
  navigation,
}) => {
  const containerRef = createRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const start = time_slot?.start_time;
  const end = time_slot?.end_time;
  const timer = timeLeft
    ? new Date(timeLeft) <= new Date()
      ? 0
      : new Date(timeLeft) / 1000 - new Date() / 1000
    : 0;

  const {
    locale: { locale },
  } = useContext(AppContext);
  const { postRePick, setPackedItemAsMarked, getPackerOrderList } = useContext(
    PackerContext,
  );

  const onManualEntry = async () => {
    setIsLoading(true);
    try {
      await setPackedItemAsMarked(item?.id, item?.item_type).then(async () => {
        await getPackerOrderList();
        navigation.navigate('ItemSuccessScreen');
      });
    } catch {}
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
    <SafeAreaView
      ref={(r) => (containerRef.current = r?.props)}
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TimerComponent fullTimer ss={timer} />
        <ItemSection
          title={item?.name ? item?.name : Constants.emptyItemName}
          price={item?.price ? item?.price : 0}
          quantity={
            item?.qty
              ? item?.qty
              : item?.repick_qty
              ? item?.total_qty - item?.repick_qty
              : 1
          }
          position={item?.position}
          department={item?.department}
          status={
            item?.packing_completed
              ? locale?.status.PaC
              : item?.repick_completed === false
              ? locale?.status?.ri
              : item?.repick_completed
              ? locale?.status?.rc
              : locale?.status.Pa
          }
          type={order_type ? order_type : locale?.status.SD}
          start_time={formatAmPm(start)}
          end_time={formatAmPm(end)}
          img={item?.image_url}
        />
        <View style={styles.skuBox}>
          <Text>SKU : {item?.sku ? item?.sku : Constants.emptySku}</Text>
          {/* mock orderType */}
        </View>
        {item?.packer_checked ? (
          <VerifiedItem locale={locale} />
        ) : (
          // (item?.repick_completed === undefined || item?.repick_completed) && (
          <VerifyItemSection
            containerRef={containerRef.current}
            item={item}
            orderId={orderId}
            navigation={navigation}
            postRePick={postRePick}
            onManualEntry={onManualEntry}
            getPackerOrderList={getPackerOrderList}
          />
          // )
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
  status,
  type,
  start_time,
  img,
  end_time,
}) => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  return (
    <>
      <View style={styles.itemImageContainer}>
        <View style={styles.itemImage}>
          <Image
            source={{ uri: img }}
            resizeMode={'contain'}
            style={{ height: (1 * w) / 2, width: screenWidth - 64 }}
          />
        </View>
      </View>
      <View style={styles.itemContentBox}>
        <View style={styles.itemContentSubBox}>
          {(position || department) && (
            <View style={styles.statusBox}>
              {position && (
                <StatusPill
                  backgroundColor="#A1C349"
                  text={position}
                  marginRight={10}
                />
              )}
              {department && (
                <StatusPill backgroundColor="#C5B171" text={department} />
              )}
            </View>
          )}
          <View style={styles.itemBox}>
            <View style={styles.itemTitleBox}>
              <Text style={Typography.bold21}>{title}</Text>
              <Text style={Typography.normal15}>{status}</Text>
            </View>
            <View style={styles.priceBox}>
              <Text style={Typography.bold21}>
                ${price ? price?.toFixed(2) : 0}
              </Text>
              <Text>{locale?.IS_perQuantity}</Text>
            </View>
          </View>
          <View style={styles.timeBox}>
            <View style={styles.historyBox}>
              <View style={styles.orderTypeBox}>
                <View style={styles.deliveryStatusCircle} />
                <Text style={Typography.bold15}>{'Scheduled delivery'}</Text>
                {/*mock orderType*/}
              </View>
              <View style={styles.deliverBoxRow2}>
                <Text>{start_time}</Text>
                <Arrow />
                {/* <Text> ------------> </Text> */}
                <Text>{end_time}</Text>
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
  item,
  navigation,
  containerRef,
  postRePick,
  orderId,
  onManualEntry,
  getPackerOrderList,
}) => {
  const qty = item?.qty
    ? item?.qty
    : item?.repick_qty
    ? item?.total_qty - item?.repick_qty
    : 1;
  const generateArray = (element) =>
    Array.apply(null, Array(qty)).map((itm) => element);

  const [isRePickLoading, setIsRePickLoading] = useState(false);
  const [passItem, setPassItem] = useState(generateArray(true));
  const [issue, setIssue] = useState(generateArray('no issue selected'));
  const [showDropDown, setShowDropDown] = useState(generateArray(false));
  const [currentDropDown, setCurrentDropDown] = useState(0);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const issueList = [
    { label: locale?.reviews.opt1, value: 'Physical damage' },
    { label: locale?.reviews.opt2, value: 'Package broken' },
    { label: locale?.reviews.opt3, value: 'Expired product' },
  ];
  const onCheckPass = (val, index) => {
    passItem[index] = val;
    passItem[index] && onSetIssue('no issue selected', index);
    setPassItem([...passItem]);
  };
  const onShowDropDown = (val, index) => {
    showDropDown[index] = val;
    setShowDropDown([...showDropDown]);
    setCurrentDropDown(index);
  };
  const onSetIssue = (val, index) => {
    issue[index] = val;
    setIssue([...issue]);
    onShowDropDown(false, index);
  };
  containerRef?.onTouchEnd(
    (e) =>
      e.nativeEvent.touches &&
      showDropDown[currentDropDown] &&
      onShowDropDown(false, currentDropDown),
  );

  const onRePick = async () => {
    setIsRePickLoading(true);
    const good_qty = issue.filter((i) => i === 'no issue selected').length;
    const pass_item = passItem.filter((i) => i === true).length;
    if (good_qty !== pass_item) {
      ToastAndroid.show(locale?.IS_reviewFailed, ToastAndroid.SHORT);
      setIsRePickLoading(false);
      return;
    }
    const bad_qty = qty - good_qty;
    const payload = {
      bad_reviews: issue,
      good_qty,
      bad_qty,
      item_type: item?.item_type,
    };
    try {
      await postRePick(payload, item?.id);
      navigation.navigate('RepickSuccessScreen');
      await getPackerOrderList();
    } catch {
      if (item?.repick_completed) {
        ToastAndroid.show(locale?.error?.repicked, ToastAndroid.SHORT);
      } else if (item?.repick_completed === false) {
        ToastAndroid.show(locale?.error?.repicking, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
      }
      setIsRePickLoading(false);
    }
    setIsRePickLoading(false);
  };

  return (
    <>
      <Divider />
      <View style={styles.reviewBox}>
        <Text style={styles.reviewTitle}>{locale?.IS_reviewit}</Text>
        <Text style={styles.reviewText}>{locale?.IS_reviewText}</Text>
        {passItem.map((itm, index) => (
          <View key={index}>
            <View style={styles.reviewItemBox}>
              <Text style={{ ...Typography.bold13 }}>
                {locale?.item} {index + 1}
              </Text>
              <View style={styles.reviewTouchBox}>
                <TouchableOpacity onPress={() => onCheckPass(true, index)}>
                  <View
                    style={[
                      styles.passTextBox,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {
                        backgroundColor: itm
                          ? Colors.primaryGreen
                          : 'rgba(0,0,0,0)',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.textCenter,
                        itm
                          ? { ...Typography.bold13White }
                          : { ...Typography.bold13 },
                      ]}>
                      {locale?.pass}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onCheckPass(false, index)}>
                  <View
                    style={[
                      styles.failTextBox,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {
                        backgroundColor: itm
                          ? 'rgba(0,0,0,0)'
                          : Colors.secondaryRed,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.textCenter,
                        !itm
                          ? { ...Typography.bold13White }
                          : { ...Typography.bold13 },
                      ]}>
                      {locale?.fail}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {!passItem[index] && (
              <DropDown
                showDropDown={showDropDown}
                onShowDropDown={onShowDropDown}
                index={index}
                issue={issue}
                list={issueList}
                onSetIssue={onSetIssue}
              />
            )}
          </View>
        ))}
      </View>

      <Divider />
      {passItem.indexOf(false) <= -1 ? (
        <>
          <Button
            scanButton
            title={locale?.IS_scanBar}
            subtitle={locale?.IS_toVerify}
            titleStyle={Typography.bold17White}
            style={styles.scanButton}
            onPress={() => {
              navigation.navigate('ScanScreen', {
                item,
                orderId: item?.orderId,
                barcodeId: item?.barcode,
              });
            }}
          />
          <View style={styles.scanFailedBox}>
            <Text>{locale?.IS_scanFailed}</Text>
            <TouchableOpacity onPress={onManualEntry}>
              <Text style={styles.scanManualText}>{locale?.IS_scanManual}</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.rePickBox}>
          <Text style={styles.rePickTitle}>{locale?.IS_reviewit}</Text>
          <Text style={styles.rePickText}>{locale?.IS_reviewText}</Text>
          <Button
            loading={isRePickLoading}
            title={locale?.IS_askTo}
            style={styles.rePickButton}
            onPress={async () => {
              await onRePick();
            }}
          />
        </View>
      )}
    </>
  );
};

const VerifiedItem = ({ locale }) => {
  return (
    <>
      <Divider />
      <View style={[styles.rePickBox, { marginTop: 10 }]}>
        <View style={styles.verifyTitleBox}>
          <VerifiedSVG />
          <Text style={[styles.rePickTitle, styles.marginLeft20]}>
            {locale?.IS_verifiedTitle}
          </Text>
        </View>
        <Text style={styles.rePickText}>{locale?.IS_verifiedText}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  loading: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.WHITE,
  },
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
    marginBottom: 20,
    marginHorizontal: 32,
    justifyContent: 'center',
    flexWrap: 'wrap',
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
  //itemSection
  itemContentBox: { flexDirection: 'row', marginHorizontal: 32 },
  itemContentSubBox: { flex: 1 },
  statusBox: { flexDirection: 'row' },
  itemBox: { flexDirection: 'row', marginVertical: 10 },
  itemTitleBox: { flex: 1 },
  priceBox: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  orderTypeBox: { flexDirection: 'row', alignItems: 'center' },
  //verification
  reviewBox: { paddingVertical: 20, paddingHorizontal: 32 },
  reviewTitle: { ...Typography.bold20 },
  reviewText: { ...Typography.normal12, marginTop: 5, marginBottom: 10 },
  reviewItemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  reviewTouchBox: {
    borderColor: Colors.primary4,
    borderWidth: 0.5,
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    height: 40,
    width: 200,
    overflow: 'hidden',
  },
  passTextBox: {
    borderRadius: 7,

    height: '100%',
    width: 100,
    justifyContent: 'center',
  },
  failTextBox: {
    borderRadius: 7,
    height: '100%',
    width: 100,
    justifyContent: 'center',
  },
  textCenter: { textAlign: 'center' },
  dropBox: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dropDefaultBox: { alignSelf: 'flex-end' },
  dropDefaultItemBox: {
    borderColor: Colors.primary4,
    borderWidth: 0.5,
    borderRadius: 10,
    height: 40,
    width: 200,
  },
  dropDefaultItemText: {
    textAlignVertical: 'center',
    height: '100%',
    marginLeft: 35,
    ...Typography.bold13,
  },
  dropListBox: {
    position: 'absolute',
    elevation: 10,
    backgroundColor: '#fff',
    width: 190,
    height: 'auto',
    alignSelf: 'center',
    marginTop: 40,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    zIndex: 20,
  },
  dropTouch: { height: 50, width: '100%', zIndex: 20 },
  dropListItemBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    zIndex: 20,
  },
  dropLabelText: {
    paddingLeft: 30,
    width: '100%',
    ...Typography.norma13,
  },
  scanButton: { padding: 30, margin: 32 },
  scanFailedBox: { alignItems: 'center', paddingVertical: 20 },
  scanManualText: {
    textDecorationLine: 'underline',
    ...Typography.bold17,
    color: Colors.secondaryRed,
  },
  rePickBox: { paddingVertical: 10, paddingHorizontal: 32 },
  rePickTitle: { ...Typography.bold20 },
  rePickText: { ...Typography.normal14, marginTop: 5, marginBottom: 10 },
  rePickButton: { width: 180, marginVertical: 20 },
  marginLeft20: { marginLeft: 20 },
  verifyTitleBox: { flexDirection: 'row', alignItems: 'center' },
});

export default ItemScreen;

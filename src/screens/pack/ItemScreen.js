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

function formatAmPm(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var AmPm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + AmPm;
  return strTime;
}

const screenWidth = width;
const w = width - 32;
const ItemScreen = ({
  route: {
    params: { item, orderId, time_slot, order_type },
  },
  navigation,
}) => {
  const containerRef = createRef(null);

  const start = new Date(time_slot?.end_time).valueOf();
  const end = new Date(time_slot?.end_time).valueOf();
  const timer = useTimer(start - end);

  // const {
  //   locale: { locale },
  // } = useContext(AppContext);
  const { postRePick } = useContext(PackerContext);

  return (
    <SafeAreaView
      ref={(r) => (containerRef.current = r?.props)}
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TimerComponent ss={timer} />
        <ItemSection
          title={item?.name}
          price={item?.price}
          quantity={item?.qty}
          position={item?.position}
          department={item?.department}
          status={'Packing now'}
          type={order_type}
          start_time={formatAmPm(new Date(start))}
          end_time={formatAmPm(new Date(end))}
        />
        <VerifyItemSection
          containerRef={containerRef.current}
          item={item}
          navigation={navigation}
          postRePick={postRePick}
        />
      </ScrollView>
    </SafeAreaView>
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
  const {
    locale: { locale },
  } = useContext(AppContext);
  return (
    <View style={styles.timerContainer}>
      <Text style={Typography.bold17White}>{locale?.timeRemain}</Text>
      <View style={styles.timerDivider} />
      <Text style={Typography.bold17White}>
        {HoursString}:{minutesString} Hrs
      </Text>
    </View>
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
            source={images.colgate}
            resizeMode={'contain'}
            style={{ height: (1 * w) / 2, width: screenWidth - 64 }}
          />
        </View>
      </View>
      <View style={styles.itemContentBox}>
        <View style={styles.itemContentSubBox}>
          <View style={styles.statusBox}>
            <StatusPill
              backgroundColor="#A1C349"
              text={position}
              marginRight={10}
            />
            <StatusPill backgroundColor="#C5B171" text={department} />
          </View>
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
                <Text style={Typography.bold15}>{type}</Text>
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

const VerifyItemSection = ({ item, navigation, containerRef, postRePick }) => {
  const generateArray = (element) =>
    Array.apply(null, Array(item.qty)).map((itm) => element);

  const [passItem, setPassItem] = useState(generateArray(true));
  const [issue, setIssue] = useState(generateArray('Good quality'));
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
    const good_qty = issue.filter((i) => i === 'Good quality').length;
    const bad_qty = issue.length - good_qty;
    const payload = {
      bad_reviews: issue,
      good_qty,
      bad_qty,
    };
    await postRePick(payload, item._id);
    navigation.navigate('RepickSuccessScreen');
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
                        backgroundColor: item
                          ? Colors.primaryGreen
                          : 'rgba(0,0,0,0)',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.textCenter,
                        item
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
                        backgroundColor: item
                          ? 'rgba(0,0,0,0)'
                          : Colors.secondaryRed,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.textCenter,
                        !item
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
              <View style={styles.dropBox}>
                <Text style={{ ...Typography.normal12 }}>
                  {locale?.IS_reviewit}
                </Text>
                <View style={styles.dropDefaultBox}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      onShowDropDown(!showDropDown[index], index);
                    }}>
                    <View style={styles.dropDefaultItemBox}>
                      <Text style={styles.dropDefaultItemText}>
                        {issue[index]}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  {showDropDown[index] && (
                    <View style={styles.dropListBox}>
                      {issueList.map((elem, key) => (
                        <TouchableOpacity
                          key={key}
                          onPress={() => {
                            onSetIssue(elem.value, index);
                          }}
                          style={styles.dropTouch}>
                          <View
                            style={[
                              styles.dropListItemBox,
                              item.value === issue[index] && {
                                backgroundColor: Colors.offWhite,
                              },
                            ]}>
                            <Text style={styles.dropLabelText}>
                              {elem.label}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>
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
              navigation.navigate('ScanScreen', { item });
            }}
          />
          <View style={styles.scanFailedBox}>
            <Text>{locale?.IS_scanFailed}</Text>
            <Text style={styles.scanManualText}>{locale?.IS_scanManual}</Text>
          </View>
        </>
      ) : (
        <View style={styles.rePickBox}>
          <Text style={styles.rePickTitle}>{locale?.IS_reviewit}</Text>
          <Text style={styles.rePickText}>{locale?.IS_reviewText}</Text>
          <Button
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

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
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
  reviewTitle: { fontWeight: 'bold', fontSize: 20 },
  reviewText: { fontSize: 14, marginTop: 5, marginBottom: 10 },
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
    fontSize: 13,
  },
  scanButton: { padding: 30, margin: 32 },
  scanFailedBox: { alignItems: 'center', paddingVertical: 20 },
  scanManualText: {
    textDecorationLine: 'underline',
    ...Typography.bold17,
    color: Colors.secondaryRed,
  },
  rePickBox: { paddingVertical: 10, paddingHorizontal: 32 },
  rePickTitle: { fontWeight: 'bold', fontSize: 20 },
  rePickText: { fontSize: 14, marginTop: 5, marginBottom: 10 },
  rePickButton: { width: 180, marginVertical: 20 },
});

export default ItemScreen;

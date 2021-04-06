import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppContext } from '../context/AppContext';
import { Colors, Typography } from '../styles';
import Button from './Button';
import Divider from './Divider';
import DropDown from './DropDown';

const PackerVerifyItemSection = ({
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
    { label: locale?.reviews.opt4, value: 'No item' },
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
      {item?.repick_completed === undefined && (
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
        </>
      )}
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

const styles = StyleSheet.create({
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
});

export default PackerVerifyItemSection;

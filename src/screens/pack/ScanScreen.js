import React, { useContext, useState } from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Colors, Typography } from '../../styles';
import * as Progress from 'react-native-progress';
import { AppContext } from '../../context/AppContext';
import { PackerContext } from '../../context/PackerContext';
import Button from '../../components/Button';
import ModalComponent from '../../components/ModalComponent';
import Loader from '../../components/Loader';

const ScanScreen = ({
  navigation,
  route: {
    params: {
      item,
      item: { qty, id, item_type },
      orderId = '#',
      barcodeId,
    },
  },
}) => {
  const totalItem = qty ? qty : item?.repick_qty ? item?.total_qty : null;
  const [itemScanned, setItemScanned] = useState(0);
  // const [barcodeArray, setBarcodeArray] = useState([]);
  const [showMismatchModal, setMismatchModal] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [loading, setLoader] = useState(false);

  const {
    locale: { locale },
  } = useContext(AppContext);
  const { setPackedItemAsMarked, orderList, getPackerOrderList } = useContext(
    PackerContext,
  );

  const onScanMismatch = async () => {
    setMismatchModal(false);
    const temp = itemScanned + 1;
    if (temp / totalItem >= 1) {
      setItemScanned(temp);
      await onComplete();
    } else {
      setItemScanned(temp);
    }
  };

  const onScan = async (barcode) => {
    if (barcode?.data?.length !== 0) {
      if (totalItem) {
        await onItemScan(barcode);
      } else if (!totalItem) {
        await onBinScanner(barcode);
      }
    }
  };

  const onItemScan = async (barcode) => {
    // const temp = barcodeArray.indexOf(barcode?.data) > -1;
    const success = itemScanned + 1;
    if (!showSuccessModal && barcodeId === barcode?.data) {
      if (success / totalItem >= 1) {
        setItemScanned(success);
        await onComplete();
      } else {
        setItemScanned(success);
        setSuccessModal(true);
        // setBarcodeArray([...barcodeArray, barcode?.data]);
      }
    } else {
      setMismatchModal(true);
    }
  };

  const onComplete = async () => {
    setLoader(true);
    try {
      await setPackedItemAsMarked(id, item_type).then(async () => {
        await getPackerOrderList();
        navigation.navigate('ItemSuccessScreen');
      });
    } catch (e) {
      setLoader(false);
    }
  };

  const onBinScanner = async (barcode) => {
    let i = null;
    for (let j = 0; j < orderList?.length; j++) {
      if (barcode?.data === orderList[j]?.sales_incremental_id) {
        i = j;
        break;
      }
    }
    await Linking.openURL('http://com.nesto.store/PackScreen/' + i);
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      {loading ? (
        <Loader fullScreen />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            margin: 30,
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            {orderId === '#' && (
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 20,
                  ...Typography.bold20,
                }}>
                {locale?.SS_scanbar}
              </Text>
            )}
            <Text
              style={{
                textAlign: 'center',
                // marginTop: 10,
                borderWidth: 0.5,
                color: Colors.lightGray,
                borderColor: Colors.lightGray,
                ...Typography.normal12,
                padding: 10,
              }}>
              {locale?.SS_scanbarText}
            </Text>
          </View>
          <View
            style={{
              height: 'auto',
              width: '80%',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
            }}>
            <RNCamera
              style={{ height: '35%', width: '80%' }}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: locale?.SS_permitTitle,
                message: locale?.SS_permitText,
                buttonPositive: locale?.ok,
                buttonNegative: locale?.cancel,
              }}
              notAuthorizedView={
                <View
                  style={{
                    height: '35%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Button
                    title={locale?.SS_enableCam}
                    onPress={() => Linking.openSettings()}
                  />
                </View>
              }
              captureAudio={false}
              onBarCodeRead={onScan}
            />
            <BarCodeMask />
          </View>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              color: Colors.lightGray,
              ...Typography.normal12,
            }}>
            {locale?.SS_scanningCode} ...
          </Text>
          {totalItem && (
            <>
              <View
                style={{
                  height: 40,
                  width: 200,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Progress.Bar
                  progress={itemScanned / totalItem}
                  height={30}
                  width={200}
                  color="#c9d1ff"
                />
                <Text
                  style={{
                    position: 'absolute',
                    height: '99%',
                    width: '100%',
                    textAlignVertical: 'center',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  {locale?.SS_scanning} {itemScanned} of {totalItem}
                </Text>
              </View>
              <View>
                <LinkButton
                  title={locale?.SS_scanmis}
                  onPress={() => setMismatchModal(true)}
                  onLongPress={
                    () => ToastAndroid.show(barcodeId, ToastAndroid.SHORT) //mock
                  }
                />
              </View>
            </>
          )}
        </ScrollView>
      )}
      <ModalComponent
        visible={showMismatchModal || showSuccessModal}
        title={showSuccessModal ? null : locale?.SS_alertTitle}
        text={showSuccessModal ? locale?.SS_success : locale?.SS_alertText}
        button1Text={showSuccessModal ? locale?.ok : locale?.SS_alertopt1}
        button2Text={showSuccessModal ? null : locale?.SS_alertopt2}
        onButton1Press={() => {
          setSuccessModal(false);
          setMismatchModal(false);
        }}
        onButton2Press={showSuccessModal ? null : onScanMismatch}
      />
    </SafeAreaView>
  );
};

const BarCodeMask = () => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: 20,
          left: 40,
          backgroundColor: '#566ae6',
          height: 3,
          width: 40,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 20,
          left: 40,
          backgroundColor: '#566ae6',
          height: 40,
          width: 3,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 40,
          backgroundColor: '#566ae6',
          height: 3,
          width: 40,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 40,
          backgroundColor: '#566ae6',
          height: 40,
          width: 3,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 20,
          right: 40,
          backgroundColor: '#566ae6',
          height: 3,
          width: 40,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 20,
          right: 40,
          backgroundColor: '#566ae6',
          height: 40,
          width: 3,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 40,
          backgroundColor: '#566ae6',
          height: 3,
          width: 40,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 40,
          backgroundColor: '#566ae6',
          height: 40,
          width: 3,
        }}
      />
    </>
  );
};

const LinkButton = ({ title, onPress, style, onLongPress }) => (
  <TouchableOpacity
    style={[{ backgroundColor: 'rgba(0,0,0,0)' }, style]}
    onPress={onPress}
    onLongPress={onLongPress}
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
    <Text style={{ color: Colors.secondaryRed, ...Typography.normal12 }}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default ScanScreen;

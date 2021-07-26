import React, { useContext, useState } from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
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
import TouchLink from '../../components/TouchLink';
import BarcodeMask from '../../components/BarcodeMask';

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
  const [barcodeCount, setBarcodeCount] = useState(0);

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
      await onComplete(barcodeCount);
    } else {
      setItemScanned(temp);
    }
  };

  const onScan = async (barcode) => {
    if (barcode?.data?.length !== 0) {
      await (totalItem ? onItemScan : onBinScanner)(barcode);
    }
  };

  const onItemScan = async (barcode) => {
    // const temp = barcodeArray.indexOf(barcode?.data) > -1;
    const success = itemScanned + 1;
    if (!showSuccessModal && barcodeId === barcode?.data) {
      const _barcodeCount = barcodeCount + 1;
      setBarcodeCount(_barcodeCount);
      if (success / totalItem >= 1) {
        setItemScanned(success);
        await onComplete(_barcodeCount);
      } else {
        setItemScanned(success);
        setSuccessModal(true);
        // setBarcodeArray([...barcodeArray, barcode?.data]);
      }
    } else {
      setMismatchModal(true);
    }
  };

  const onComplete = async (_barcodeCount) => {
    setLoader(true);
    try {
      await setPackedItemAsMarked(
        id,
        item_type,
        parseInt(totalItem, 10) - _barcodeCount,
        _barcodeCount,
      ).then(async () => {
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
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loader fullScreen />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <View>
            {orderId === '#' && (
              <Text style={styles.scanBar}>{locale?.SS_scanbar}</Text>
            )}
            <Text style={styles.scanBarText}>{locale?.SS_scanbarText}</Text>
          </View>
          <View style={styles.cameraBox}>
            <RNCamera
              style={styles.camera}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: locale?.SS_permitTitle,
                message: locale?.SS_permitText,
                buttonPositive: locale?.ok,
                buttonNegative: locale?.cancel,
              }}
              notAuthorizedView={
                <View style={styles.notPermittedBox}>
                  <Button
                    title={locale?.SS_enableCam}
                    onPress={() => Linking.openSettings()}
                  />
                </View>
              }
              captureAudio={false}
              onBarCodeRead={onScan}
            />
            <BarcodeMask />
          </View>
          <Text style={styles.scanningText}>{locale?.SS_scanningCode} ...</Text>
          {totalItem && (
            <>
              <View style={styles.progressBox}>
                <Progress.Bar
                  progress={itemScanned / totalItem}
                  height={30}
                  width={200}
                  color={Colors.progress}
                />
                <Text style={styles.itemScannedText}>
                  {locale?.SS_scanning} {itemScanned} of {totalItem}
                </Text>
              </View>
              <View>
                <TouchLink
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

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  contentContainer: {
    margin: 30,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scanBarText: {
    textAlign: 'center',
    // marginTop: 10,
    borderWidth: 0.5,
    color: Colors.lightGray,
    borderColor: Colors.lightGray,
    ...Typography.normal12,
    padding: 10,
  },
  cameraBox: {
    height: '35%',
    width: '100%',
    marginVertical: 20,
  },
  camera: {
    flex: 1,
    overflow: 'hidden',
  },
  notPermittedBox: {
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningText: {
    textAlign: 'center',
    marginTop: 10,
    color: Colors.lightGray,
    ...Typography.normal12,
  },
  progressBox: {
    height: 40,
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  itemScannedText: {
    position: 'absolute',
    height: '99%',
    width: '100%',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  scanBar: {
    textAlign: 'center',
    marginBottom: 20,
    ...Typography.bold20,
  },
});

export default ScanScreen;

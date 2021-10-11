import React, { useContext, useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ToastAndroid,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';
import * as Progress from 'react-native-progress';

import { Colors } from '../../styles';
import Button from '../../components/Button';
import { AppContext } from '../../context/AppContext';
import { PickerContext } from '../../context/PickerContext';
import ModalComponent from '../../components/ModalComponent';
import Loader from '../../components/Loader';
import TouchLink from '../../components/TouchLink';
import {
  registerBroadcastReceiver,
  determineVersion,
  triggerScan,
  broadcastReceiver,
} from '../../utils/Scanner';

const SEARCHING = 'SEARCHING';
const WRONG_VERSION = 'WRONG_VERSION';

/**
 * Screen for scanning and verifying barcodes of items that are being picked
 */
const ScanScreen = ({
  navigation,
  route: {
    params: { totalItem, itemId, itemType, criticalQty, barcodeId },
  },
}) => {
  const [itemScanned, setItemScanned] = useState(0);
  const [showMismatchModal, setMismatchModal] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [loading, setLoader] = useState(false);
  const [scannerState, setScannerState] = useState(SEARCHING);
  const [barcodeCount, setBarcodeCount] = useState(0);

  const {
    locale: { locale },
  } = useContext(AppContext);
  const { setItemPicked, getOrdersList, getDropList } = useContext(
    PickerContext,
  );

  /**
   * Scanning & decoding of barcode is handled by OS. Result is shared by intent.
   */
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      'datawedge_broadcast_intent',
      (intent) => broadcastReceiver(intent, onScan, setScannerState),
    );
    if (itemScanned === 0) {
      registerBroadcastReceiver();
      determineVersion();
    }
    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemScanned]);

  const onScanMismatch = async () => {
    const temp = itemScanned + 1;
    setMismatchModal(false);
    if (totalItem && temp / totalItem >= 1) {
      await onComplete(barcodeCount);
    } else {
      setItemScanned(temp);
    }
  };

  /**
   * Function to keep track scanning of multiple quantities of an item.
   * @param {string} barcode Scanned barcode
   */
  const onScan = async (barcode) => {
    if (
      totalItem &&
      !showSuccessModal &&
      itemScanned < totalItem &&
      barcode?.length !== 0 &&
      barcodeId === barcode
    ) {
      const success = itemScanned + 1;
      const _barcodeCount = barcodeCount + 1;
      setBarcodeCount(_barcodeCount);
      if (success / totalItem >= 1) {
        setItemScanned(success);
        await onComplete(_barcodeCount);
      } else {
        setItemScanned(success);
        setSuccessModal(true);
      }
    } else {
      setMismatchModal(true);
    }
  };

  /**
   * Function to mark an item as picked.
   * @param {string} _barcodeCount Count of quantities of an item that are scanned.
   */
  const onComplete = async (_barcodeCount) => {
    setLoader(true);
    try {
      await setItemPicked(
        itemId,
        itemType,
        criticalQty,
        parseInt(totalItem, 10) - _barcodeCount,
        _barcodeCount,
      ).then(async () => {
        await getOrdersList();
        await getDropList();
        navigation.navigate('ItemSuccessScreen');
      });
    } catch {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loader fullScreen />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
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
              <Button
                title={scannerState === SEARCHING ? 'Initializing...' : 'Scan'}
                onPress={triggerScan}
                disabled={
                  scannerState === WRONG_VERSION || scannerState === SEARCHING
                }
              />
              <View>
                <TouchLink
                  title={locale?.SS_scanmis}
                  onPress={() => setMismatchModal(true)}
                  onLongPress={() =>
                    ToastAndroid.show(barcodeId, ToastAndroid.SHORT)
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
        text={showSuccessModal ? locale?.SS_success : locale?.SS_alertTextPick}
        button1Text={showSuccessModal ? locale?.ok : locale?.SS_opt1Pick}
        button2Text={showSuccessModal ? null : locale?.SS_opt2Pick}
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
});
export default ScanScreen;

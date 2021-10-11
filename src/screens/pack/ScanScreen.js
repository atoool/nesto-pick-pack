import React, { useContext, useState, useEffect } from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  DeviceEventEmitter,
} from 'react-native';
import * as Progress from 'react-native-progress';
import { useIsFocused } from '@react-navigation/native';

import { Colors } from '../../styles';
import { AppContext } from '../../context/AppContext';
import { PackerContext } from '../../context/PackerContext';
import Button from '../../components/Button';
import ModalComponent from '../../components/ModalComponent';
import Loader from '../../components/Loader';
import TouchLink from '../../components/TouchLink';
import {
  determineVersion,
  triggerScan,
  broadcastReceiver,
} from '../../utils/Scanner';

const SEARCHING = 'SEARCHING';
const WRONG_VERSION = 'WRONG_VERSION';

/**
 * Screen for scanning barcodes and verifying items that are packed.
 */
const ScanScreen = ({
  navigation,
  route: {
    params: {
      item,
      item: { qty, id, item_type },
      barcodeId,
    },
  },
}) => {
  const totalItem = qty ? qty : item?.repick_qty ? item?.total_qty : null;
  const [itemScanned, setItemScanned] = useState(0);
  const [showMismatchModal, setMismatchModal] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [loading, setLoader] = useState(false);
  const [scannerState, setScannerState] = useState(SEARCHING);
  const [barcodeCount, setBarcodeCount] = useState(0);

  const {
    locale: { locale },
  } = useContext(AppContext);
  const { setPackedItemAsMarked, orderList, getPackerOrderList } = useContext(
    PackerContext,
  );

  const isFocused = useIsFocused();

  /**
   * Scanning & decoding of barcode is handled by OS. Result is shared by intent.
   */
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      'datawedge_broadcast_intent',
      (intent) => broadcastReceiver(intent, onScan, setScannerState),
    );
    if (itemScanned === 0) {
      determineVersion();
    }
    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemScanned, isFocused]);

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
    if (barcode?.length !== 0 && isFocused) {
      await (totalItem ? onItemScan : onBinScanner)(barcode);
    }
  };

  /**
   * Function to keep track scanning of multiple quantities of an item.
   * @param {string} barcode Scanned barcode
   */
  const onItemScan = async (barcode) => {
    const success = itemScanned + 1;
    if (!showSuccessModal && barcodeId === barcode) {
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
   * Function to mark an item as packing verified.
   * @param {string} _barcodeCount Count of quantities of an item that are scanned.
   */
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

  /**
   * Function for quickly showing an item in packed order list of PackScreen.
   * @param {string} barcode scanned barcode
   */
  const onBinScanner = async (barcode) => {
    let i = null;
    for (let j = 0; j < orderList?.length; j++) {
      if (barcode === orderList[j]?.sales_incremental_id) {
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
          <View style={styles.progressBox}>
            {totalItem && (
              <>
                <Progress.Bar
                  progress={itemScanned / totalItem}
                  height={30}
                  width={200}
                  color={Colors.progress}
                />
                <Text style={styles.itemScannedText}>
                  {locale?.SS_scanning} {itemScanned} of {totalItem}
                </Text>
              </>
            )}
          </View>
          <Button
            title={scannerState === SEARCHING ? 'Initializing...' : 'Scan'}
            onPress={triggerScan}
            disabled={
              scannerState === WRONG_VERSION || scannerState === SEARCHING
            }
          />
          <View>
            {totalItem && (
              <TouchLink
                title={locale?.SS_scanmis}
                onPress={() => setMismatchModal(true)}
                onLongPress={() =>
                  ToastAndroid.show(barcodeId, ToastAndroid.SHORT)
                }
              />
            )}
          </View>
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

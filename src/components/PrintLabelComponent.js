import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Share from 'react-native-share';
import Barcode from 'react-native-barcode-builder';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';
import { Colors, Typography } from '../styles';
import Loader from './Loader';

const PrintLabelComponent = ({ orderId, printLabelText }) => {
  useEffect(() => {
    //cons
  }, []);
  const printRef = useRef(null);
  const onPrintAction = () => {
    printRef.current.capture().then((uri) => {
      console.log('Print Image URL:', uri);
      sharePrint(uri);
    });
  };

  const sharePrint = async (url) => {
    const options = {
      message: orderId,
      url,
      title: `Print: ${orderId}`,
      type: 'image/jpg',
    };
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  return (
    <>
      <View style={styles.labelContainer}>
        <View style={styles.labelTextView}>
          {orderId ? (
            <ViewShot
              ref={(re) => {
                if (printRef) {
                  printRef.current = re;
                }
              }}
              options={{ format: 'jpg', quality: 0.9 }}>
              <>
                <Text style={styles.orderIdStyle}>#{orderId}</Text>
                <Barcode value={orderId} height={50} width={1} />
              </>
            </ViewShot>
          ) : (
            <Loader small />
          )}
        </View>
        <Text style={styles.printLabelText}>{printLabelText}</Text>
      </View>
      <TouchableOpacity onPress={onPrintAction}>
        <View style={styles.buttonContainer}>
          <Text style={styles.printText}>Print</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  labelTextView: { flex: 1 },
  labelContainer: {
    backgroundColor: Colors.secondaryRed,
    borderRadius: 12,
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: Colors.secondaryRed,
    borderRadius: 12,
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
    justifyContent: 'center',
  },
  printText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    ...Typography.bold16White,
  },
  barcode: { flex: 1 },
  printLabelText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    marginTop: 10,
    ...Typography.bold16White,
  },
  orderIdStyle: {
    ...Typography.bold16White,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    marginBottom: 10,
  },
});

export default PrintLabelComponent;

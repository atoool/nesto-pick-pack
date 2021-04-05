import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Barcode from 'react-native-barcode-builder';
// import ViewShot from 'react-native-view-shot';
import { Colors, Typography } from '../styles';
import Loader from './Loader';

const PrintLabelComponent = ({ orderId, printLabelText, viewShot }) => {
  return (
    <>
      <View style={styles.labelContainer}>
        <View style={styles.labelTextView}>
          {orderId ? (
            // <ViewShot
            //   ref={(re) => {
            //     if (viewShot) {
            //       viewShot.current = re;
            //     }
            //   }}
            //   options={{ format: 'jpg', quality: 0.9 }}>
            <>
              <Text style={styles.orderIdStyle}>#{orderId}</Text>
              <Barcode value={orderId} height={50} width={1} />
            </>
          ) : (
            // </ViewShot>
            <Loader small />
          )}
        </View>
        <Text style={styles.printLabelText}>{printLabelText}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    backgroundColor: Colors.secondaryRed,
    borderRadius: 12,
    alignItems: 'center',
    padding: 20,
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

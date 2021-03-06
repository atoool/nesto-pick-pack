import React, { createRef, useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  View,
  StyleSheet,
} from 'react-native';
import Barcode from 'react-native-barcode-builder';
import ViewShot from 'react-native-view-shot';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import { AppContext } from '../../context/AppContext';
import { Colors, Typography, width } from '../../styles';
import { Constants } from '../../utils';

const PrintLabelsScreen = ({ route: { params }, navigation }) => {
  const [orderId, setOrderId] = useState(params.orderId);
  const [bins, setBins] = useState('1');

  let viewShot = createRef(null);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const onChangeOrderId = (text) => {
    setOrderId(text);
  };

  const onChangeBins = (num) => {
    num.indexOf('.') === -1 &&
      num.indexOf(',') === -1 &&
      // eslint-disable-next-line radix
      parseInt(num) !== 0 &&
      setBins(num);
  };

  const onAssignBinPress = () => {
    if (bins !== '' && orderId && orderId !== '') {
      navigation.navigate('BinAssignScreen', {
        orderId,
        bins,
        sales_incremental_id: params?.sales_incremental_id,
      });
    } else {
      ToastAndroid.show(locale?.IS_fieldIsEmpty, ToastAndroid.SHORT);
    }
  };

  const onPrint = () => {
    // USBPrinter.printText('<C>sample text</C>\n');
    // if (viewShot.current) {
    //   viewShot.current.capture().then((uri) => {
    //     setBarcodeURI(uri);
    //   });
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <PrintLabelComponent
          orderIdLabel={locale?.BAS_order}
          printLabelText={locale?.BAS_printLabel}
          binCountLabel={locale?.BAS_howMany}
          orderId={params.sales_incremental_id}
          bins={bins}
          onChangeOrderId={onChangeOrderId}
          onChangeBins={onChangeBins}
          viewShot={viewShot}
        />
        <Button
          disabled={orderId === ''}
          title={locale?.PLS_printLabel}
          style={styles.printBtnBaseStyle}
          onPress={onPrint}
        />
        <Button
          title={locale?.PLS_assignBin}
          onPress={onAssignBinPress}
          style={styles.assignBtnBaseStyle}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const PrintLabelComponent = ({
  onChangeBins,
  orderId,
  bins,
  binCountLabel,
  printLabelText,
  viewShot,
}) => {
  return (
    <>
      <View style={styles.labelContainer}>
        <View style={styles.labelTextView}>
          {orderId ? (
            <ViewShot
              ref={(re) => {
                if (viewShot) {
                  viewShot.current = re;
                }
              }}
              options={{ format: 'jpg', quality: 0.9 }}>
              <Text style={styles.orderIdStyle}>#{orderId}</Text>
              <Barcode value={orderId} height={50} width={1} />
            </ViewShot>
          ) : (
            <Loader small green />
          )}
        </View>
        <Text style={styles.printLabelText}>{printLabelText}</Text>
      </View>

      <InputWithLabel
        iconName="CartSVG"
        label={binCountLabel}
        top={30}
        keyboard={'numeric'}
        value={bins}
        onChangeText={onChangeBins}
        maxLength={Constants.binsNeededLimit}
      />
    </>
  );
};

const InputWithLabel = ({
  label,
  top,
  onChangeText,
  value,
  keyboard,
  iconName,
  maxLength,
}) => {
  return (
    <View style={[styles.labelTextView, { marginTop: top }]}>
      <Text style={{ color: Colors.darkText, ...Typography.bold16 }}>
        {label}
      </Text>
      <Input
        iconName={iconName}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboard}
        maxLength={maxLength}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  scrollView: { margin: 30, paddingBottom: 60 },
  //printLabelComponent
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
  //inputWithLabel
  labelTextView: { flex: 1 },
  labelText: { color: Colors.darkText, ...Typography.bold16 },
  inputStyle: { marginTop: 5 },
  orderIdStyle: {
    ...Typography.bold16White,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    marginBottom: 10,
  },
  printBtnBaseStyle: { marginVertical: 20, borderRadius: 7, width: width - 60 },
  assignBtnBaseStyle: { marginVertical: 0, borderRadius: 7, width: width - 60 },
});

export default PrintLabelsScreen;

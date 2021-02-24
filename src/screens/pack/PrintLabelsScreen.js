import React, { createRef, useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import Barcode from 'react-native-barcode-builder';
import ViewShot from 'react-native-view-shot';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import { AppContext } from '../../context/AppContext';
import { Colors, Typography, width } from '../../styles';
import {
  USBPrinter,
  NetPrinter,
  BLEPrinter,
} from 'react-native-thermal-receipt-printer';
import { Constants } from '../../utils';

const PrintLabelsScreen = ({ route: { params }, navigation }) => {
  const [orderId, setOrderId] = useState(params.orderId);
  const [bins, setBins] = useState('1');
  const [barcodeURI, setBarcodeURI] = useState(null);

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
      navigation.navigate('BinAssignScreen', { orderId, bins });
    } else {
      ToastAndroid.show(locale?.IS_fieldIsEmpty, ToastAndroid.SHORT);
    }
  };

  const onPrint = () => {
    // USBPrinter.printText('<C>sample text</C>\n');

    if (viewShot.current) {
      viewShot.current.capture().then((uri) => {
        setBarcodeURI(uri);
      });
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 30, paddingBottom: 60 }}>
        <PrintLabelComponent
          orderIdLabel={locale?.BAS_order}
          printLabelText={locale?.BAS_printLabel}
          binCountLabel={locale?.BAS_howMany}
          orderId={orderId}
          bins={bins}
          onChangeOrderId={onChangeOrderId}
          onChangeBins={onChangeBins}
          viewShot={viewShot}
        />
        <Button
          disabled={orderId === ''}
          title={locale?.PLS_printLabel}
          style={{ marginVertical: 20, borderRadius: 7, width: width - 60 }}
          onPress={onPrint}
        />
        <Button
          title={locale?.PLS_assignBin}
          onPress={onAssignBinPress}
          style={{ marginVertical: 0, borderRadius: 7, width: width - 60 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const PrintLabelComponent = ({
  onChangeOrderId,
  onChangeBins,
  orderId,
  bins,
  hide,
  binCountLabel,
  orderIdLabel,
  printLabelText,
  viewShot,
}) => {
  return (
    <>
      <View
        style={{
          backgroundColor: Colors.secondaryRed,
          borderRadius: 12,
          alignItems: 'center',
          padding: 40,
        }}>
        <View style={{ flex: 1 }}>
          {orderId ? (
            <ViewShot
              ref={(re) => {
                if (viewShot) {
                  viewShot.current = re;
                }
              }}
              options={{ format: 'jpg', quality: 0.9 }}>
              <Barcode value={orderId} height={50} width={1} />
            </ViewShot>
          ) : (
            <Loader small green />
          )}
        </View>
        <Text
          style={{
            ...Typography.bold16White,
            flex: 1,
            textAlign: 'center',
            textAlignVertical: 'bottom',
            marginTop: 20,
          }}>
          {printLabelText}
        </Text>
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
      {!hide && (
        <InputWithLabel
          iconName="EditSVG"
          label={orderIdLabel}
          top={10}
          value={orderId}
          onChangeText={onChangeOrderId}
          maxLength={Constants.orderIdLimit}
        />
      )}
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
    <View style={{ flex: 1, marginTop: top }}>
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

export default PrintLabelsScreen;

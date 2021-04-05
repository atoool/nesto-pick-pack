import React, { createRef, useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import Button from '../../components/Button';
import InputWithLabel from '../../components/InputWithLabel';
import PrintLabelComponent from '../../components/PrintLabelComponent';
import { AppContext } from '../../context/AppContext';
import { Colors, width } from '../../styles';
import { Constants } from '../../utils';

const PrintLabelsScreen = ({
  route: {
    params,
    params: { binsAssigned },
  },
  navigation,
}) => {
  const orderId = params?.orderId;

  const binArrayLength = binsAssigned?.length === 0 ? 1 : binsAssigned?.length;
  const [bins, setBins] = useState(binArrayLength.toString());

  let viewShot = createRef(null);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const onChangeBins = (num) => {
    num.indexOf('.') === -1 &&
      num.indexOf(',') === -1 &&
      // eslint-disable-next-line radix
      parseInt(num) !== 0 &&
      setBins(num);
  };

  const onAssignBinPress = () => {
    if (bins !== '' && orderId && orderId !== '') {
      // eslint-disable-next-line radix
      const binCount = parseInt(bins);
      navigation.navigate('BinAssignScreen', {
        orderId,
        bins: binCount,
        sales_incremental_id: params?.sales_incremental_id,
        binsAssigned,
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
          printLabelText={locale?.BAS_printLabel}
          orderId={params.sales_incremental_id}
          viewShot={viewShot}
        />
        <InputWithLabel
          iconName="CartSVG"
          label={locale?.BAS_howMany}
          top={30}
          keyboard={'numeric'}
          value={bins}
          onChangeText={onChangeBins}
          maxLength={Constants.binsNeededLimit}
        />
        {/* <Button
          disabled={orderId === ''}
          title={locale?.PLS_printLabel}
          style={styles.printBtnBaseStyle}
          onPress={onPrint}
        /> */}
        <Button
          title={locale?.PLS_assignBin}
          onPress={onAssignBinPress}
          style={styles.assignBtnBaseStyle}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  scrollView: { margin: 30, paddingBottom: 60 },
  printBtnBaseStyle: { marginVertical: 20, borderRadius: 7, width: width - 60 },
  assignBtnBaseStyle: { marginVertical: 0, borderRadius: 7, width: width - 60 },
});

export default PrintLabelsScreen;

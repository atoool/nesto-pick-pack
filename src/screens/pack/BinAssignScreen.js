/* eslint-disable radix */
import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import Barcode from 'react-native-barcode-builder';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import { AppContext } from '../../context/AppContext';
import { PackerContext } from '../../context/PackerContext';
import { Colors, Typography, width } from '../../styles';
import { Constants } from '../../utils';

const BinAssignScreen = ({
  route: {
    params: { orderId, bins },
  },
  navigation,
}) => {
  const emptyArray = Array.apply(
    '',
    Array(parseInt(bins === '' ? 0 : bins)),
  ).map((i) => '');
  const [binPos, setBinPos] = useState(emptyArray);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const onBinAssign = (txt, indx) => {
    binPos[indx] = txt;
    setBinPos([...binPos]);
  };
  const { postAssignBin } = useContext(PackerContext);
  const onSave = async () => {
    setIsButtonLoading(true);
    const isEmpty = binPos.filter((i) => i === '').length === 0;
    if (isEmpty) {
      const payload = {
        bins: binPos,
      };
      await postAssignBin(payload, orderId);

      navigation.pop();
    } else {
      ToastAndroid.show(locale?.BAS_emptyBin, ToastAndroid.SHORT);
    }
    setIsButtonLoading(false);
  };

  const {
    locale: { locale },
  } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <PrintLabelComponent
          orderIdLabel={locale?.BAS_order}
          printLabelText={`${locale?.BAS_printLabel2}${
            orderId ? '#' + orderId : ''
          }`}
          binCountLabel={locale?.BAS_howMany}
          orderId={orderId}
          bins={bins}
          onChangeOrderId={() => {}}
          onChangeBins={() => {}}
          hide
        />
        {binPos &&
          binPos.length !== 0 &&
          binPos.map((val, indx) => (
            <InputWithLabel
              key={indx}
              placeholder={locale?.placeholder?.enterPos}
              iconName="EditSVG"
              label={locale?.BAS_Position + (indx + 1)}
              top={10}
              value={binPos[indx]}
              onChangeText={(text) => onBinAssign(text, indx)}
              maxLength={Constants.binPositionLimit}
            />
          ))}
        <Button
          title={locale?.confirm}
          onPress={onSave}
          style={{ width: width - 60 }}
          loading={isButtonLoading}
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
}) => {
  return (
    <>
      <View style={styles.labelContainer}>
        <View style={styles.barcode}>
          {orderId ? (
            <Barcode value={orderId} height={50} width={1} />
          ) : (
            <Loader small green />
          )}
        </View>
        <Text style={styles.printLabelText}>{printLabelText}</Text>
      </View>
      {!hide && (
        <>
          <InputWithLabel
            iconName="CartSVG"
            label={binCountLabel}
            top={30}
            keyboard={'numeric'}
            value={bins}
            onChangeText={onChangeBins}
            maxLength={Constants.binsNeededLimit}
          />

          <InputWithLabel
            iconName="EditSVG"
            label={orderIdLabel}
            top={10}
            value={orderId}
            onChangeText={onChangeOrderId}
            maxLength={Constants.orderIdLimit}
          />
        </>
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
  placeholder,
  maxLength,
}) => {
  return (
    <View style={[styles.labelTextView, { marginTop: top }]}>
      <Text style={styles.labelText}>{label}</Text>
      <Input
        placeholder={placeholder}
        iconName={iconName}
        style={styles.inputStyle}
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
    padding: 40,
  },
  barcode: { flex: 1 },
  printLabelText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    marginTop: 20,
    ...Typography.bold16White,
  },
  //inputWithLabel
  labelTextView: { flex: 1 },
  labelText: { color: Colors.darkText, ...Typography.bold16 },
  inputStyle: { marginTop: 5 },
});

export default BinAssignScreen;

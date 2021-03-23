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
import ModalComponent from '../../components/ModalComponent';
import { AppContext } from '../../context/AppContext';
import { PackerContext } from '../../context/PackerContext';
import { Colors, Typography, width } from '../../styles';
import { Constants } from '../../utils';

const BinAssignScreen = ({
  route: {
    params: { orderId, bins, sales_incremental_id },
  },
  navigation,
}) => {
  const emptyArray = Array.apply(
    '',
    Array(parseInt(bins === '' ? 0 : bins)),
  ).map((i) => '');
  const [binPos, setBinPos] = useState(emptyArray);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  // const [modalVisible, setModalVisible] = useState(false);

  const onBinAssign = (txt, indx) => {
    binPos[indx] = txt;
    setBinPos([...binPos]);
  };
  const { postAssignBin, getAssignBinList, getPackerOrderList } = useContext(
    PackerContext,
  );
  const onSave = async () => {
    // setModalVisible(false);
    setIsButtonLoading(true);
    try {
      const isEmpty = binPos.filter((i) => i === '').length === 0;
      if (isEmpty) {
        const payload = {
          bins: binPos,
        };
        await postAssignBin(payload, orderId).then(async () => {
          await getAssignBinList();
          await getPackerOrderList();
          ToastAndroid.show(locale?.BAS_confirm, ToastAndroid.SHORT);
        });

        navigation.popToTop();
      } else {
        ToastAndroid.show(locale?.BAS_emptyBin, ToastAndroid.SHORT);
      }
    } catch {}
    setIsButtonLoading(false);
  };

  const {
    locale: { locale },
  } = useContext(AppContext);

  const printLabelText = `${locale?.BAS_printLabel2}`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <PrintLabelComponent
          orderIdLabel={locale?.BAS_order}
          printLabelText={printLabelText}
          binCountLabel={locale?.BAS_howMany}
          orderId={sales_incremental_id}
          bins={bins}
          onChangeOrderId={() => {}}
          onChangeBins={() => {}}
          hide
        />
        {binPos &&
          binPos?.length !== 0 &&
          binPos?.map((val, indx) => (
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
      {/* <ModalComponent
        visible={modalVisible}
        text={locale?.BAS_confirm}
        button1Text={locale?.no}
        button2Text={locale?.yes}
        onButton1Press={() => setModalVisible(false)}
        onButton2Press={onSave}
      /> */}
    </SafeAreaView>
  );
};

const PrintLabelComponent = ({ orderId, printLabelText }) => {
  return (
    <>
      <View style={styles.labelContainer}>
        <View style={styles.barcode}>
          {orderId ? (
            <>
              <Text style={styles.orderIdStyle}>#{orderId}</Text>
              <Barcode value={orderId} height={50} width={1} />
            </>
          ) : (
            <Loader small green />
          )}
        </View>
        <Text style={styles.printLabelText}>{printLabelText}</Text>
      </View>
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
});

export default BinAssignScreen;

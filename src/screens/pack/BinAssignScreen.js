/* eslint-disable radix */
import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Barcode from 'react-native-barcode-builder';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import { AppContext } from '../../context/AppContext';
import { PackerContext } from '../../context/PackerContext';
import { Colors, width } from '../../styles';

const BinAssignScreen = ({
  route: {
    params: { orderId, bins },
  },
  navigation,
}) => {
  const [binPos, setBinPos] = useState([]);

  const onBinAssign = (txt, indx) => {
    binPos[indx] = txt;
    setBinPos([...binPos]);
  };
  const { postAssignBin } = useContext(PackerContext);
  const onSave = async () => {
    const payload = {
      bins: ['A12', 'B45'],
    };
    await postAssignBin(payload, orderId);
    navigation.pop(1);
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
          printLabelText={`${locale?.BAS_printLabel2}${orderId ? orderId : ''}`}
          binCountLabel={locale?.BAS_howMany}
          orderId={orderId}
          bins={bins}
          onChangeOrderId={() => {}}
          onChangeBins={() => {}}
          hide
        />
        {Array.apply('', Array(parseInt(bins === '' ? 0 : bins))).map(
          (val, indx) => (
            <InputWithLabel
              key={indx}
              iconName="EditSVG"
              label={locale?.BAS_Position + (indx + 1)}
              top={10}
              value={binPos[indx]}
              onChangeText={(text) => onBinAssign(text, indx)}
            />
          ),
        )}
        <Button
          title={locale?.save}
          onPress={onSave}
          style={{ width: width - 60 }}
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
          />

          <InputWithLabel
            iconName="EditSVG"
            label={orderIdLabel}
            top={10}
            value={orderId}
            onChangeText={onChangeOrderId}
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
}) => {
  return (
    <View style={[styles.labelTextView, { marginTop: top }]}>
      <Text style={styles.labelText}>{label}</Text>
      <Input
        iconName={iconName}
        style={styles.inputStyle}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboard}
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
    color: Colors.WHITE,
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    marginTop: 20,
    fontWeight: 'bold',
  },
  //inputWithLabel
  labelTextView: { flex: 1 },
  labelText: { color: Colors.darkText, fontSize: 16, fontWeight: 'bold' },
  inputStyle: { marginTop: 5 },
});

export default BinAssignScreen;

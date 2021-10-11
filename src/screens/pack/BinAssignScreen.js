import React, { useState, useContext, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import Button from '../../components/Button';
import InputWithLabel from '../../components/InputWithLabel';
import ModalComponent from '../../components/ModalComponent';
import PrintLabelComponent from '../../components/PrintLabelComponent';
import { AppContext } from '../../context/AppContext';
import { PackerContext } from '../../context/PackerContext';
import { Colors, width } from '../../styles';
import { Constants } from '../../utils';

/**
 * Screen for assigning bin to items
 */
const BinAssignScreen = ({
  route: {
    params: { orderId, bins, sales_incremental_id, binsAssigned },
  },
  navigation,
}) => {
  const [binPos, setBinPos] = useState([]);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * If updated bin position is fetched through push notification, this useEffect
   * will update it here.
   */
  useEffect(() => {
    const temp = Array.apply('', Array(bins)).map((e, i) =>
      binsAssigned?.length > i ? binsAssigned[i]?.bin_number : '',
    );
    setBinPos(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [binsAssigned]);

  const onBinAssign = (txt, indx) => {
    binPos[indx] = txt;
    setBinPos([...binPos]);
  };
  const { postAssignBin, getAssignBinList, getPackerOrderList } = useContext(
    PackerContext,
  );
  const onSave = async () => {
    setModalVisible(false);
    const emptyBinFound =
      (binPos?.filter((_bins) => _bins?.trim?.() === '')?.length ?? 0) > 0;
    if (emptyBinFound) {
      ToastAndroid.show(locale?.BAS_emptyBin, ToastAndroid.SHORT);
      return;
    }
    setIsButtonLoading(true);
    try {
      const binValues = binPos?.map?.((_bin) => _bin?.trim?.());
      const payload = {
        bins: binValues,
      };
      await postAssignBin(payload, orderId).then(async () => {
        await getAssignBinList();
        await getPackerOrderList();
        ToastAndroid.show(locale?.BAS_confirmed, ToastAndroid.SHORT);
      });

      navigation.popToTop();
    } catch {}
    setIsButtonLoading(false);
  };

  const onConfirm = () => {
    const binCheck =
      binPos.filter((e, i) => binsAssigned?.length > i && e === '').length ===
      0;
    binCheck ? onSave() : setModalVisible(true);
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
          printLabelText={printLabelText}
          orderId={sales_incremental_id}
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
          onPress={onConfirm}
          style={{ width: width - 60 }}
          loading={isButtonLoading}
        />
      </ScrollView>
      <ModalComponent
        visible={modalVisible}
        text={locale?.BAS_confirm}
        button1Text={locale?.no}
        button2Text={locale?.yes}
        onButton1Press={() => setModalVisible(false)}
        onButton2Press={onSave}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  scrollView: { margin: 30, paddingBottom: 60 },
});

export default BinAssignScreen;

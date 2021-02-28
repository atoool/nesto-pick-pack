import React, { useContext, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Colors, Typography } from '../../styles';
import * as Progress from 'react-native-progress';
import Button from '../../components/Button';
import { AppContext } from '../../context/AppContext';
import { PickerContext } from '../../context/PickerContext';
import ModalComponent from '../../components/ModalComponent';

const ScanScreen = ({
  navigation,
  route: {
    params: { totalItem, itemId, itemType, criticalQty },
  },
}) => {
  const [itemScanned, setItemScanned] = useState(0);
  const [barcodeArray, setBarcodeArray] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    locale: { locale },
  } = useContext(AppContext);
  const { setItemPicked, getOrdersList, getDropList } = useContext(
    PickerContext,
  );

  const onScanMismatch = async () => {
    const temp = itemScanned + 1;
    setItemScanned(temp);
    totalItem && temp / totalItem >= 1 && (await onComplete());
    setModalVisible(false);
  };

  const onScan = async (barcode) => {
    const success = itemScanned + 1;
    if (totalItem && itemScanned < totalItem && barcode?.data?.length !== 0) {
      const temp = barcodeArray.indexOf(barcode?.data) > -1;
      if (!temp) {
        setItemScanned(success);
        setBarcodeArray([...barcodeArray, barcode?.data]);
      }
    }
    totalItem && success / totalItem >= 1 && (await onComplete());
  };

  const onComplete = async () => {
    await setItemPicked(itemId, itemType, criticalQty).then(async () => {
      await getOrdersList();
      await getDropList();
      navigation.navigate('ItemSuccessScreen');
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          margin: 30,
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          {/* <Text
            style={{
              textAlign: 'center',
              marginTop: 60,
               ...Typography.bold20
            }}>
            {locale?.SS_scanbar}
          </Text> */}
          <Text
            style={{
              textAlign: 'center',
              // marginTop: 10,
              borderWidth: 0.5,
              color: Colors.lightGray,
              borderColor: Colors.lightGray,
              ...Typography.normal12,
              padding: 10,
            }}>
            {locale?.SS_scanbarText}
          </Text>
        </View>
        <View
          style={{
            height: 'auto',
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <RNCamera
            style={{ height: '35%', width: '80%' }}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: locale?.SS_permitTitle,
              message: locale?.SS_permitText,
              buttonPositive: locale?.ok,
              buttonNegative: locale?.cancel,
            }}
            notAuthorizedView={
              <View
                style={{
                  height: '35%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Button
                  title="Enable camera permission"
                  onPress={() => Linking.openSettings()}
                />
              </View>
            }
            captureAudio={false}
            onBarCodeRead={onScan}
          />
          <BarCodeMask />
        </View>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 10,
            color: Colors.lightGray,
            ...Typography.normal12,
          }}>
          {locale?.SS_scanningCode} ...
        </Text>
        {totalItem && (
          <>
            <View
              style={{
                height: 40,
                width: 200,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Progress.Bar
                progress={itemScanned / totalItem}
                height={30}
                width={200}
                color="#c9d1ff"
              />
              <Text
                style={{
                  position: 'absolute',
                  height: '99%',
                  width: '100%',
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {locale?.SS_scanning} {itemScanned} of {totalItem}
              </Text>
            </View>
            <View>
              <LinkButton
                title={locale?.SS_scanmis}
                onPress={() => setModalVisible(true)}
              />
            </View>
          </>
        )}
      </ScrollView>
      <ModalComponent
        visible={modalVisible}
        title={locale?.SS_alertTitle}
        text={locale?.SS_alertText}
        button1Text={locale?.SS_alertopt1}
        button2Text={locale?.SS_alertopt2}
        onButton1Press={() => setModalVisible(false)}
        onButton2Press={onScanMismatch}
      />
    </SafeAreaView>
  );
};

const BarCodeMask = () => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: 20,
          left: 40,
          backgroundColor: '#566ae6',
          height: 3,
          width: 40,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 20,
          left: 40,
          backgroundColor: '#566ae6',
          height: 40,
          width: 3,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 40,
          backgroundColor: '#566ae6',
          height: 3,
          width: 40,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 40,
          backgroundColor: '#566ae6',
          height: 40,
          width: 3,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 20,
          right: 40,
          backgroundColor: '#566ae6',
          height: 3,
          width: 40,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 20,
          right: 40,
          backgroundColor: '#566ae6',
          height: 40,
          width: 3,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 40,
          backgroundColor: '#566ae6',
          height: 3,
          width: 40,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 40,
          backgroundColor: '#566ae6',
          height: 40,
          width: 3,
        }}
      />
    </>
  );
};

const LinkButton = ({ title, onPress, style }) => (
  <TouchableOpacity
    style={[{ backgroundColor: 'rgba(0,0,0,0)' }, style]}
    onPress={onPress}
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
    <Text style={{ color: Colors.secondaryRed, ...Typography.normal12 }}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default ScanScreen;

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
import { Colors } from '../../styles';
import * as Progress from 'react-native-progress';
import Button from '../../components/Button';
import { AppContext } from '../../context/AppContext';
import { PickerContext } from '../../context/PickerContext';

const ScanScreen = ({
  navigation,
  route: {
    params: { totalItem, itemId, itemType, criticalQty },
  },
}) => {
  const [itemScanned, setItemScanned] = useState(0);
  const [barcodeArray, setBarcodeArray] = useState([]);

  const {
    locale: { locale },
  } = useContext(AppContext);
  const { setItemPicked } = useContext(PickerContext);

  const onScanMismatch = () => {
    Alert.alert(
      locale?.SS_alertTitle,
      locale?.SS_alertText,
      [
        {
          text: locale?.SS_alertopt1,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: locale?.SS_alertopt2,
          onPress: async () => {
            const temp = itemScanned + 1;
            setItemScanned(temp);
            totalItem && temp / totalItem >= 1 && (await onComplete());
          },
        },
      ],
      { cancelable: false },
    );
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
    await setItemPicked(itemId, itemType, criticalQty).then(() => {
      navigation.navigate('ItemSuccessScreen');
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <RNCamera
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          zIndex: -1,
        }}
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
              fontWeight: 'bold',
              fontSize: 20,
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
              fontSize: 12,
              padding: 10,
            }}>
            {locale?.SS_scanbarText}
          </Text>
        </View>
        <View
          style={{
            height: '40%',
            width: '120%',
          }}>
          <BarCodeMask />
        </View>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 10,
            color: Colors.lightGray,
            fontSize: 12,
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
              <LinkButton title={locale?.SS_scanmis} onPress={onScanMismatch} />
            </View>
          </>
        )}
      </ScrollView>
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
    <Text style={{ color: Colors.secondaryRed, fontSize: 12 }}>{title}</Text>
  </TouchableOpacity>
);

export default ScanScreen;

import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../styles';
import * as Progress from 'react-native-progress';
import Button from '../../components/Button';

const ScanScreen = ({ navigation, route: { params: { totalItem } } }) => {
  const [itemScanned, setItemScanned] = useState(0)
  const onScanMismatch = () => {
    Alert.alert('Scan mismatch', 'There seems to be a mismatch in the bar code. Do you want to continue packing of item regardless ?',
      [
        {
          text: "No, Don't pick",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes pack this", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    )
  }
  const onScan = ({ barcodes }) => {
    totalItem && itemScanned < totalItem &&
      barcodes?.data?.length != 0 &&
      setItemScanned(itemScanned + 1)
    totalItem && itemScanned == totalItem && navigation.navigate("ItemSuccessScreen")
  }
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ margin: 30, flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ textAlign: 'center', marginTop: 60, fontWeight: 'bold', fontSize: 20 }}>Scan Bar Code</Text>
          <Text style={{ textAlign: 'center', marginTop: 10, borderWidth: 0.5, color: Colors.lightGray, borderColor: Colors.lightGray, fontSize: 12, padding: 10 }}>Place the bar code inside the frame to scan and please avoid shaketo get result quickly</Text>
        </View>
        <View style={{ height: 'auto', width: '80%', alignItems: 'center', justifyContent: 'center' }}>
          <RNCamera
            ref={ref => {
              // this.camera = ref;
            }}
            style={{ height: '35%', width: '80%' }}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            captureAudio={false}
            onBarCodeRead={onScan}

          />
          <BarCodeMask />
        </View>
        <Text style={{ textAlign: 'center', marginTop: 10, color: Colors.lightGray, fontSize: 12, }}>Scanning code ...</Text>
        {totalItem &&
          <>
            <View style={{ height: 40, width: 200, alignSelf: 'center', justifyContent: 'center' }}>
              <Progress.Bar progress={itemScanned / totalItem} height={30} width={200} color='#c9d1ff' />
              <Text style={{ position: 'absolute', height: '99%', width: '100%', textAlignVertical: 'center', textAlign: 'center', fontWeight: 'bold' }}>Scanning {itemScanned} of {totalItem}</Text>
            </View>
            <View>
              <LinkButton title="Scan mismatch?" onPress={onScanMismatch} />
            </View>
          </>
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const BarCodeMask = () => {
  return <>
    <View style={{ position: 'absolute', top: 20, left: 40, backgroundColor: '#566ae6', height: 3, width: 40 }} />
    <View style={{ position: 'absolute', top: 20, left: 40, backgroundColor: '#566ae6', height: 40, width: 3 }} />
    <View style={{ position: 'absolute', bottom: 20, left: 40, backgroundColor: '#566ae6', height: 3, width: 40 }} />
    <View style={{ position: 'absolute', bottom: 20, left: 40, backgroundColor: '#566ae6', height: 40, width: 3 }} />
    <View style={{ position: 'absolute', top: 20, right: 40, backgroundColor: '#566ae6', height: 3, width: 40 }} />
    <View style={{ position: 'absolute', top: 20, right: 40, backgroundColor: '#566ae6', height: 40, width: 3 }} />
    <View style={{ position: 'absolute', bottom: 20, right: 40, backgroundColor: '#566ae6', height: 3, width: 40 }} />
    <View style={{ position: 'absolute', bottom: 20, right: 40, backgroundColor: '#566ae6', height: 40, width: 3 }} />
  </>
}

const LinkButton = ({ title, onPress, style }) => (
  <TouchableOpacity
    style={[{ backgroundColor: 'rgba(0,0,0,0)' }, style]}
    onPress={onPress}
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
    <Text style={{ color: Colors.secondaryRed, fontSize: 12 }}>{title}</Text>
  </TouchableOpacity>
);

export default ScanScreen;
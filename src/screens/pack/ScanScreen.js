import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';

const ScanScreen = () => {
return (
<SafeAreaView>
<RNCamera
          ref={ref => {
            // this.camera = ref;
          }}
          style={{height:'60%',width:'80%'}}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
          onBarCodeRead={(b)=>{console.warn(b)}}
        />
</SafeAreaView>
);
};

export default ScanScreen;
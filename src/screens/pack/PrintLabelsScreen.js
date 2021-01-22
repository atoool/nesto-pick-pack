import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import Barcode from "react-native-barcode-builder";

const PrintLabelsScreen = () => {
return (
<SafeAreaView>
<Text>PrintLabelsScreen</Text>
<Barcode value="Hello World" />
</SafeAreaView>
);
};

export default PrintLabelsScreen;
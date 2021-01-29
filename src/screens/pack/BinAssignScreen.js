import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Barcode from "react-native-barcode-builder";
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import { AppContext } from '../../context/AppContext';
import { Colors, width, height } from '../../styles';

const BinAssignScreen = ({ route: { params: { orderId } }, navigation }) => {
    const onSave = () => {
        navigation.goBack()
    }
    const { bins, binPos, onBinAssign, onChangeBins } = useContext(AppContext)
    return (
        <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ margin: 30, paddingBottom: 60 }}>
                <PrintLabelComponent orderId={orderId} bins={bins} onChangeOrderId={() => { }} onChangeBins={onChangeBins} hide />
                {Array.apply('', Array(parseInt(bins == "" ? 0 : bins))).map((val, indx) => (
                    <InputWithLabel key={indx} iconName="edit" label={'Position of Bin ' + (indx + 1)} top={10} value={binPos[indx]} onChangeText={text => onBinAssign(text, indx)} />
                ))}
                <Button title="Save" onPress={onSave} style={{ width: width - 60 }} />
            </ScrollView>
        </SafeAreaView>
    );
};


const PrintLabelComponent = ({ onChangeOrderId, onChangeBins, orderId, bins, hide }) => {
    return (
        <>
            <View style={{ backgroundColor: Colors.secondaryRed, borderRadius: 12, alignItems: 'center', padding: 40 }}>
                <View style={{ flex: 1 }}>
                    {orderId ? <Barcode value={orderId} height={50} width={1} /> : <Loader small green />}
                </View>
                <Text style={{ color: Colors.WHITE, fontSize: 16, flex: 1, textAlign: 'center', textAlignVertical: 'bottom', marginTop: 20, fontWeight: 'bold' }}>Print labels for this order</Text>
            </View>

            <InputWithLabel iconName="shopping-cart" label={'How many bins are needed ?'} top={30} keyboard={"numeric"} value={bins} onChangeText={onChangeBins} />
            {!hide &&
                <InputWithLabel iconName="edit" label={'Order number to print'} top={10} value={orderId} onChangeText={onChangeOrderId} />
            }
        </>
    )
}

const InputWithLabel = ({ label, top, onChangeText, value, keyboard, iconName }) => {
    return (
        <View style={{ flex: 1, marginTop: top }}>
            <Text style={{ color: Colors.darkText, fontSize: 16, fontWeight: 'bold' }}>{label}</Text>
            <Input iconName={iconName} style={{ marginTop: 5 }} value={value} onChangeText={onChangeText} keyboardType={keyboard} />
        </View>
    )
}


export default BinAssignScreen;
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Barcode from "react-native-barcode-builder";
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import { Colors } from '../../styles';

const BinAssignScreen = ({route:{params:{orderId,bins,onChangeOrderId,onChangeBins}},navigation}) => {
    const [binPos,setBinPos]=useState([]);
    const onSave=()=>{
        navigation.goBack()
    }
   const onBinAssign=(txt,indx)=>{
       binPos[indx]=txt
        setBinPos([...binPos])
    }
return (
<SafeAreaView style={{ backgroundColor: Colors.WHITE ,flex:1}}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{margin:30}}>
<PrintLabelComponent orderId={orderId} bins={bins} onChangeOrderId={()=>onChangeOrderId()} onChangeBins={()=>onChangeBins()} hide/>
{Array.apply('',Array(parseInt(bins))).map((val,indx)=>(
    <InputWithLabel label={'Position of Bin '+(indx+1)} top={20} value={binPos[indx]} onChangeText={text=>onBinAssign(text,indx)}/>
))}
<Button title="Save" onPress={onSave} style={{marginTop:20,marginBottom:80}}/>
</ScrollView>
</SafeAreaView>
);
};


const PrintLabelComponent=({onChangeOrderId,onChangeBins,orderId,bins,hide})=>{
    return (
        <>
        <View style={{backgroundColor:Colors.secondaryRed,borderRadius:12,alignItems:'center',padding:40}}>
   <View style={{flex:1}}>
        {orderId?<Barcode value={orderId} height={50} width={1}  />:<Loader small green/>}
        </View>
    <Text style={{color:Colors.WHITE,fontSize:16,flex:1,textAlign:'center',textAlignVertical:'bottom',marginTop:20}}>Print labels for this order</Text>
    </View>
   
<InputWithLabel label={'How many bins are needed ?'} top={30} value={bins} onChangeText={onChangeBins}/>
{!hide&&
<InputWithLabel label={'Order number to print'} top={10} value={orderId} onChangeText={onChangeOrderId}/>}
        </>
    )
}

const InputWithLabel=({label,top,onChangeText,value})=>{
    return (
        <View style={{flex:1,marginTop:top}}>
        <Text style={{color:Colors.darkText,fontSize:16,fontWeight:'bold'}}>{label}</Text>
        <Input value={value} onChangeText={onChangeText}/>
        </View>
    )
}


export default BinAssignScreen;
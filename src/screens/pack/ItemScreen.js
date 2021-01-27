import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import { Provider, TextInput } from 'react-native-paper'

import Button from '../../components/Button';
import { Typography, Colors } from '../../styles';

const ItemScreen = ({ route: { params: { item } }, navigation }) => {
    const [passItem, setPassItem] = useState(Array.apply(null, Array(item.qty)).map(itm => true))
    const [issue, setIssue] = useState(Array.apply(null, Array(item.qty)).map(itm => 'Physical damage'));
    const [showDropDown, setShowDropDown] = useState(Array.apply(null, Array(item.qty)).map(itm => false));

    const issueList = [
        { label: 'Physical damage', value: 'Physical damage' },
        { label: 'Package broken', value: 'Package broken' },
        { label: 'Expired product', value: 'Expired product' },
    ];
    const onCheckPass = (val, index) => {
        passItem[index] = val
        setPassItem([...passItem])
    }
    const onShowDropDown = (val, index) => {
        showDropDown[index] = val
        setShowDropDown([...showDropDown])
    }
    const onSetIssue = (val, index) => {
        issue[index] = val
        setIssue([...issue])
    }
    return (
        <Provider>
            <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1, }}>
                <ScrollView>
                    <View
                        style={{
                            backgroundColor: Colors.secondaryRed,
                            padding: 20,
                            marginHorizontal: 32,
                            marginVertical: 32,
                            borderRadius: 7,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}>
                        <Text style={Typography.bold17White}>Time remaining</Text>
                        <View
                            style={{
                                height: '100%',
                                width: 1,
                                backgroundColor: Colors.WHITE,
                                opacity: 0.25,
                            }}
                        />
                        <Text style={Typography.bold17White}>02:30 Hrs</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 32 }}>
                        <View style={{ marginRight: 20 }}>
                            <View
                                style={{
                                    backgroundColor: Colors.offWhite,
                                    height: 166,
                                    width: 124,
                                    borderRadius: 7,
                                }}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View
                                    style={{
                                        backgroundColor: '#A1C349',
                                        borderRadius: 3,
                                        height: 25,
                                        padding: 10,

                                        justifyContent: 'center',
                                    }}>
                                    <Text style={Typography.normal12White}>Aisle</Text>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: '#C5B171',
                                        borderRadius: 3,
                                        height: 25,
                                        padding: 10,
                                        marginHorizontal: 10,
                                        justifyContent: 'center',
                                    }}>
                                    <Text style={Typography.normal12White}>Dept</Text>
                                </View>
                            </View>
                            <Text style={Typography.bold21}>Colgate toothpaste</Text>
                            <Text style={Typography.normal15}>Picking now</Text>
                            <Text style={[Typography.normal15, { marginVertical: 10 }]}>
                                For 09:00 - 10:00 Express delivery
          </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Text style={Typography.bold21}>${item.price}</Text>
                                <Text> per quantity</Text>
                                <View
                                    style={{
                                        backgroundColor: Colors.secondaryRed,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 10,
                                        borderRadius: 2,
                                        marginLeft: 10,
                                    }}>
                                    <Text style={Typography.bold13White}>x</Text>
                                    <Text style={Typography.bold20White}>{item.qty}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 10, borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: Colors.primary5, paddingHorizontal: 32 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Review Item</Text>
                        <Text style={{ fontSize: 14, marginTop: 5, marginBottom: 10 }}>Check if the item matches the order descri-
                        ption in terms of volume & verify if it is in good
                        quality.
                </Text>
                        {passItem.map((item, index) => (
                            <View key={index}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Item {index + 1}</Text>
                                    <View style={{ borderColor: Colors.primary4, borderWidth: 0.5, borderRadius: 10, flexDirection: 'row', marginLeft: 40, height: 40, width: 200, overflow: 'hidden' }}>
                                        <TouchableOpacity onPress={() => onCheckPass(true, index)}>
                                            <View style={{ borderRadius: 8, backgroundColor: item ? 'lightgreen' : 'rgba(0,0,0,0)', height: '100%', width: 100, justifyContent: 'center' }}>
                                                <Text style={{ textAlign: 'center' }}>Pass</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => onCheckPass(false, index)}>
                                            <View style={{ borderRadius: 8, backgroundColor: item ? 'rgba(0,0,0,0)' : Colors.secondaryRed, height: '100%', width: 100, justifyContent: 'center' }}>
                                                <Text style={{ textAlign: 'center' }}>Fail</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                { !passItem[index] && <View style={{ marginBottom: 20 }}>
                                    <DropDown
                                        label={'Issue'}
                                        mode={'outlined'}
                                        value={issue[index]}
                                        setValue={(value) => { onSetIssue(value, index) }}
                                        list={issueList}
                                        visible={showDropDown[index]}
                                        showDropDown={() => onShowDropDown(true, index)}
                                        onDismiss={() => { onShowDropDown(false, index) }}
                                        inputProps={{
                                            right: <TextInput.Icon name={'menu-down'} />,
                                        }}
                                    />
                                </View>}
                            </View>
                        ))}
                    </View>
                    {passItem.indexOf(false) ? <Button title="Scan bar code" style={{ margin: 40, borderRadius: 7 }} onPress={() => { navigation.navigate('ScanScreen', { totalItem: item.qty }) }} />
                        : <View style={{ paddingVertical: 10, paddingHorizontal: 32 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Review Item</Text>
                            <Text style={{ fontSize: 14, marginTop: 5, marginBottom: 10 }}>Check if the item matches the order descri-
                            ption in terms of volume & verify if it is in good
                            quality.
                </Text>
                            <Button title="Ask to repick" style={{ width: 180, marginVertical: 20 }} />
                        </View>}
                </ScrollView>
            </SafeAreaView>
        </Provider>
    );
};

export default ItemScreen;

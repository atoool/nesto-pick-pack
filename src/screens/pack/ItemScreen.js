import React, { createRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback } from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import { Divider, Provider, Menu } from 'react-native-paper'
import Button from '../../components/Button';
import { Typography, Colors, width } from '../../styles';
import useTimer from '../../hooks/useTimer';
import images from '../../assets/images';
import StatusPill from '../../components/StatusPill';
import Arrow from '../../components/Arrow';

const screenWidth = width
const w = width - 32
const ItemScreen = ({ route: { params: { item } }, navigation }) => {
    const containerRef = createRef(null)
    const ss = 3600;
    return (
        <SafeAreaView ref={r => containerRef.current = r?.props} style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TimerComponent ss={ss} />
                <ItemSection
                    title={item.name}
                    price={item.price}
                    quantity={item.qty}
                    position="Aisle 1 Rack A12"
                    department={item.department}
                />
                <VerifyItemSection
                    containerRef={containerRef.current}
                    item={item}
                    navigation={navigation} />
            </ScrollView>
        </SafeAreaView>
    );
};

const TimerComponent = ({ ss }) => {
    const now = useTimer(ss);
    const HoursString = Math.floor(now / 3600)
        .toString()
        .padStart(2, 0);
    const minutesString = Math.floor(now / 60)
        .toString()
        .padStart(2, 0);

    return (
        <View style={styles.timerContainer}>
            <Text style={Typography.bold17White}>Time remaining</Text>
            <View style={styles.timerDivider} />
            <Text style={Typography.bold17White}>
                {HoursString}:{minutesString} Hrs
        </Text>
        </View>
    );
};

const ItemSection = ({ title, price, quantity, position, department }) => {
    return (
        <>
            <View style={styles.itemImageContainer}>
                <View style={styles.itemImage}>
                    <Image
                        source={images.colgate}
                        resizeMode={'contain'}
                        style={{ height: (1 * w) / 2, width: screenWidth - 64 }}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 32 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <StatusPill
                            backgroundColor="#A1C349"
                            text={position}
                            marginRight={10}
                        />
                        <StatusPill backgroundColor="#C5B171" text={department} />
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={Typography.bold21}>{title}</Text>
                            <Text style={Typography.normal15}>Picking now</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'flex-start',
                                alignItems: 'flex-end',
                            }}>
                            <Text style={Typography.bold21}>${price}</Text>
                            <Text> per quantity</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <View style={styles.historyBox}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.deliveryStatusCircle} />
                                <Text style={Typography.bold15}>Express delivery</Text>
                            </View>
                            <View style={styles.deliverBoxRow2}>
                                <Text>9:00 AM</Text>
                                <Arrow />
                                {/* <Text> ------------> </Text> */}
                                <Text>10:00 AM</Text>
                            </View>
                        </View>
                        <View style={styles.quantityPill}>
                            <Text style={Typography.bold13White}>x</Text>
                            <Text style={Typography.bold20White}>{quantity}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};

const VerifyItemSection = ({ item, navigation, containerRef }) => {
    const [passItem, setPassItem] = useState(Array.apply(null, Array(item.qty)).map(itm => true))
    const [issue, setIssue] = useState(Array.apply(null, Array(item.qty)).map(itm => 'Physical damage'));
    const [showDropDown, setShowDropDown] = useState(Array.apply(null, Array(item.qty)).map(itm => false));
    const [currentDropDown, setCurrentDropDown] = useState(0)
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
        setCurrentDropDown(index)
    }
    const onSetIssue = (val, index) => {
        issue[index] = val
        setIssue([...issue])
    }
    containerRef?.onTouchEnd(e => e.nativeEvent.touches && showDropDown[currentDropDown] && onShowDropDown(false, currentDropDown))
    return (
        < >
            <Divider />
            <View style={{ paddingVertical: 20, paddingHorizontal: 32 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Review Item</Text>
                <Text style={{ fontSize: 14, marginTop: 5, marginBottom: 10 }}>Check if the item matches the order descri-
                ption in terms of volume & verify if it is in good
                quality.
</Text>
                {passItem.map((item, index) => (
                    <View key={index}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Item {index + 1}</Text>
                            <View style={{ borderColor: Colors.primary4, borderWidth: 0.5, borderRadius: 10, flexDirection: 'row', alignSelf: 'flex-end', height: 40, width: 200, overflow: 'hidden' }}>
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
                            <View style={{ alignSelf: 'flex-end' }}>
                                <TouchableWithoutFeedback onPress={() => { onShowDropDown(!showDropDown[index], index) }}>
                                    <View style={{ borderColor: Colors.primary4, borderWidth: 0.5, borderRadius: 10, height: 40, width: 200 }}>
                                        <Text style={[{ textAlignVertical: 'center', height: '100%', marginLeft: 35 }, Typography.bold15]}>{issue[index]}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                {showDropDown[index] &&
                                    <View style={{ position: 'absolute', elevation: 10, backgroundColor: '#fff', width: 190, height: 'auto', alignSelf: 'center', marginTop: 40, borderBottomRightRadius: 7, borderBottomLeftRadius: 7 }}>
                                        {issueList.map((item, key) => (
                                            <TouchableOpacity key={key} onPress={() => { onSetIssue(item.value, index) }} style={{ height: 50, width: '100%' }}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', height: 50, }}>
                                                    <Text style={[{ paddingLeft: 30, width: '100%', }, item.value == issue[index] && Typography.bold15]}>{item.label}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </View>}
                            </View>
                        </View>}
                    </View>
                ))}
            </View>

            <Divider />
            {passItem.indexOf(false) ?
                <>
                    <Divider />
                    <Button title="Scan bar code" style={{ margin: 32, borderRadius: 7, width: width - 60 }} onPress={() => { navigation.navigate('ScanScreen', { totalItem: item.qty }) }} />
                    <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                        <Text>Scan Failed? Then use</Text>
                        <Text
                            style={{
                                textDecorationLine: 'underline',
                                ...Typography.bold17,
                                color: Colors.secondaryRed,
                            }}>
                            Manual entry
                        </Text>
                    </View>
                </>

                : <View style={{ paddingVertical: 10, paddingHorizontal: 32 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Review Item</Text>
                    <Text style={{ fontSize: 14, marginTop: 5, marginBottom: 10 }}>Check if the item matches the order descri-
                    ption in terms of volume & verify if it is in good
                    quality.
</Text>
                    <Button title="Ask to repick" style={{ width: 180, marginVertical: 20 }} />
                </View>}

        </>
    )
}



const styles = StyleSheet.create({
    timerDivider: {
        height: '100%',
        width: 1,
        backgroundColor: Colors.WHITE,
        opacity: 0.25,
    },
    timerContainer: {
        backgroundColor: Colors.secondaryRed,
        padding: 20,
        marginHorizontal: 32,
        marginVertical: 24,
        borderRadius: 7,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    itemImageContainer: {
        marginHorizontal: 32,
        marginBottom: 24,
        alignItems: 'center',
    },
    itemImage: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.offWhite,
        height: (1 * w) / 2,
        width: screenWidth - 64,
        borderRadius: 7,
    },
    deliveryStatusCircle: {
        width: 14,
        height: 14,
        backgroundColor: '#889BFF',
        borderRadius: 14,
        marginRight: 10,
    },
    historyBox: {
        backgroundColor: Colors.offWhite,
        padding: 10,
        borderRadius: 7,
        height: 60,
        flex: 1,
    },
    quantityPill: {
        backgroundColor: Colors.secondaryRed,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 7,
        marginLeft: 10,
        height: 60,
    },
    flexDirectionRow: { flexDirection: 'row' },
    deliverBoxRow2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default ItemScreen;

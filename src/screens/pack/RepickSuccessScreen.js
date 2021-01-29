import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Title from '../../components/Title';
import { Colors, Typography, width } from '../../styles';
import Success1SVG from '../../assets/svg/Success1SVG.svg';
import Success2SVG from '../../assets/svg/Success2SVG.svg';
import Button from '../../components/Button';

const RepickSuccessScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <ScrollView>
                <Title text="Success" style={{ borderBottomWidth: 0, alignSelf: 'center' }} />
                <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <View style={{ right: -17 }}>
                        <Success1SVG width={100} />
                    </View>
                    <View style={{ left: -17 }}>
                        <Success2SVG width={100} />
                    </View>
                </View>
                <View style={{ alignItems: 'center', marginHorizontal: 32, marginVertical: 30 }}>
                    <Text style={Typography.bold17}>Repick requested</Text>
                    <Text style={[Typography.normal15, { textAlign: 'center', marginTop: 7 }]}>You have requested the picker to repick this item. The FCM has been alerted on this as well.</Text>
                </View>
                <View style={{ alignItems: 'center', padding: 32, backgroundColor: Colors.offWhite }}>
                    <Text style={Typography.bold17}>What next?</Text>
                    <Text style={[Typography.normal15, { textAlign: 'center', marginTop: 7 }]}>While you are waiting, you can pack another item. This order will be moved to suspended.</Text>
                </View>
                <Button title="Pack another item" style={{ marginVertical: 30, marginHorizontal: 60 }} onPress={() => { navigation.pop(2) }} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default RepickSuccessScreen;
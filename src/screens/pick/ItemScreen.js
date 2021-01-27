import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { Typography, Colors } from '../../styles';
import useTimer from '../../hooks/useTimer';
import Button from '../../components/Button';
import StatusPill from '../../components/StatusPill';
import Arrow from '../../components/Arrow';
import Images from '../../assets/images';

const screenWidth = Math.round(Dimensions.get('window').width);
const w = screenWidth - 32;

const ItemScreen = () => {
  const ss = 3600;
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TimerComponent ss={ss} />
        <ItemSection
          title="Colgate toothpaste"
          price="10"
          quantity="2"
          position="Aisle 1 Rack A12"
          department="Consumer Dept."
        />
        <VerifyItemSection />
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
            source={Images.colgate}
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

const VerifyItemSection = ({}) => {
  const [status, setStatus] = useState(0);
  const someOutofStock = status === 1;
  const substituteItems = status === 1 || status === 0;
  const [itemsQty, setItemQty] = useState(0);
  return (
    <>
      <Divider />
      <View style={{ marginHorizontal: 32 }}>
        <Text style={Typography.bold21}>Verify Item</Text>
        <Text style={{ marginVertical: 10 }}>
          Check if the item matches the order description in terms of volume &
          verify if it is in stock
        </Text>
        <RadioItem
          onPress={() => setStatus(2)}
          toggle={status === 2}
          title="All items in stock"
        />
        <RadioItem
          onPress={() => setStatus(0)}
          toggle={status === 0}
          title="All Items out of stock"
        />
        <RadioItem
          onPress={() => setStatus(1)}
          toggle={status === 1}
          title="Some quantities out of stock"
        />
        {someOutofStock && (
          <TextInput
            placeholder="Enter count of out of stock items"
            keyboardType={'number-pad'}
            onChangeText={(t) =>
              setItemQty(t.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))
            }
            value={itemsQty}
            style={{
              borderWidth: 1,
              borderRadius: 7,
              height: 50,
              paddingLeft: 20,
              borderColor: Colors.offWhite,
            }}
          />
        )}
        {substituteItems && (
          <>
            <Divider />
            <Text style={Typography.bold21}>Substitute Items</Text>
            <Text style={{ marginVertical: 10 }}>
              Suggest alternatives for this item. The FCM and the customer will
              be alerted. Please wait 10 mins to receive a reply.
            </Text>
            <Button
              title="Suggest substitutes"
              style={{ flex: 0, width: 200 }}
            />
          </>
        )}
        {!substituteItems && (
          <>
            <Divider />
            <Button title="Scan QR code" />
            <View style={{ alignItems: 'center', paddingVertical: 32 }}>
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
        )}
      </View>
    </>
  );
};

const RadioItem = ({ toggle, onPress, title }) => (
  <TouchableOpacity
    style={{
      backgroundColor: Colors.offWhite,
      marginBottom: 10,
      height: 40,
      alignItems: 'center',
      borderRadius: 7,
      flexDirection: 'row',
    }}
    onPress={onPress}>
    <View
      style={{
        height: 20,
        width: 20,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: Colors.BLACK,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {toggle && (
        <View
          style={{
            height: 10,
            width: 10,
            backgroundColor: Colors.BLACK,
            borderRadius: 30,
          }}
        />
      )}
    </View>
    <Text style={Typography.bold15}>{title}</Text>
  </TouchableOpacity>
);

const Divider = () => (
  <View
    style={{
      height: 1,
      backgroundColor: Colors.offWhite,
      marginVertical: 20,
    }}
  />
);
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

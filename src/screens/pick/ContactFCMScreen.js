import React, { useContext, useState, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../assets/images';
import Arrow from '../../components/Arrow';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import GetIcon from '../../components/GetIcon';
import StatusPill from '../../components/StatusPill';
import TickComponent from '../../components/TickComponent';
import { AppContext } from '../../context/AppContext';
import { PickerContext } from '../../context/PickerContext';
import { Colors, Typography } from '../../styles';

const screenWidth = Math.round(Dimensions.get('window').width);
const w = screenWidth - 32;

const ContactFCMScreen = ({
  route: {
    params: { item, orderId },
  },
  navigation,
}) => {
  const { pickerSuggestions, getPickerSuggestedItems } = useContext(
    PickerContext,
  );
  useEffect(() => {
    onMount();
  }, []);
  const onMount = async () => await getPickerSuggestedItems(item._id);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <ImageWithLabel
          iconName={'NoResponseSVG'}
          statusTitle="No response"
          statusText="The Customer has not responded. Call to inform the substitution."
        />
        <ItemSection
          title={item.name}
          price={item?.price && item.price.toFixed(2)}
          quantity={item.qty}
          position={item.position}
          department={item.department}
          type="Express Delivery"
          status="Picking completed"
        />

        <Divider />
        {pickerSuggestions?.length !== 0 && (
          <ItemCheckList items={pickerSuggestions} title={'Substitutes list'} />
        )}

        <View style={{ width: '100%', alignItems: 'center' }}>
          <Button
            title="Call"
            style={{ paddingHorizontal: 0, marginBottom: 20 }}
            onPress={() => {}}
          />
        </View>
        <Divider />
        <View style={{ marginHorizontal: 32, margin: 20 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={Typography.bold21}>Did anyone pick up</Text>
          </View>
          <Text style={{ marginVertical: 10 }}>
            Has the customer picked up your call? Mark your response here
          </Text>
          <Button
            title={'Yes, Customer available'}
            style={{ marginBottom: 20 }}
            onPress={() => {
              navigation.navigate('CustomerAvailScreen', {
                orderId,
                item,
                pickerSuggestions,
              });
            }}
          />
          <Button
            title={'No, No one picked call'}
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              borderWidth: 1,
              borderColor: Colors.BLACK,
            }}
            titleStyle={{ color: Colors.BLACK }}
            onPress={() => {
              // navigation.navigate('ItemRemovedScreen');

              navigation.navigate('PickerChoiceScreen', {
                orderId,
                item,
                pickerSuggestions,
              });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ImageWithLabel = ({ iconName, statusTitle, statusText }) => {
  return (
    <>
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 60,
          width: 100,
          height: 100,
          borderRadius: 100,
        }}>
        {iconName && <GetIcon name={iconName} width={140} />}
      </View>
      <View
        style={{
          alignItems: 'center',
          marginHorizontal: 40,
          marginVertical: 60,
        }}>
        <Text style={Typography.bold21}>{statusTitle ? statusTitle : ''}</Text>
        <Text
          style={[Typography.normal15, { textAlign: 'center', marginTop: 7 }]}>
          {statusText ? statusText : ''}
        </Text>
      </View>
    </>
  );
};

const ItemSection = ({
  title,
  price,
  quantity,
  position,
  department,
  type,
  status,
}) => {
  const {
    locale: { locale },
  } = useContext(AppContext);

  return (
    <View style={{ paddingBottom: 20 }}>
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
              <Text style={Typography.normal15}>{status}</Text>
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
              }}>
              <Text style={Typography.bold21}>${price}</Text>
              <Text> {locale?.IS_perQuantity}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.historyBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.deliveryStatusCircle} />
                <Text style={Typography.bold15}>{type}</Text>
              </View>
              <View style={styles.deliverBoxRow2}>
                <Text>9:00 AM</Text>
                <Arrow width={30} />
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
    </View>
  );
};

const ItemCheckList = ({ items, onNavigateTo, price, title }) => {
  return (
    <>
      <Text
        style={{ ...Typography.bold17, marginHorizontal: 32, marginTop: 20 }}>
        {title}
      </Text>
      <FlatList
        data={items}
        style={styles.orderItemsList}
        keyExtractor={(item, indx) => `${indx}`}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.orderItem}>
              <View style={styles.departmentBox}>
                <TickComponent enabled={true} />
                <View>
                  <Text style={Typography.bold15}>{item.name}</Text>
                </View>
              </View>
              <Text style={[styles.stockBox]}>{price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.WHITE },
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
  timerContainer2: { padding: 10, marginHorizontal: 0, marginVertical: 0 },
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
  orderItem: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  orderItemsList: {
    backgroundColor: Colors.offWhite,
    // borderRadius: 7,
    // paddingVertical: 10,
    // marginHorizontal: 32,
    marginVertical: 20,
  },
  departmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockBox: {
    marginRight: 20,
    ...Typography.normal12,
  },
});
export default ContactFCMScreen;

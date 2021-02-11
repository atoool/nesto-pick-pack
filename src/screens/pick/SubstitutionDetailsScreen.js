import React, { useContext, useEffect } from 'react';
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
import Divider from '../../components/Divider';
import GetIcon from '../../components/GetIcon';
import StatusPill from '../../components/StatusPill';
import TickComponent from '../../components/TickComponent';
import { AppContext } from '../../context/AppContext';
import { PickerContext } from '../../context/PickerContext';
import { Colors, Typography } from '../../styles';

const screenWidth = Math.round(Dimensions.get('window').width);
const w = screenWidth - 32;

const SubstitutionDetailsScreen = ({
  route: {
    params: { item, orderId },
  },
}) => {
  const { substitutedList, getSubstitutedItems } = useContext(PickerContext);
  useEffect(() => {
    onMount();
  }, []);
  const onMount = async () => await getSubstitutedItems(item._id);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <ImageWithLabel
          iconName="CustAvailableSVG"
          statusTitle="Substitute selected"
          statusText="The Customer has responded to the query & chosen a substitute"
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
        {substitutedList?.substituted_items &&
          substitutedList?.substituted_items.length !== 0 && (
            <ItemCheckList
              items={substitutedList.substituted_items}
              title={'Did anyone pick up'}
            />
          )}
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
    </>
  );
};

const ItemCheckList = ({ items, onNavigateTo, stock, title }) => {
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
                  <Text style={Typography.bold15}>
                    {item.qty}x {item.name}
                  </Text>
                  <Text style={Typography.normal12}>
                    {item.department} | {item.position}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.stockBox,
                  {
                    color:
                      stock == 'In stock'
                        ? Colors.primaryGreen
                        : Colors.secondaryRed,
                  },
                ]}>
                {stock}
              </Text>
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
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderItemsList: {
    backgroundColor: Colors.offWhite,
    borderRadius: 7,
    paddingVertical: 10,
    marginHorizontal: 32,
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
export default SubstitutionDetailsScreen;

import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Arrow from '../../components/Arrow';
import StatusPill from '../../components/StatusPill';
import { AppContext } from '../../context/AppContext';
import { Colors, Typography } from '../../styles';
import Images from '../../assets/images';
import Divider from '../../components/Divider';
import { PickerContext } from '../../context/PickerContext';
import TickComponent from '../../components/TickComponent';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import formatAmPm from '../../utils/formatAmPm';

const screenWidth = Math.round(Dimensions.get('window').width);
const w = screenWidth - 32;

const SubstitutesScreen = ({
  route: {
    params: { item, requiredQty, existingQty, startTime, endTime },
  },
  navigation,
}) => {
  const {
    similarItems,
    getSimilarItemList,
    postSuggestedSubstitutes,
  } = useContext(PickerContext);
  const {
    locale: { locale },
  } = useContext(AppContext);

  const [checkedList, setCheckedList] = useState(
    Array.apply('', Array(similarItems.length)).map((i) => null),
  );

  const [isSuggestLoad, setIsSuggestLoad] = useState();

  const onCheck = (i) => {
    const temp = checkedList;
    temp[i] = !checkedList[i] ? similarItems[i] : null;
    setCheckedList([...temp]);
  };

  useEffect(() => {
    onMount();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onMount = async () => {
    await getSimilarItemList(1);
  };

  const onSuggestSubstitute = async () => {
    setIsSuggestLoad(true);
    const isCheckedListEmpty = checkedList.filter((itm) => itm !== null);
    if (isCheckedListEmpty.length === 0) {
      ToastAndroid.show('Empty list', ToastAndroid.SHORT);
    } else {
      const payload = {
        original_item_id: item?.item_id,
        more_quantity_required: requiredQty,
        existing_quantity: existingQty,
        order_id: item?.orderId,
        item_type: item?.item_type,
        suggested_items: isCheckedListEmpty,
      };
      try {
        await postSuggestedSubstitutes(payload);
        navigation.navigate('SubstituteRequestedScreen');
      } catch (e) {
        ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
      }
    }
    setIsSuggestLoad(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      {!similarItems || similarItems.length === 0 ? (
        <Loader fullScreen />
      ) : (
        <ScrollView nestedScrollEnabled>
          <ItemSection
            title={item?.name}
            price={item?.price && item.price.toFixed(2)}
            quantity={item?.qty}
            position={item?.position}
            department={item?.department}
            type={item?.order_type}
            status={
              item?.picking_completed ? locale?.status?.PiC : locale?.status.Pi
            }
            startTime={startTime}
            endTime={endTime}
            img={item?.image_url}
          />
          {similarItems && (
            <ItemCheckList
              items={similarItems}
              onPress={onCheck}
              stock="In stock"
              checkedList={checkedList}
            />
          )}
          <Button
            title={locale.IS_substituteButton}
            style={{ borderRadius: 0 }}
            loading={isSuggestLoad}
            onPress={onSuggestSubstitute}
          />
        </ScrollView>
      )}
    </SafeAreaView>
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
  startTime,
  endTime,
  img,
}) => {
  const {
    locale: { locale },
  } = useContext(AppContext);

  const sTime = formatAmPm(startTime);
  const eTime = formatAmPm(endTime);
  return (
    <>
      <View style={styles.itemImageContainer}>
        <View style={styles.itemImage}>
          <Image
            source={{ uri: img }}
            resizeMode={'cover'}
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
                <Text>{sTime}</Text>
                <Arrow width={30} />
                {/* <Text> ------------> </Text> */}
                <Text>{eTime}</Text>
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

const ItemCheckList = ({ items, onPress, stock, checkedList }) => {
  return (
    <FlatList
      data={items}
      style={styles.orderItemsList}
      keyExtractor={(item, indx) => `${indx}${item.id}`}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => onPress(index)}>
          <View style={styles.orderItem}>
            <View style={styles.departmentBox}>
              <TickComponent enabled={checkedList[index] !== null} />
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
                    stock === 'In stock'
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
  itemImageContainer: {
    marginHorizontal: 32,
    marginVertical: 24,
    alignItems: 'center',
  },
  itemImage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.offWhite,
    height: (1 * w) / 2,
    width: screenWidth - 64,
    borderRadius: 7,
    overflow: 'hidden',
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

export default SubstitutesScreen;

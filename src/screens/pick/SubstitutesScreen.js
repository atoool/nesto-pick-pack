import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { AppContext } from '../../context/AppContext';
import { Colors, Typography } from '../../styles';
import Divider from '../../components/Divider';
import { PickerContext } from '../../context/PickerContext';
import TickComponent from '../../components/TickComponent';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ItemSection from '../../components/ItemSection';

const screenWidth = Math.round(Dimensions.get('window').width);
const w = screenWidth - 32;

const SubstitutesScreen = ({
  route: {
    params: { item, requiredQty, existingQty, startTime, endTime },
  },
  navigation,
}) => {
  const {
    similarItems = [],
    getSimilarItemList,
    postSuggestedSubstitutes,
    getOrdersList,
  } = useContext(PickerContext);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const [checkedList, setCheckedList] = useState([]);

  const [isSuggestLoad, setIsSuggestLoad] = useState(false);

  const [loading, setLoading] = useState(true);

  const onCheck = (i) => {
    const temp = checkedList;
    temp[i] = !temp[i] ? similarItems[i] : null;
    setCheckedList([...temp]);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    const onMount = async () => {
      await getSimilarItemList(item?.id, item?.item_type);
    };
    onMount();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSuggestSubstitute = async () => {
    setIsSuggestLoad(true);
    const isCheckedListEmpty = checkedList.filter((itm) => {
      if (itm !== null) {
        return itm;
      }
    });
    if (isCheckedListEmpty.length === 0 && similarItems?.length !== 0) {
      ToastAndroid.show(locale?.selectSubst, ToastAndroid.SHORT);
    } else {
      const payload = {
        original_item_id: item?.id,
        more_quantity_required: requiredQty,
        existing_quantity: existingQty,
        order_id: item?.orderId,
        item_type: item?.item_type,
        suggested_items: isCheckedListEmpty,
      };
      try {
        await postSuggestedSubstitutes(payload).then(async () => {
          await getOrdersList();
        });
        navigation.navigate('SubstituteRequestedScreen');
      } catch {
        if (item?.substituted || item?.item?.assigned_item) {
          ToastAndroid.show(locale?.error?.substituted, ToastAndroid.SHORT);
        } else if (item?.item?.repicked) {
          ToastAndroid.show(locale?.error?.repicked, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
        }
      }
    }
    setIsSuggestLoad(false);
  };

  let status = item?.picking_completed
    ? locale?.status?.PiC
    : item?.assigned_item
    ? locale?.status?.subst
    : item?.substitution_initiated
    ? locale?.status?.si
    : // : item?.repick_completed === false
      // ? locale?.status?.rn
      locale?.status?.Pi;
  return (
    <SafeAreaView style={styles.container}>
      {!similarItems ? (
        <Loader fullScreen />
      ) : (
        <>
          <ScrollView>
            <ItemSection
              title={item?.name}
              price={item?.price && item.price.toFixed(2)}
              quantity={item?.qty}
              position={item?.position}
              department={item?.department}
              type={item?.order_type}
              status={status}
              startTime={startTime}
              endTime={endTime}
              img={item?.image_url}
              locale={locale}
            />
            <ItemCheckList
              items={similarItems}
              onPress={onCheck}
              stock="In stock"
              checkedList={checkedList}
              loading={loading}
              locale={locale}
            />
          </ScrollView>

          <Button
            title={
              similarItems.length === 0
                ? !loading
                  ? locale?.IS_notify_CRM
                  : locale.IS_substituteButton
                : locale.IS_substituteButton
            }
            style={{
              borderRadius: 0,
              bottom: 0,
              width: '100%',
            }}
            loading={isSuggestLoad}
            onPress={onSuggestSubstitute}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const ItemCheckList = ({
  items,
  onPress,
  stock,
  checkedList,
  locale,
  loading,
}) => {
  return (
    <FlatList
      data={items}
      scrollEnabled={false}
      style={styles.orderItemsList}
      keyExtractor={(item, indx) => `${indx}${item.id}`}
      ListEmptyComponent={() =>
        loading ? (
          <ActivityIndicator
            style={styles.emptyChecklist}
            color={Colors.BLACK}
          />
        ) : (
          <Text style={styles.emptyChecklist}>{locale?.noSimilar}</Text>
        )
      }
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity onPress={() => onPress(index)}>
            <View style={styles.orderItem}>
              <View style={styles.departmentBox}>
                <TickComponent
                  enabled={
                    checkedList?.length === 0 ? false : checkedList[index]
                  }
                />
                <View style={styles.suggestList}>
                  <Text style={styles.suggestItemNameText}>{item.name}</Text>
                </View>
              </View>
              {/* <Text
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
            </Text> */}
            </View>
          </TouchableOpacity>
        );
      }}
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
    marginBottom: 60,
  },
  departmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  stockBox: {
    marginRight: 20,
    ...Typography.normal12,
  },
  suggestList: { width: '75%' },
  suggestItemNameText: { ...Typography.bold15, flexWrap: 'wrap' },
  emptyChecklist: {
    ...Typography.normal15,
    marginVertical: 20,
    alignSelf: 'center',
    color: Colors.primary4,
  },
});

export default SubstitutesScreen;

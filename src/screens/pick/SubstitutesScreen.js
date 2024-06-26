import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { AppContext } from '../../context/AppContext';
import { Colors } from '../../styles';
import { PickerContext } from '../../context/PickerContext';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ItemSection from '../../components/ItemSection';
import ItemCheckList from '../../components/ItemCheckList';

const screenWidth = Math.round(Dimensions.get('window').width);
const w = screenWidth - 32;

/**
 * Screen for initiating substitution.
 */
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
    setSimilarItems,
  } = useContext(PickerContext);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const [checkedList, setCheckedList] = useState([]);
  const [isSuggestLoad, setIsSuggestLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifyCRMLoading, setNotifyCRMLoading] = useState(false);

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
    return () => {
      setSimilarItems([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Function for submitting suggestions for substitution
   */
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
      console.warn(payload);
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

  /**
   * Function to show substitution in CRM without suggestions
   */
  const forceNotifyCRM = async () => {
    setNotifyCRMLoading(true);
    const payload = {
      original_item_id: item?.id,
      more_quantity_required: requiredQty,
      existing_quantity: existingQty,
      order_id: item?.orderId,
      item_type: item?.item_type,
      suggested_items: [],
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
    setNotifyCRMLoading(false);
  };

  let status = item?.picking_completed
    ? locale?.status?.PiC
    : item?.assigned_item
    ? locale?.status?.subst
    : item?.substitution_initiated
    ? locale?.status?.si
    : locale?.status?.Pi;

  return (
    <SafeAreaView style={styles.container}>
      {!similarItems ? (
        <Loader fullScreen />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
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
            <Button
              title={locale?.IS_notify_CRM}
              style={styles.searchButton}
              loading={notifyCRMLoading}
              onPress={forceNotifyCRM}
            />
            <Button
              title={locale?.SbS_search}
              style={styles.searchButton}
              onPress={() => navigation.navigate('SearchProductScreen')}
            />
            <ItemCheckList
              items={similarItems}
              onPress={onCheck}
              stock="In stock"
              checkedList={checkedList}
              loading={loading}
              emptyText={locale?.noSimilar}
            />
          </ScrollView>
          <Button
            title={locale.IS_substituteButton}
            style={styles.suggestButton}
            loading={isSuggestLoad}
            onPress={onSuggestSubstitute}
            disabled={similarItems.length === 0}
          />
        </>
      )}
    </SafeAreaView>
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
    backgroundColor: Colors.lightViolet,
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
  searchButton: {
    marginHorizontal: 32,
    marginTop: 20,
  },
  suggestButton: {
    borderRadius: 0,
    bottom: 0,
    width: '100%',
  },
});

export default SubstitutesScreen;

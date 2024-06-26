import React, { useContext, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../styles';
import { AppContext } from '../../context/AppContext';
import { Constants } from '../../utils';
import { PickerContext } from '../../context/PickerContext';
import Loader from '../../components/Loader';
import Timer from '../../components/Timer';
import ItemSection from '../../components/ItemSection';
import VerifyItemSection from '../../components/VerifyItemSection';
import VerifiedItem from '../../components/VerifiedItem';

/**
 * Item Screen for picker
 */
const ItemScreen = ({
  navigation,
  route: {
    params: { item, timeLeft, startTime, endTime, sales_incremental_id },
  },
}) => {
  const [timeOut, setTimeOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    locale: { locale },
  } = useContext(AppContext);

  const { setItemPicked, getOrdersList, getDropList } = useContext(
    PickerContext,
  );

  const onManualEntry = async (itemsQty) => {
    setIsLoading(true);
    await setItemPicked(
      item?.id,
      item?.item_type,
      itemsQty,
      item?.qty ?? item?.repick_qty ?? 0,
      0,
    ).then(async () => {
      await getOrdersList();
      await getDropList();
      navigation.navigate('ItemSuccessScreen');
    });
  };

  let status = item?.picking_completed
    ? locale?.status?.PiC
    : item?.item_type === 'substitute'
    ? locale?.status?.subst
    : item?.substitution_initiated
    ? locale?.status?.si
    : item?.bf_substitution_initiated
    ? locale?.status?.bfSI
    : locale?.status?.Pi;

  const onImagePress = () =>
    navigation.navigate('ViewImageScreen', {
      source: item?.image_url,
      sales_incremental_id,
    });

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Loader fullScreen />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Timer timeStamp={timeLeft} full />
        <ItemSection
          title={item?.name ? item?.name : Constants.emptyItemName}
          price={item?.price ? item?.price?.toFixed(2) : 0}
          quantity={
            item?.qty ? item?.qty : item?.repick_qty ? item?.repick_qty : 0
          }
          position={item?.position}
          department={item?.department}
          type={item?.order_type ? item?.order_type : locale?.status?.SD}
          status={status}
          startTime={startTime}
          endTime={endTime}
          img={item?.image_url}
          locale={locale}
          slotType={item?.order_type}
          onImagePress={onImagePress}
        />
        <View style={styles.skuBox}>
          <Text>SKU : {item?.sku ? item?.sku : Constants.emptySku}</Text>
          {item?.barcode && <Text>Barcode : {item?.barcode}</Text>}
          {item?.coupon_code && <Text>Coupon Code : {item?.coupon_code}</Text>}
        </View>
        {item?.picker_checked ? (
          <VerifiedItem locale={locale} />
        ) : (
          <VerifyItemSection
            navigation={navigation}
            item={item}
            timeOut={timeOut}
            setTimerOut={() => {
              setTimeOut(true);
            }}
            onManualEntry={onManualEntry}
            startTime={startTime}
            endTime={endTime}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  timerDivider: {
    height: '100%',
    width: 1,
    backgroundColor: Colors.WHITE,
    opacity: 0.25,
  },
  skuBox: {
    backgroundColor: Colors.offWhite,
    padding: 10,
    borderRadius: 7,
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 32,
    justifyContent: 'center',
  },
  loading: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.WHITE,
  },
  timerContainer: {
    backgroundColor: Colors.secondaryRed,
    padding: 20,
    marginHorizontal: 32,
    marginVertical: 24,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timerContainer2: { padding: 10, marginHorizontal: 0, marginVertical: 0 },
  flexDirectionRow: { flexDirection: 'row' },
});

export default ItemScreen;

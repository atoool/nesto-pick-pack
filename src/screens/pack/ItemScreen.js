import React, { createRef, useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
} from 'react-native';
import moment from 'moment-timezone';

import { Colors } from '../../styles';
import { AppContext } from '../../context/AppContext';
import { PackerContext } from '../../context/PackerContext';
import Loader from '../../components/Loader';
import Timer from '../../components/Timer';
import formatAmPm from '../../utils/formatAmPm';
import { Constants } from '../../utils';
import VerifiedItem from '../../components/VerifiedItem';
import PackerItemSection from '../../components/PackerItemSection';
import PackerVerifyItemSection from '../../components/PackerVerifyItemSection';

/**
 * Item Screen for packer
 */
const ItemScreen = ({
  route: {
    params: {
      item,
      orderId,
      time_slot,
      order_type,
      timeLeft,
      sales_incremental_id,
    },
  },
  navigation,
}) => {
  const containerRef = createRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isRePickLoading, setIsRePickLoading] = useState(false);

  const start = time_slot?.start_time;
  const end = time_slot?.end_time;

  const {
    locale: { locale },
  } = useContext(AppContext);
  const { postRePick, setPackedItemAsMarked, getPackerOrderList } = useContext(
    PackerContext,
  );

  /**
   * Function to mark an item as packed
   */
  const onManualEntry = async () => {
    setIsLoading(true);
    try {
      await setPackedItemAsMarked(
        item?.id,
        item?.item_type,
        item?.qty ?? (item?.repick_qty ? item?.total_qty : 0),
        0,
      ).then(async () => {
        await getPackerOrderList();
        navigation.navigate('ItemSuccessScreen');
      });
    } catch {}
  };

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
    <SafeAreaView
      ref={(r) => (containerRef.current = r?.props)}
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Timer timeStamp={timeLeft} full />
        <PackerItemSection
          title={item?.name ? item?.name : Constants.emptyItemName}
          price={item?.price ? item?.price : 0}
          quantity={
            item?.qty ? item?.qty : item?.repick_qty ? item?.total_qty : 1
          }
          position={item?.position}
          department={item?.department}
          status={
            item?.packing_completed
              ? locale?.status.PaC
              : item?.repick_completed === false
              ? locale?.status?.ri
              : item?.repick_completed
              ? locale?.status?.rc
              : locale?.status.Pa
          }
          type={order_type ? order_type : locale?.status.SD}
          start_time={formatAmPm(start)}
          end_time={formatAmPm(end)}
          img={item?.image_url}
          locale={locale}
          slotType={
            (item?.order_type ?? 'scheduled') === 'scheduled'
              ? 'Scheduled'
              : 'Express'
          }
          date={moment(time_slot?.start_time)?.format('Do MMM, YYYY')}
          onImagePress={onImagePress}
        />
        <View style={styles.skuBox}>
          <Text>SKU : {item?.sku ? item?.sku : Constants.emptySku}</Text>
          {item?.barcode && <Text>Barcode : {item?.barcode}</Text>}
          {item?.coupon_code && <Text>Coupon Code : {item?.coupon_code}</Text>}
        </View>
        {item?.packer_checked ? (
          <VerifiedItem locale={locale} />
        ) : (
          (item?.repick_completed === undefined || item?.repick_completed) && (
            <PackerVerifyItemSection
              containerRef={containerRef.current}
              item={item}
              orderId={orderId}
              navigation={navigation}
              postRePick={postRePick}
              onManualEntry={onManualEntry}
              getPackerOrderList={getPackerOrderList}
              setIsLoading={setIsRePickLoading}
            />
          )
        )}
      </ScrollView>
      <Modal visible={isRePickLoading} animationType="fade" transparent>
        <View style={styles.rePickLoader}>
          <View style={styles.whiteCircle}>
            <Loader />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  loading: { height: '100%', width: '100%', backgroundColor: Colors.WHITE },
  skuBox: {
    backgroundColor: Colors.offWhite,
    padding: 10,
    borderRadius: 7,
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 32,
    justifyContent: 'center',
  },
  rePickLoader: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  whiteCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'white',
  },
});

export default ItemScreen;

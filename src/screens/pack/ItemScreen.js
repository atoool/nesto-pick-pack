import React, { createRef, useContext, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../styles';
import { AppContext } from '../../context/AppContext';
import { PackerContext } from '../../context/PackerContext';
import Loader from '../../components/Loader';
import TimerComponent from '../../components/TimerComponent';
import formatAmPm from '../../utils/formatAmPm';
import { Constants } from '../../utils';
import VerifiedItem from '../../components/VerifiedItem';
import PackerItemSection from '../../components/PackerItemSection';
import PackerVerifyItemSection from '../../components/PackerVerifyItemSection';

const ItemScreen = ({
  route: {
    params: { item, orderId, time_slot, order_type, timeLeft },
  },
  navigation,
}) => {
  const containerRef = createRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const start = time_slot?.start_time;
  const end = time_slot?.end_time;
  const timer = timeLeft
    ? new Date(timeLeft) <= new Date()
      ? 0
      : new Date(timeLeft) / 1000 - new Date() / 1000
    : 0;

  const {
    locale: { locale },
  } = useContext(AppContext);
  const { postRePick, setPackedItemAsMarked, getPackerOrderList } = useContext(
    PackerContext,
  );

  const onManualEntry = async () => {
    setIsLoading(true);
    try {
      await setPackedItemAsMarked(item?.id, item?.item_type).then(async () => {
        await getPackerOrderList();
        navigation.navigate('ItemSuccessScreen');
      });
    } catch {}
    // setIsLoading(false);
  };
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
        <TimerComponent fullTimer ss={timer} />
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
        />
        <View style={styles.skuBox}>
          <Text>SKU : {item?.sku ? item?.sku : Constants.emptySku}</Text>
          {item?.barcode && <Text>Barcode : {item?.barcode}</Text>}
          {/* mock orderType */}
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
            />
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  loading: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.WHITE,
  },
  skuBox: {
    backgroundColor: Colors.offWhite,
    padding: 10,
    borderRadius: 7,
    height: 60,
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 32,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

export default ItemScreen;

import moment from 'moment-timezone';
import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import IconTextInfo from '../../components/IconTextInfo';
import InfoText from '../../components/InfoText';
import { AppContext } from '../../context/AppContext';
import { Colors } from '../../styles';

/**
 * Shared Order details result screen
 */
const OrderDetailsResult = ({ navigation, route: { params } }) => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  console.log(params.res);
  const sales_incremental_id = params?.res?.sales_incremental_id;
  const sales_order_id = params?.res?.sales_order_id;
  const id = params?.res?.id;
  const packer_details = params?.res?.packer_details ?? {
    packer_id: 'invalid',
    packer_name: 'invalid',
  };
  const items = params?.res?.items ?? [];
  const order_type = params?.res?.order_type ?? 'invalid order type';
  const order_start_time = params?.res?.order_start_time;
  const order_end_time = params?.res?.order_end_time;
  const delivery_start_time = params?.res?.delivery_start_time;
  const delivery_end_time = params?.res?.delivery_end_time;
  const hand_off_time = params?.res?.hand_off_time;
  const updated = params?.res?.updated ?? true;

  const { packer_id, packer_name } = packer_details;

  const picking_initiated = params?.res?.picking_initiated ?? false;
  const picking_completed = params?.res?.picking_completed ?? false;

  //from crm
  const dropped_off_to_packer_bin =
    params?.res?.dropped_off_to_packer_bin ?? false;
  const packing_completed = params?.res?.packing_completed ?? false;
  const allow_substitution = params?.res?.allow_substitution ?? false;
  const bins_assigned = params?.res?.bins_assigned ?? false;
  const order_cancelled = params?.res?.order_cancelled ?? false;
  const coupon_code = params?.res?.coupon_code ?? null;

  //end of from crm

  let deliveryStartTime = moment(delivery_start_time).format(
    'MMMM Do YYYY, h:mm a',
  );
  deliveryStartTime =
    deliveryStartTime === 'Invalid date' ? 'To Be Declared' : deliveryStartTime;

  let deliveryEndTime = moment(delivery_end_time).format(
    'MMMM Do YYYY, h:mm a',
  );
  deliveryEndTime =
    deliveryEndTime === 'Invalid date' ? 'To Be Declared' : deliveryEndTime;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <InfoText title={'Sales Incremental ID'} body={sales_incremental_id} />
        <InfoText title={'Sales Order ID'} body={sales_order_id} />
        <InfoText title={'Lambda Order ID'} body={id} />
        <InfoText title={'Packer Name'} body={packer_name} />
        <InfoText title={'Packer ID'} body={packer_id} />
        <InfoText title={'Items Count'} body={items.length} />
        {coupon_code && <InfoText title={'Coupon code'} body={coupon_code} />}
        <InfoText title={'Order Type'} body={order_type} />
        <InfoText
          title={'Hand Off Time'}
          body={moment(hand_off_time).format('MMMM Do YYYY, h:mm a')}
        />
        <InfoText
          title={'Order Start Time'}
          body={moment(order_start_time).format('MMMM Do YYYY, h:mm a')}
        />
        <InfoText
          title={'Order End Time'}
          body={moment(order_end_time).format('MMMM Do YYYY, h:mm a')}
        />
        <InfoText title={'Delivery Start Time'} body={deliveryStartTime} />
        <InfoText title={'Delivery End Time'} body={deliveryEndTime} />
        <InfoText title={'Order Statuses'} />
        {updated && <IconTextInfo name="edit" body={'Order updated'} />}
        {allow_substitution && (
          <IconTextInfo name="settings" body={'Substitution allowed'} />
        )}
        {bins_assigned && (
          <IconTextInfo name="archive" body={'Bins assigned'} />
        )}
        {picking_initiated && (
          <IconTextInfo name="user" body={'Picking initiated'} />
        )}
        {picking_completed && (
          <IconTextInfo name="user-check" body={'Picking completed'} />
        )}

        {dropped_off_to_packer_bin && (
          <IconTextInfo name="download" body={'Dropped off to packer bin'} />
        )}
        {packing_completed && (
          <IconTextInfo name="package" body={'Packing complete'} />
        )}
        {order_cancelled && (
          <IconTextInfo name="alert-triangle" body={'Order canceled'} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  contentContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBox: {
    height: 40,
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  itemScannedText: {
    position: 'absolute',
    height: '99%',
    width: '100%',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btnStyle: {
    width: 200,
  },
});

export default OrderDetailsResult;

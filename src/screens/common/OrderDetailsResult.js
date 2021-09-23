import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import moment from 'moment-timezone';
import { AppContext } from '../../context/AppContext';
import InfoText from '../../components/InfoText';
import { Colors } from '../../styles';

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
  const delivery_start_time = params?.res?.delivery_start_time;
  const delivery_end_time = params?.res?.delivery_end_time;
  const hand_off_time = params?.res?.hand_off_time;
  const updated = params?.res?.updated ?? true;

  const { packer_id, packer_name } = packer_details;

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
        <InfoText title={'Order Type'} body={order_type} />
        <InfoText
          title={'Hand Off Time'}
          body={moment(hand_off_time).format('MMMM Do YYYY, h:mm a')}
        />
        <InfoText
          title={'Delivery Start Time'}
          body={moment(delivery_start_time).format('MMMM Do YYYY, h:mm a')}
        />
        <InfoText
          title={'Delivery End Time'}
          body={moment(delivery_end_time).format('MMMM Do YYYY, h:mm a')}
        />
        {updated && (
          <InfoText
            title={'Order updated'}
            body={'The order has been edited'}
          />
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

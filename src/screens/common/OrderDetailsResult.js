import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
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
  const packer_details = params?.res?.packer_details ?? {
    packer_id: 'invalid',
    packer_name: 'invalid',
  };
  const { packer_id, packer_name } = packer_details;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {/* todo  */}
        <InfoText title={'Sales Incremental ID'} body={sales_incremental_id} />
        <InfoText title={'Sales Order ID'} body={sales_order_id} />
        <InfoText title={'Packer Name'} body={packer_name} />
        <InfoText title={'Packer ID'} body={packer_id} />
        <InfoText title={'Packer ID'} body={packer_id} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  contentContainer: {
    margin: 30,
    // flex: 1,
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

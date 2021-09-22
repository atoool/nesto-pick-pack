import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import { AppContext } from '../../context/AppContext';
import { getOrderDetails } from '../../api';
import { Colors } from '../../styles';
import Input from '../../components/Input';

const OrderDetails = ({ navigation, route: { params } }) => {
  const {
    locale: { locale },
  } = useContext(AppContext);

  const [orderID, setOrderID] = useState('');
  const [fetchingDetails, setFetchingDetails] = useState(false);

  useEffect(() => {
    params?.id ? setOrderID(params?.id) : setOrderID('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _getOrderDetails = async () => {
    setFetchingDetails(true);
    try {
      const res = await getOrderDetails(locale, orderID);
      navigation.navigate('OrderDetailsResult', { res });
      setFetchingDetails(false);
    } catch (e) {
      setFetchingDetails(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <Input
          placeholder={locale?.placeholder.enterOrderNumber}
          value={orderID}
          keyboardType={'numeric'}
          onChangeText={(text) => setOrderID(text)}
        />
        <Button
          title={'GET DETAILS'}
          onPress={_getOrderDetails}
          loading={fetchingDetails}
          disabled={orderID === ''}
          style={styles.btnStyle}
        />
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

export default OrderDetails;

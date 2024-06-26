import React, { createRef, useContext, useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import Title from '../../components/Title';
// import { getOrdersList } from '../../api';
import { AppContext } from '../../context/AppContext';
import NoContent from '../../components/NoContent';
import AccordionItem from '../../components/AccordionItem';
import Divider from '../../components/Divider';
import { Colors } from '../../styles';
import { PackerContext } from '../../context/PackerContext';
import { Constants } from '../../utils';

/**
 * Screen for showing packed ordered that need to be verified.
 */
const PackScreen = ({ navigation, route }) => {
  const flatListRef = createRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const {
    locale: { locale },
  } = useContext(AppContext);
  const { orderList, getPackerOrderList } = useContext(PackerContext);

  const _getOrdersList = async () => {
    setRefreshing(true);
    try {
      await getPackerOrderList();
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setRefreshing(false);
    }
  };

  const getOrders = async () => {
    setLoading(true);
    await getPackerOrderList();
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateTo = (
    orderId,
    item,
    time_slot,
    order_type,
    sales_incremental_id,
    timeLeft,
  ) =>
    navigation.navigate('ItemScreen', {
      orderId: orderId,
      sales_incremental_id,
      item,
      time_slot,
      order_type,
      timeLeft,
    });

  const getPackedItemCount = (list) => {
    if (list && list.length !== 0) {
      return list.filter((itm) => itm.packer_checked).length;
    }
    return 0;
  };

  useEffect(() => {
    if (
      route?.params?.index &&
      orderList?.length > 1 &&
      route?.params?.index < orderList?.length
    ) {
      flatListRef.current.scrollToIndex({
        index: route?.params?.index,
        animated: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route?.params?.index]);

  return (
    <SafeAreaView style={styles.container}>
      <Title text={locale?.headings.pack} />
      <FlatList
        data={orderList}
        ListEmptyComponent={() => (
          <NoContent name="NoOrdersSVG" isLoading={isLoading} />
        )}
        ref={(r) => (flatListRef.current = r)}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item, indx) => `${indx}${item?.id}`}
        ItemSeparatorComponent={() => <Divider />}
        showsVerticalScrollIndicator={false}
        onRefresh={() => _getOrdersList()}
        refreshing={refreshing}
        renderItem={({ item, index }) => {
          const packing_completed =
            item?.items?.filter((itm) => itm?.packer_checked)?.length ===
            item?.items?.length;
          return (
            <AccordionItem
              order={{ id: item?.id ? item?.id : '#', ...item }}
              orderType={
                item?.order_type ? item?.order_type : locale?.status.SD
              }
              status={
                packing_completed ? locale?.status.PaC : locale?.status.Pa
              }
              timeLeft={item?.packing_deadline_timestamp}
              index={index}
              itemCount={
                getPackedItemCount(item?.items) +
                '/' +
                (item?.items ? item?.items?.length : 0) +
                ' ' +
                locale?.packed
              }
              onPress={(itm) => {
                navigateTo(
                  item?.id,
                  itm,
                  item?.time_slot,
                  item?.order_type,
                  item?.sales_incremental_id
                    ? item?.sales_incremental_id
                    : Constants.emptyOrderId,
                  item?.packing_deadline_timestamp,
                );
              }}
              buttonTitle={locale?.PS_isReady}
              showReadyButton={packing_completed}
              userType={'packer'}
              locale={locale}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  contentContainer: { paddingBottom: 60 },
});

export default PackScreen;

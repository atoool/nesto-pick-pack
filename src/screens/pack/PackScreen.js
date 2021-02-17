import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import packerOrders from '../../mock/packerOrders.json';
import Title from '../../components/Title';
// import { getOrdersList } from '../../api';
import { AppContext } from '../../context/AppContext';
import NoContent from '../../components/NoContent';
import AccordionItem from '../../components/AccordionItem';
import Divider from '../../components/Divider';
import { Colors } from '../../styles';
import { PackerContext } from '../../context/PackerContext';

const PackScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const {
    locale: { locale },
  } = useContext(AppContext);
  const { assignBinList, getAssignBinList, setOrderReady } = useContext(
    PackerContext,
  );

  const _getOrdersList = async () => {
    setRefreshing(true);
    try {
      await getOrders();
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setRefreshing(false);
    }
  };

  const getOrders = async () => {
    setLoading(true);
    await getAssignBinList();
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateTo = (orderId, item, time_slot, order_type) =>
    navigation.navigate('ItemScreen', {
      orderId: orderId,
      item,
      time_slot,
      order_type,
    });

  const onReadyPress = (id) => setOrderReady(id);

  const getPackedItemCount = (list) => {
    if (list && list.length !== 0) {
      return list.filter((itm) => itm.packer_checked).length;
    } else {
      return 0;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title text={locale?.headings.pack} />
      <FlatList
        data={assignBinList}
        ListEmptyComponent={() => (
          <NoContent name="NoOrdersSVG" isLoading={isLoading} />
        )}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item, indx) => `${indx}${item.id}`}
        ItemSeparatorComponent={() => <Divider />}
        showsVerticalScrollIndicator={false}
        onRefresh={() => _getOrdersList()}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <AccordionItem
            order={{ id: item?.id ? item?.id : '####', ...item }}
            orderType={item?.order_type ? item?.order_type : locale?.status.SD}
            status={
              item?.packing_completed ? locale?.status.PaC : locale?.status.Pa
            }
            itemCount={
              getPackedItemCount(item?.items) +
              '/' +
              (item?.items ? item?.items.length : 0) +
              ' ' +
              locale?.packed
            }
            onPress={(itm) => {
              navigateTo(item?.id, itm, item.time_slot, item.order_type);
            }}
            buttonTitle={locale?.PS_isReady}
            onReadyPress={onReadyPress}
            showReadyButton={item?.packing_completed}
            userType={'packer'}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  contentContainer: { paddingBottom: 60 },
});

export default PackScreen;

import React, { useContext, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import packerOrders from '../../mock/packerOrders.json';
import Title from '../../components/Title';
// import { getOrdersList } from '../../api';
import { AppContext } from '../../context/AppContext';
import NoContent from '../../components/NoContent';
import AccordionItem from '../../components/AccordionItem';
import Divider from '../../components/Divider';
import { Colors } from '../../styles';

const PackScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const _getOrdersList = async () => {
    setRefreshing(true);
    try {
      // const res = await getOrdersList();
      setOrders(packerOrders.data);
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setOrders(packerOrders.data);
      setRefreshing(false);
    }
  };

  const navigateTo = (orderId, item) =>
    navigation.navigate('ItemScreen', { orderId, item });

  return (
    <SafeAreaView style={styles.container}>
      <Title text={locale?.headings.pack} />
      <FlatList
        data={orders}
        ListEmptyComponent={() => <NoContent name="NoOrdersSVG" />}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item) => item.order_id}
        ItemSeparatorComponent={() => <Divider />}
        showsVerticalScrollIndicator={false}
        onRefresh={() => _getOrdersList()}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <AccordionItem
            order={{ orderId: item.order_id, items: item.items }}
            orderType={locale?.status.ED}
            status={locale?.status.Pa}
            itemCount={'1/20 ' + locale.packed}
            onPress={(itm) => {
              navigateTo(item.order_id, itm);
            }}
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

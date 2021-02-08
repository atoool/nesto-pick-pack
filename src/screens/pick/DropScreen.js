import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
//Components
import Title from '../../components/Title';
import NoContent from '../../components/NoContent';
//Mock Imports
import pickerOrders from '../../mock/pickerOrders.json';

// import { getOrdersList } from '../../api';
import { AppContext } from '../../context/AppContext';
import AccordionItem from '../../components/AccordionItem';
import { Colors } from '../../styles';
import Divider from '../../components/Divider';

const DropScreen = () => {
  const {
    locale: { locale },
  } = useContext(AppContext);

  const _getOrdersList = async () => {
    setRefreshing(true);
    try {
      // const res = await getOrdersList();
      setOrders(pickerOrders);
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setOrders(pickerOrders);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // _getOrdersList();
  }, []);

  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Title text={locale?.headings.drop} />
      <FlatList
        data={orders}
        ListEmptyComponent={() => <NoContent name="NoOrdersSVG" />}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.orderId}
        ItemSeparatorComponent={() => <Divider />}
        onRefresh={() => _getOrdersList()}
        refreshing={refreshing}
        renderItem={({ item, index }) => (
          <AccordionItem
            order={item}
            index={index}
            orderType={locale?.status.ED}
            status={locale?.status.PiC}
            itemCount={'20 ' + locale?.items}
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

export default DropScreen;

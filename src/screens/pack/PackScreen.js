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
import { PackerContext } from '../../context/PackerContext';

const PackScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const {
    locale: { locale },
  } = useContext(AppContext);
  const { assignBinList, getAssignBinList, setOrderReady } = useContext(
    PackerContext,
  );

  const _getOrdersList = async () => {
    setRefreshing(true);
    try {
      await getAssignBinList();
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setRefreshing(false);
    }
  };

  const navigateTo = (orderId, item) =>
    navigation.navigate('ItemScreen', { orderId, item });
  const onReadyPress = (id) => setOrderReady(id);
  return (
    <SafeAreaView style={styles.container}>
      <Title text={locale?.headings.pack} />
      <FlatList
        data={assignBinList}
        ListEmptyComponent={() => <NoContent name="NoOrdersSVG" />}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item, indx) => `${indx}`}
        ItemSeparatorComponent={() => <Divider />}
        showsVerticalScrollIndicator={false}
        onRefresh={() => _getOrdersList()}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <AccordionItem
            order={{ id: item._id, items: item.items }}
            orderType={locale?.status.ED}
            status={locale?.status.Pa}
            itemCount={'1/20 ' + locale.packed}
            onPress={(itm) => {
              navigateTo(item.order_id, itm);
            }}
            buttonTitle={locale.PS_isReady}
            onReadyPress={onReadyPress}
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

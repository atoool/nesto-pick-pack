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
import { PickerContext } from '../../context/PickerContext';

const DropScreen = () => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  const { dropList, getDropList } = useContext(PickerContext);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      getDropList();
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // _getOrdersList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Title text={locale?.headings.drop} />
      <FlatList
        data={dropList}
        ListEmptyComponent={() => <NoContent name="NoOrdersSVG" />}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}`}
        ItemSeparatorComponent={() => <Divider />}
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={({ item, index }) =>
          item?.items.length !== 0 ? (
            <AccordionItem
              order={item}
              index={index}
              orderType={item.order_type}
              status={
                item.picking_completed ? locale?.status.PiC : locale.status.Pi
              }
              itemCount={'20 ' + locale?.items}
            />
          ) : (
            <NoContent name="NoOrdersSVG" />
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  contentContainer: { paddingBottom: 60 },
});

export default DropScreen;

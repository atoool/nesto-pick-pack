import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
//Components
import Title from '../../components/Title';
import NoContent from '../../components/NoContent';
import { AppContext } from '../../context/AppContext';
import AccordionItem from '../../components/AccordionItem';
import { Colors } from '../../styles';
import Divider from '../../components/Divider';
import { PickerContext } from '../../context/PickerContext';

/**
 * Screen for showing list of orders that are finished packing
 */
const DropScreen = () => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  const { dropList, getDropList } = useContext(PickerContext);

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getDropList();
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setRefreshing(false);
    }
  };

  const onMount = async () => {
    setLoading(true);
    await getDropList();
    setLoading(false);
  };

  useEffect(() => {
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPackedItemCount = (list) => {
    if (list && list.length !== 0) {
      return list.filter((itm) => itm.picker_checked).length;
    } else {
      return 0;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Title text={locale?.headings.drop} />
      <FlatList
        data={dropList}
        ListEmptyComponent={() => (
          <NoContent name="NoOrdersSVG" isLoading={isLoading} />
        )}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}${item.id}`}
        ItemSeparatorComponent={() => <Divider />}
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={({ item, index }) => {
          const picking_completed =
            item?.items?.filter((itm) => {
              if (itm?.picker_checked) {
                return itm;
              }
            })?.length === item?.items?.length;
          return (
            <AccordionItem
              order={item}
              index={index}
              timeLeft={item?.pickingDeadlineTimestamp}
              orderType={item?.order_type ? item.order_type : locale?.status.SD}
              status={picking_completed ? locale?.status.PiC : locale.status.Pi}
              itemCount={
                getPackedItemCount(item?.items) +
                '/' +
                item?.items?.length +
                ' ' +
                locale?.picked
              }
              buttonTitle={locale.DS_dropReady}
              showReadyButton={picking_completed}
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

export default DropScreen;

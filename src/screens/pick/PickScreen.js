import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../../styles';
//Components
import Title from '../../components/Title';
import NoContent from '../../components/NoContent';
//Mock Imports
import { AppContext } from '../../context/AppContext';
import PickList from '../../components/PickList';
import Divider from '../../components/Divider';
import { PickerContext } from '../../context/PickerContext';

const PickScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const {
    locale: { locale },
  } = useContext(AppContext);
  const { orders, getOrdersList } = useContext(PickerContext);

  const _getOrdersList = async () => {
    setRefreshing(true);
    try {
      await getOrdersList();
      console.warn(orders);
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setRefreshing(false);
    }
  };

  const onMount = async () => {
    setLoading(true);
    await getOrdersList();
    setLoading(false);
  };

  useEffect(() => {
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Title text={locale?.headings.pick} />
      <FlatList
        data={orders}
        ListEmptyComponent={() => (
          <NoContent name="NoOrdersSVG" isLoading={isLoading} />
        )}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}`}
        ItemSeparatorComponent={() => <Divider />}
        onRefresh={() => _getOrdersList()}
        refreshing={refreshing}
        renderItem={({ item, index }) => (
          <PickList
            items={item.items}
            index={index}
            orderType={''}
            itemCount={''}
            startTime={item.start_time}
            endTime={item.end_time}
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

export default PickScreen;

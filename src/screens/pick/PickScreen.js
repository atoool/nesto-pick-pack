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
  const {
    locale: { locale },
  } = useContext(AppContext);
  const { orders, getOrdersList } = useContext(PickerContext);

  const _getOrdersList = async () => {
    setRefreshing(true);
    try {
      getOrdersList();
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // _getOrdersList();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Title text={locale?.headings.pick} />
      <FlatList
        data={orders}
        ListEmptyComponent={() => <NoContent name="NoOrdersSVG" />}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}`}
        ItemSeparatorComponent={() => <Divider />}
        onRefresh={() => _getOrdersList()}
        refreshing={refreshing}
        renderItem={({ item, index }) => (
          <PickList
            items={item}
            index={index}
            orderType={locale?.status.ED}
            itemCount={'20 ' + locale?.items}
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

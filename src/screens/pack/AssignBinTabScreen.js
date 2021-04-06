import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../../styles';
//Components
import Title from '../../components/Title';
import NoContent from '../../components/NoContent';
import { AppContext } from '../../context/AppContext';
import Divider from '../../components/Divider';
import { PackerContext } from '../../context/PackerContext';
import BinItemList from '../../components/BinItemList';

const AssignBinTabScreen = () => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  const { assignBinList, getAssignBinList } = useContext(PackerContext);

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);

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
  const getOrders = async () => {
    setLoading(true);
    await getAssignBinList();
    setLoading(false);
  };
  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Title text={locale?.headings.Assign_Bin} />
      <FlatList
        data={assignBinList}
        ListEmptyComponent={() => (
          <NoContent name="NoOrdersSVG" isLoading={isLoading} />
        )}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={(item, indx) => `${indx}${item.id}`}
        onRefresh={() => _getOrdersList()}
        refreshing={refreshing}
        renderItem={({ item, index }) => (
          <BinItemList
            order={item}
            index={index}
            timeLeft={item?.hand_off_time}
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

export default AssignBinTabScreen;

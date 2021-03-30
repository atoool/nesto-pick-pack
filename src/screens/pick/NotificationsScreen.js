import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../../styles';
import Title from '../../components/Title';
import { AppContext } from '../../context/AppContext';
import NoContent from '../../components/NoContent';
import { PickerContext } from '../../context/PickerContext';
import Notification from '../../components/Notification';
import Divider from '../../components/Divider';

const NotificationsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const {
    locale: { locale },
  } = useContext(AppContext);
  const { notifications, getAllNotifications } = useContext(PickerContext);

  const _getNotifications = async () => {
    setRefreshing(true);
    try {
      await getAllNotifications();
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setRefreshing(false);
    }
  };
  const onMount = async () => {
    setLoading(true);
    await getAllNotifications();
    setLoading(false);
  };
  useEffect(() => {
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Title text={locale?.headings.notifications} />
      <FlatList
        ListEmptyComponent={() => (
          <NoContent name={'NoNotificationSVG'} isLoading={isLoading} />
        )}
        data={notifications}
        contentContainerStyle={styles.itemList}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        onRefresh={() => {
          _getNotifications();
        }}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <Notification title={item.title} body={item.body} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  itemList: { paddingBottom: 60 },
});
export default NotificationsScreen;

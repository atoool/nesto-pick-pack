import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../../styles';
import Title from '../../components/Title';
import { AppContext } from '../../context/AppContext';
import NoContent from '../../components/NoContent';
import { PackerContext } from '../../context/PackerContext';
import Notification from '../../components/Notification';

/**
 * Notifications Screen for packer
 */
const NotificationsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    locale: { locale },
  } = useContext(AppContext);
  const { notifications, getAllNotifications } = useContext(PackerContext);

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
    await getAllNotifications();
    setIsLoading(false);
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
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.borderLine} />}
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
  contentContainer: { paddingBottom: 60 },
  borderLine: {
    height: 1,
    backgroundColor: '#DFDEDE',
  },
});
export default NotificationsScreen;

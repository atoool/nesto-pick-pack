import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet } from 'react-native';
import { Typography, Colors } from '../../styles';
import Title from '../../components/Title';
import RepickSVG from '../../assets/svg/RepickSVG';
import { AppContext } from '../../context/AppContext';
import NoContent from '../../components/NoContent';
import { PickerContext } from '../../context/PickerContext';

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
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <Title text={locale?.headings.notifications} />
      <FlatList
        ListEmptyComponent={() => (
          <NoContent name={'NoNotificationSVG'} isLoading={isLoading} />
        )}
        data={notifications}
        contentContainerStyle={{ paddingBottom: 60 }}
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

const Notification = ({ title, body }) => {
  return (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationIconStyle}>
        <RepickSVG />
      </View>
      <View style={styles.notificationBodyContainer}>
        <Text style={Typography.bold17}>{title}</Text>
        <Text style={Typography.normal12}>{body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    marginHorizontal: 32,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationBodyContainer: { marginLeft: 20, flex: 1 },
  notificationIconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF3BD',
    width: 50,
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
  },
  borderLine: {
    height: 1,
    backgroundColor: '#DFDEDE',
  },
});
export default NotificationsScreen;

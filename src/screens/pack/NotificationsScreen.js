import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet } from 'react-native';
import { Typography, Colors } from '../../styles';
import Title from '../../components/Title';
import RepickSVG from '../../assets/svg/RepickSVG';
import { getNotifications } from '../../api';
import notifications from '../../mock/notification.json'

const NotificationsScreen = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const _getNotifications = async () => {
    setRefreshing(true);
    try {
      const res = await getNotifications();
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setNotificationList(notifications.data);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setNotificationList([{
      title: "Repicking Requested",
      body: "The quality check for Apples in order #123ABC has failed. The packer has asked to repick this."
    },
    {
      title: "Repicking Requested",
      body: "The quality check for Apples in order #123ABC has failed. The packer has asked to repick this."
    },
    {
      title: "Repicking Requested",
      body: "The quality check for Apples in order #123ABC has failed. The packer has asked to repick this."
    }])
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <Title text="Notifications" />
      <FlatList
        data={notificationList}
        contentContainerStyle={{ paddingBottom: 60 }}
        keyExtractor={(item, index) => { index.toString() }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.borderLine} />}
        onRefresh={() => { _getNotifications() }}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <Notification
            title={item.title}
            body={item.body}
          />
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

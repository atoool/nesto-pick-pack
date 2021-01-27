import React from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet } from 'react-native';
import { Typography, Colors } from '../../styles';
import Title from '../../components/Title';

const NotificationsScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE }}>
      <Title text="Notifications" />
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.borderLine} />}
        // onRefresh={() => {
        //   console.log('hi');
        // }}
        // refreshing={TODO}
        renderItem={(i) => (
          <Notification
            title="Repicking Requested"
            body="The quality check for Apples in order #123ABC has failed. The packer has asked to repick this."
          />
        )}
      />
    </SafeAreaView>
  );
};

const Notification = ({ title, body }) => {
  return (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationIconStyle} />
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

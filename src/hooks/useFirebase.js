/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Storage } from '../utils';
import { PickerContext } from '../context/PickerContext';
import { PackerContext } from '../context/PackerContext';
import { AppContext } from '../context/AppContext';

async function getTok() {
  try {
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }
    let authStatus = await messaging().hasPermission();

    if (authStatus !== messaging.AuthorizationStatus.AUTHORIZED) {
      authStatus = await messaging().requestPermission({
        alert: true,
        announcement: false,
        badge: true,
        carPlay: false,
        provisional: false,
        sound: true,
      });
    }
    if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      const token = await messaging().getToken();
      if (token) {
        console.log('fcmToken=================>');
        console.log(token);
        console.log('<=================fcmToken');
        await Storage.setItem('fcm_token', token);
        // console.log('FCM Token Sent', PAYLOAD);
      }
    }
  } catch (e) {
    console.log(e);
    console.log('ERROR FETCHING TOKEN');
  }
}

export function useSubscribeTopic(topic) {
  //  useEffect(()=>{
  messaging()
    .subscribeToTopic(topic)
    .then(() => console.log('Subscribed to topic!'));
  // },[])
}

export function useUnSubscribeTopic(topic) {
  // useEffect(()=>{
  messaging()
    .unsubscribeFromTopic(topic)
    .then(() => console.log('Unsubscribed from topic!'));
  //  },[])
}

export function useFirebase(authStateLoading, userType) {
  const { getOrdersList, getDropList } = useContext(PickerContext);
  const { getAssignBinList, getPackerOrderList } = useContext(PackerContext);
  const { onSetInAppMessage, onSetShowInAppMessage } = useContext(AppContext);

  // //Invoked when app is open.
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const action = remoteMessage?.data?.action
        ? remoteMessage?.data?.action
        : '';
      const title = remoteMessage?.notification?.title
        ? remoteMessage?.notification?.title
        : '';
      if (userType?.toLowerCase() === 'picker' && action === 'order_update') {
        await getOrdersList();
        await getDropList();
        onSetShowInAppMessage(true);
      } else if (action === 'order_update') {
        await getPackerOrderList();
        await getAssignBinList();
        onSetShowInAppMessage(true);
      }
      title !== '' && onSetInAppMessage(remoteMessage.notification);
    });

    return unsubscribe;
  }, []);

  // Register background handler
  useEffect(() => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        //TODO:
      },
    );
    return unsubscribe;
  }, []);

  //INVOKED WHEN APP IS CLOSED
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.data,
        );
      }
    });
  }, []);

  useEffect(() => {
    getTok();
  }, [authStateLoading, userType]);
}

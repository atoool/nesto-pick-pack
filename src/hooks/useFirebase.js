import { useEffect, useContext } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Linking } from 'react-native';
// import { updateFCMToken } from '../api';
// import * as RootNavigation from '../RootNavigation';
// import { NotificationsContext } from '../context/NotificationsContext';

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
        const PAYLOAD = { token };
        // await updateFCMToken(PAYLOAD);
        console.log('FCM Token Sent', PAYLOAD);
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

export function useFirebase() {
  // //Invoked when app is open.
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Linking.openURL(remoteMessage.data.key_1);
      console.warn(
        'FCM NOTIFCATION WHILE APP IN FG',
        JSON.stringify(remoteMessage.data),
      );
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Register background handler
  useEffect(() => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        //TODO:
      },
    );
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // Linking.openURL(remoteMessage.data.key_1);
      }
    });
    // Check whether an initial notification is available
    // messaging()
    //   .getInitialNotification()
    //   .then(async (remoteMessage) => {
    //     if (remoteMessage) {

    //       console.log(
    //         'Notification caused app to open from quit state:',
    //         remoteMessage.data,
    //       );
    //       // Linking.openURL(remoteMessage.data.key_1)
    //     }
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getTok();
  }, []);
}

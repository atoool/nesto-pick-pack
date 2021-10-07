/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { PickerContext } from '../context/PickerContext';
import { PackerContext } from '../context/PackerContext';
import { AppContext } from '../context/AppContext';
import { ToastAndroid } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { updateFCMToken } from '../api';

/**
 * Gets the Firebase Cloud Messaging token
 * after checking for authorization and the retrieved token is sent to backend.
 */
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
        const PAYLOAD = { fcm_token: token };
        await updateFCMToken(PAYLOAD);
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
  const { getOrdersList, getDropList } = useContext(PickerContext);
  const { getAssignBinList, getPackerOrderList } = useContext(PackerContext);
  const {
    onSetInAppMessage,
    onSetShowInAppMessage,
    locale: { locale },
  } = useContext(AppContext);
  const { authStateLoading, userType } = useContext(AuthContext);

  const onNotificationReceive = async (remoteMessage, foreground) => {
    const action = remoteMessage?.data?.action
      ? remoteMessage?.data?.action
      : '';
    const title = remoteMessage?.notification?.title
      ? remoteMessage?.notification?.title
      : '';
    foreground && title !== '' && onSetInAppMessage(remoteMessage.notification);
    if (userType?.toLowerCase() === 'picker' && action === 'order_update') {
      foreground && onSetShowInAppMessage(true);
      await getOrdersList();
      await getDropList();
      ToastAndroid.show(locale?.push?.orderRefresh, ToastAndroid.SHORT);
    } else if (
      userType?.toLowerCase() === 'packer' &&
      action === 'order_update'
    ) {
      foreground && onSetShowInAppMessage(true);
      await getPackerOrderList();
      await getAssignBinList();
      ToastAndroid.show(locale?.push?.orderRefresh, ToastAndroid.SHORT);
    }
  };
  //Invoked when app is open.
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('\n🔥 Firebase Notification when App is open\n');
      console.log(remoteMessage);
      await onNotificationReceive(remoteMessage, true);
    });

    return unsubscribe;
  }, [userType]);

  // Register background handler
  useEffect(() => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        console.log('\n🔥 Firebase Notification when App is open\n');
        console.log(remoteMessage);
        await onNotificationReceive(remoteMessage, false);
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
          '\n🔥 Firebase Notification caused app to open from background state:',
          remoteMessage,
        );
        await onNotificationReceive(remoteMessage, false);
      }
    });
  }, []);

  useEffect(() => {
    getTok();
  }, [authStateLoading, userType]);
}

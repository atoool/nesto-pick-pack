import { useContext, useEffect } from 'react';
import {
  getBuildNumber,
  getBundleId,
  getDeviceType,
  getSystemName,
  getSystemVersion,
  getVersion,
} from 'react-native-device-info';
import { fetch } from '@react-native-community/netinfo';
import { AppContext } from '../context/AppContext';

const useExtraPayload = () => {
  let payload = {
    appname: 'com.nesto.pickandpack',
    version: '1.0.1',
    buildNumber: 1,
    country: 'in',
    lang: 'en',
    network: 'wifi',
    loadcount: 40,
    devtype: 'Handset',
    os: 'android',
    osVersion: '10',
  };
  const {
    locale: { lan },
  } = useContext(AppContext);
  const onCall = async () => {
    try {
      payload.appname = await getBundleId();
      payload.buildNumber = await getBuildNumber();
      payload.version = await getVersion();
      payload.os = await getSystemName();
      payload.osVersion = await getSystemVersion();
      payload.devtype = await getDeviceType();
      const networkDetails = await fetch();
      payload.network = networkDetails.type;
      payload.lang = lan;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    onCall();
  }, []);
  return payload;
};

export default useExtraPayload;

import { Alert } from 'react-native';
import DataWedgeIntents from 'react-native-datawedge-intents';

import { isHigher } from './Version';

export const registerBroadcastReceiver = () =>
  DataWedgeIntents.registerBroadcastReceiver({
    filterActions: [
      'com.nesto.pickandpack.ACTION',
      'com.symbol.datawedge.api.RESULT_ACTION',
    ],
    filterCategories: ['android.intent.category.DEFAULT'],
  });

const sendCommand = (extraName, extraValue) => {
  const broadcastExtras = {};
  broadcastExtras[extraName] = extraValue;
  broadcastExtras.SEND_RESULT = 'true';
  DataWedgeIntents.sendBroadcastWithExtras({
    action: 'com.symbol.datawedge.api.ACTION',
    extras: broadcastExtras,
  });
};

export const determineVersion = () =>
  sendCommand('com.symbol.datawedge.api.GET_VERSION_INFO', '');

export const triggerScan = () =>
  sendCommand('com.symbol.datawedge.api.SOFT_SCAN_TRIGGER', 'TOGGLE_SCANNING');

const createProfiles = () => {
  sendCommand('com.symbol.datawedge.api.CREATE_PROFILE', 'NestoPickAndPack');

  const profileConfig = {
    PROFILE_NAME: 'NestoPickAndPack',
    PROFILE_ENABLED: 'true',
    CONFIG_MODE: 'UPDATE',
    PLUGIN_CONFIG: {
      PLUGIN_NAME: 'BARCODE',
      RESET_CONFIG: 'true',
      PARAM_LIST: {},
    },
    APP_LIST: [
      {
        PACKAGE_NAME: 'com.nesto.pickandpack',
        ACTIVITY_LIST: ['*'],
      },
    ],
  };
  sendCommand('com.symbol.datawedge.api.SET_CONFIG', profileConfig);

  const profileConfig2 = {
    PROFILE_NAME: 'NestoPickAndPack',
    PROFILE_ENABLED: 'true',
    CONFIG_MODE: 'UPDATE',
    PLUGIN_CONFIG: {
      PLUGIN_NAME: 'INTENT',
      RESET_CONFIG: 'true',
      PARAM_LIST: {
        intent_output_enabled: 'true',
        intent_action: 'com.nesto.pickandpack.ACTION',
        intent_delivery: '2',
      },
    },
  };
  sendCommand('com.symbol.datawedge.api.SET_CONFIG', profileConfig2);

  const profileConfig3 = {
    PROFILE_NAME: 'NestoPickAndPack',
    PROFILE_ENABLED: 'true',
    CONFIG_MODE: 'UPDATE',
    PLUGIN_CONFIG: {
      PLUGIN_NAME: 'BARCODE',
      PARAM_LIST: {
        scanner_selection: 'auto',
        decoder_ean8: 'true',
        decoder_ean13: 'true',
        decoder_code128: 'true',
        decoder_code39: 'true',
      },
    },
  };
  sendCommand('com.symbol.datawedge.api.SET_CONFIG', profileConfig3);
};

export const broadcastReceiver = (intent, callBack, setScannerState) => {
  if (
    intent.hasOwnProperty('com.symbol.datawedge.api.RESULT_GET_VERSION_INFO')
  ) {
    const datawedgeVersion =
      intent['com.symbol.datawedge.api.RESULT_GET_VERSION_INFO'].DATAWEDGE;
    if (!isHigher('8.2.60', datawedgeVersion)) {
      setScannerState?.('FOUND');
      createProfiles();
    } else {
      setScannerState?.('WRONG_VERSION');
      Alert.alert(
        '',
        'Scanning will work only on Zebra Scanner with Data Wedge API v8.2.60 or above',
      );
    }
  }
  if (intent.hasOwnProperty('com.symbol.datawedge.data_string')) {
    callBack?.(intent['com.symbol.datawedge.data_string']);
  }
};

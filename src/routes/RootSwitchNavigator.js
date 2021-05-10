import React, { useContext, useState, useEffect } from 'react';
import { Linking } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import remoteConfig from '@react-native-firebase/remote-config';

import SplashScreen from '../screens/common/SplashScreen';
import LoginScreen from '../screens/common/LoginScreen';
import PickTabsNavigator from '../routes/PickTabsNavigator';
import { AuthContext } from '../context/AuthContext';
import PackTabsNavigator from './PackTabsNavigator';
import { version } from '../../package.json';
import ModalComponent from '../components/ModalComponent';

import { PickerContextProvider } from '../context/PickerContext';
import { PackerContextProvider } from '../context/PackerContext';

const Stack = createStackNavigator();

const RootSwitchNavigator = () => {
  const { authStateLoading, userType } = useContext(AuthContext);
  const [configLoading, setConfigLoading] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [forced, setForced] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    fetchRemoteConfig();
  }, []);

  const fetchRemoteConfig = async () => {
    setVisible(false);
    try {
      await remoteConfig().fetch(0);
      await remoteConfig().activate();
      const _maintenanceMode =
        remoteConfig().getString('pickPackMaintenanceMode') === 'true';
      const minVersion = remoteConfig().getString('pickPackMinVersion');
      const latestVersion = remoteConfig().getString('pickPackLatestVersion');
      const _forced = isHigher(minVersion, version);
      const _updateAvailable = isHigher(latestVersion, version) || _forced;
      setUpdateAvailable(_updateAvailable);
      setForced(_forced);
      setMaintenanceMode(_maintenanceMode ?? false);
      setVisible(_updateAvailable || _maintenanceMode);
    } catch {}
    setConfigLoading(false);
  };

  const handleAppUpdate = () =>
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.nesto.pickandpack',
    );

  return (
    <>
      {authStateLoading ||
      configLoading ||
      maintenanceMode ||
      (updateAvailable && forced) ? (
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : userType.toLowerCase() === 'picker' ? (
        <PickerContextProvider>
          <PickTabsNavigator />
        </PickerContextProvider>
      ) : userType.toLowerCase() === 'packer' ? (
        <PackerContextProvider>
          <PackTabsNavigator />
        </PackerContextProvider>
      ) : (
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
      <ModalComponent
        visible={visible}
        text={
          maintenanceMode
            ? 'Server under maintenance. Please try again later.'
            : forced
            ? 'Please update app to continue'
            : 'App update available'
        }
        button1Text={
          maintenanceMode ? 'Refresh' : forced ? 'Update' : 'Not now'
        }
        button2Text={
          maintenanceMode ? undefined : forced ? undefined : 'Update'
        }
        onButton1Press={
          maintenanceMode
            ? fetchRemoteConfig
            : forced
            ? handleAppUpdate
            : () => setVisible(false)
        }
        onButton2Press={
          maintenanceMode ? undefined : forced ? undefined : handleAppUpdate
        }
      />
    </>
  );
};

function isHigher(v1, v2) {
  const _v1 = v1.split('.');
  const _v2 = v2.split('.');

  return (
    [0, 1, 2].filter((i) => {
      const num1 = parseInt(_v1[i], 10);
      const num2 = parseInt(_v2[i], 10);
      return num1 > num2;
    }).length !== 0
  );
}

export default RootSwitchNavigator;

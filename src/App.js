/**
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

import RootSwitchNavigator from './routes/RootSwitchNavigator';
import { AuthContextProvider } from './context/AuthContext';
import { AppContext, AppContextProvider } from './context/AppContext';
import Linking from './utils/Linking';
import SnackBar from './components/SnackBar';
import { registerBroadcastReceiver, createProfiles } from './utils/Scanner';

const App = () => {
  const [showSnack, setShowSnack] = useState(false);

  const {
    locale: { locale },
  } = useContext(AppContext);

  useEffect(() => {
    createProfiles();
    registerBroadcastReceiver();
    const unsubscribe = NetInfo.addEventListener((state) => {
      setShowSnack(!state?.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AppContextProvider>
      <AuthContextProvider>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <NavigationContainer linking={Linking}>
          <RootSwitchNavigator />
        </NavigationContainer>
        <SnackBar
          style={styles.bottom70}
          title={locale?.networkError}
          showSnack={showSnack}
        />
      </AuthContextProvider>
    </AppContextProvider>
  );
};

const styles = StyleSheet.create({ bottom70: { bottom: 70 } });

export default App;

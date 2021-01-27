/**
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootSwitchNavigator from './routes/RootSwitchNavigator';
import { AuthContextProvider } from './context/AuthContext';
import { AppContextProvider } from './context/AppContext';
import Linking from './utils/Linking';

const App = () => {
  return (
    <AppContextProvider>
      <AuthContextProvider>
        <NavigationContainer linking={Linking}>
          <RootSwitchNavigator />
        </NavigationContainer>
      </AuthContextProvider>
    </AppContextProvider>
  );
};

export default App;

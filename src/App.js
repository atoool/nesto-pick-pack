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

const App = () => {
  return (
    <AppContextProvider>
      <AuthContextProvider>
        <NavigationContainer>
          <RootSwitchNavigator />
        </NavigationContainer>
      </AuthContextProvider>
    </AppContextProvider>
  );
};

export default App;

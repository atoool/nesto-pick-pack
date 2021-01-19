/**
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootSwitchNavigator from './routes/RootSwitchNavigator';
import { AuthContextProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <RootSwitchNavigator />
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default App;

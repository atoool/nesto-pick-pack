/**
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import RootSwitchNavigator from "./routes/RootSwitchNavigator";
import SplashScreen from './screens/common/SplashScreen'

const App = () => {
  return (
    <NavigationContainer>
      <RootSwitchNavigator />
      {/* <SplashScreen /> */}
    </NavigationContainer>
  );
};



export default App;

/**
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootSwitchNavigator from './routes/RootSwitchNavigator';
import NetInfo from '@react-native-community/netinfo';
import { AuthContextProvider } from './context/AuthContext';
import { AppContextProvider } from './context/AppContext';
import Linking from './utils/Linking';
import SnackBar from './components/SnackBar';
import { AppContext } from './context/AppContext';
import InAppMessage from './components/InAppMessage';
import ModalComponent from './components/ModalComponent';

const App = () => {
  const [showSnack, setShowSnack] = useState(false);

  const {
    locale: { locale },
  } = useContext(AppContext);

  useEffect(() => {
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
        <SnackBar title={locale?.networkError} showSnack={showSnack} />
        <InAppMessage
          title={locale?.headings.notifications}
          text={locale?.networkError}
          showSnack={false}
        />
      </AuthContextProvider>
    </AppContextProvider>
  );
};

export default App;

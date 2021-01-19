import React, { useContext, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const SplashScreen = () => {
  const { checkAuthState } = useContext(AuthContext);
  useEffect(() => {
    checkAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView>
      <Text>Nesto: SplashScreen</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

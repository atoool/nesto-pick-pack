import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import Button from '../../components/Button';

const LoginScreen = () => {
  return (
    <SafeAreaView>
      <Text>Nesto: LoginScreen</Text>
      <Button text="Sign in" />
    </SafeAreaView>
  );
};

export default LoginScreen;

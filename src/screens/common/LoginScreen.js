import React, { useState, useContext } from 'react';
import { SafeAreaView, Text } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { AuthContext } from '../../context/AuthContext';
import { Typography } from '../../styles';

const LoginScreen = () => {
  const { emailLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInHandler = async () => {
    try {
      await emailLogin(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <Text style={Typography.h4}>Nesto: LoginScreen</Text>
      <Text style={Typography.h6}>Login to Access your profile</Text>
      <Input
        placeholder="Email Address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button text="Sign in" onPress={signInHandler} />
    </SafeAreaView>
  );
};

export default LoginScreen;

import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { AuthContext } from '../../context/AuthContext';
import { Typography } from '../../styles';
import Images from '../../assets/images';
const screenWidth = Math.round(Dimensions.get('window').width);

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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Image style={styles.logoImage} source={Images.logo} />
        <Text style={Typography.bold30}>Login</Text>
        <Text style={Typography.normal21}>Login to Access your profile</Text>
        <Input
          placeholder="Email Address"
          value={email}
          style={{ width: screenWidth - 32 }}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          style={{ width: screenWidth - 32 }}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          title="Sign in"
          onPress={signInHandler}
          loading={false}
          style={{ width: screenWidth - 32 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  logoImage: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 250,
    height: 250,
  },
});

export default LoginScreen;

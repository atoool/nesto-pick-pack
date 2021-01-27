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
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image style={styles.logoImage} source={Images.logo} />
        <Text style={Typography.bold30}>Login</Text>
        <Text style={Typography.normal21}>Login to Access your profile</Text>
        <Input
          iconName="user"
          placeholder="Email Address"
          value={email}
          style={styles.screenMargin}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          iconName="lock"
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          style={styles.screenMargin}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          title="Sign in"
          onPress={signInHandler}
          loading={false}
          style={styles.screenMargin}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  logoImage: {
    width: 250,
    height: 250,
  },
  screenMargin: {
    width: screenWidth - 64,
  },
  scrollView: { alignItems: 'center' },
});

export default LoginScreen;

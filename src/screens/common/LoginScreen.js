import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { AuthContext } from '../../context/AuthContext';
import { Typography } from '../../styles';
import Images from '../../assets/images';
import { AppContext } from '../../context/AppContext';
import TestTouchable from '../../components/TestTouchable';
import ShowVersion from '../../components/ShowVersion';

const screenWidth = Math.round(Dimensions.get('window').width);

function validateEmail(emailField, password) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (
    reg.test(emailField) === false ||
    emailField === '' ||
    password.length < 5
  ) {
    return false;
  }

  return true;
}

const LoginScreen = () => {
  const { emailLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const signInHandler = async () => {
    if (validateEmail(email, password)) {
      try {
        setLoading(true);
        await emailLogin(email, password, locale);
      } catch (e) {
        console.log(e);
      }
    } else {
      ToastAndroid.show(locale?.validEmail, ToastAndroid.SHORT);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TestTouchable>
          <Image style={styles.logoImage} source={Images.logo} />
        </TestTouchable>
        <Text style={Typography.bold30}>{locale?.Login}</Text>
        <Text style={styles.loginText}>{locale?.LoginText}</Text>
        <Input
          iconName="UserSVG"
          placeholder={locale?.placeholder.email}
          value={email}
          keyboardType={'email-address'}
          style={styles.screenMargin}
          onChangeText={(text) => setEmail(text)}
          textContentType="emailAddress"
        />
        <Input
          iconName="LockSVG"
          placeholder={locale?.placeholder.password}
          secureTextEntry={true}
          value={password}
          style={styles.screenMargin}
          onChangeText={(text) => setPassword(text)}
          textContentType="password"
        />
        <Button
          title={locale?.signin}
          onPress={signInHandler}
          loading={loading}
          style={styles.screenMargin}
        />
        <ShowVersion />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#ffffff', flex: 1 },
  logoImage: { width: 250, height: 250 },
  screenMargin: { width: screenWidth - 64 },
  scrollView: { alignItems: 'center' },
  loginText: { ...Typography.normal21, marginBottom: 20 },
});

export default LoginScreen;

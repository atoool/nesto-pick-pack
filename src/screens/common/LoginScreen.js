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
import { AppContext } from '../../context/AppContext';

const screenWidth = Math.round(Dimensions.get('window').width);

const LoginScreen = () => {
  const { emailLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const signInHandler = async () => {
    try {
      setLoading(true);
      await emailLogin(email, password);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image style={styles.logoImage} source={Images.logo} />
        <Text style={Typography.bold30}>{locale?.Login}</Text>
        <Text style={styles.loginText}>{locale?.LoginText}</Text>
        <Input
          iconName="UserSVG"
          placeholder={locale?.placeholder.email}
          value={email}
          keyboardType={'email-address'}
          style={styles.screenMargin}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          iconName="LockSVG"
          placeholder={locale?.placeholder.password}
          secureTextEntry={true}
          value={password}
          style={styles.screenMargin}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          title={locale?.signin}
          onPress={signInHandler}
          loading={loading}
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
  loginText: { ...Typography.normal21, marginBottom: 20 },
});

export default LoginScreen;

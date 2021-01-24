import React, { useContext, useEffect } from 'react';
import { SafeAreaView, Text, Image, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import Images from '../../assets/images';

const SplashScreen = () => {
  const { checkAuthState } = useContext(AuthContext);
  useEffect(() => {
    checkAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Nesto: SplashScreen</Text> */}
      <Image style={styles.logoImage} source={Images.logo} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  logoImage: {
    width: 250,
    height: 250,
  },
});

export default SplashScreen;

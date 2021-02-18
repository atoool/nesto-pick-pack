import React, { useContext, useEffect } from 'react';
import { BackHandler } from 'react-native';
import Success from '../../components/Success';
import { AppContext } from '../../context/AppContext';
import { Colors } from '../../styles';

const ItemSuccessScreen = ({ navigation }) => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  useEffect(() => {
    const disableBack = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => {
      disableBack.remove();
    };
  }, []);
  return (
    <Success
      title={locale?.success}
      color={Colors.primaryGreen}
      statusTitle={locale?.ISS_statusTitle}
      statusText={locale?.ISS_statusText}
      infoTitle={locale?.ISS_infoTitle}
      infoText={locale?.ISS_infoText}
      buttonText={locale?.ISS_button}
      onPress={() => {
        navigation.popToTop();
      }}
    />
  );
};

export default ItemSuccessScreen;

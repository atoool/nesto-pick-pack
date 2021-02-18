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
      statusTitle={locale?.ISS_statusTitlePick}
      statusText={locale?.ISS_statusTextPick}
      infoTitle={locale?.ISS_infoTitlePick}
      infoText={locale?.ISS_infoTextPick}
      buttonText={locale?.ISS_buttonPick}
      onPress={() => {
        navigation.popToTop();
      }}
    />
  );
};

export default ItemSuccessScreen;

import React, { useContext } from 'react';
import Success from '../../components/Success';
import { AppContext } from '../../context/AppContext';
import { Colors } from '../../styles';

const ItemSuccessScreen = ({ navigation }) => {

    const {locale:{locale}}=useContext(AppContext)

    return (
        <Success
            title={locale?.success}
            color={Colors.primaryGreen}
            statusTitle={locale?.ISS_statusTitle}
            statusText={locale?.ISS_statusText}
            infoTitle={locale?.ISS_infoTitle}
            infoText={locale?.ISS_infoText}
            buttonText={locale?.ISS_button}
            onPress={() => { navigation.pop(3); }}
        />
    );
};

export default ItemSuccessScreen;
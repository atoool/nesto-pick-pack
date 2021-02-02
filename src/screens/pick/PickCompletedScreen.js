import React, { useContext } from 'react';
import Success from '../../components/Success';
import { AppContext } from '../../context/AppContext';
import { Colors } from '../../styles';

const PackCompletedScreen = ({ navigation }) => {

    const {locale:{locale}}=useContext(AppContext)
    return (
        <Success
        title={locale?.Completed}
        color={Colors.lightViolet}
        statusTitle={locale?.PCS_statusTitlePick}
        statusText={locale?.PCS_statusTextPick}
        infoTitle={locale?.PCS_infoTitlePick}
        infoText={locale?.PCS_infoTextPick}
        buttonText={locale?.PCS_button}
            onPress={() => { navigation.popToTop(); }} />
    );
};

export default PackCompletedScreen;
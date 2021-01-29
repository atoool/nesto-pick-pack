import React from 'react';
import Success from '../../components/Success';
import { Colors } from '../../styles';

const PackCompletedScreen = ({ navigation }) => {
    return (
        <Success
            title="Completed"
            color={Colors.lightViolet}
            statusTitle="All items packed"
            statusText="You have completed packing this order!"
            infoTitle="What next?"
            infoText="Take a rest. Wait till you receive a new packing order"
            buttonText="Check notification"
            onPress={() => { navigation.popToTop(); }} />
    );
};

export default PackCompletedScreen;
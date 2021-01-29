import React from 'react';
import Success from '../../components/Success';
import { Colors } from '../../styles';

const ItemSuccessScreen = ({ navigation }) => {
    return (
        <Success
            title="Success"
            color={Colors.primaryGreen}
            statusTitle="Item Packed"
            statusText="This item has been marked as packed"
            infoTitle="What next?"
            infoText="There are oter items in this order to be packed"
            buttonText="Pack another item"
            onPress={() => { navigation.pop(3); }}
        />
    );
};

export default ItemSuccessScreen;
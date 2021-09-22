import React from 'react';
//OrderDetailsStack screens imports
import OrderDetails from '../screens/common/OrderDetails';
import OrderDetailsResult from '../screens/common/OrderDetailsResult';

export const OrderDetailsStack = (Stack) => {
  return (
    <>
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          headerShown: true,
          title: 'Find order details',
        }}
      />
      <Stack.Screen
        name="OrderDetailsResult"
        component={OrderDetailsResult}
        options={{
          headerShown: true,
          title: 'Order details',
        }}
      />
    </>
  );
};

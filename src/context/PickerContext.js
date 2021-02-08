import React, { createContext, useState, useEffect } from 'react';
import { getOrdersListPick, getOrdersDropList } from '../api';
// import { Storage } from '../utils';

export const PickerContext = createContext({
  orders: [],
  dropList: [],
  getOrdersList: () => {},
  getDropList: () => {},
});

export const PickerContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [dropList, setDropList] = useState([]);
  useEffect(() => {
    // getOrdersList();
  }, []);

  const getOrdersList = async () => {
    try {
      const res = await getOrdersListPick();
      setOrders([res.data]);
    } catch (e) {
      console.log(e);
    }
  };

  const getDropList = async () => {
    try {
      const res = await getOrdersDropList();
      setDropList(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const value = {
    orders,
    dropList,
    getOrdersList,
    getDropList,
  };
  return (
    <PickerContext.Provider value={value}>{children}</PickerContext.Provider>
  );
};

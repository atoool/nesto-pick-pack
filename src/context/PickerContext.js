import React, { createContext, useState, useEffect } from 'react';
import {
  getOrdersListPick,
  getOrdersDropList,
  setItemPicked,
  getSimilarItems,
} from '../api';
// import { Storage } from '../utils';

export const PickerContext = createContext({
  orders: [],
  dropList: [],
  similarItems: [],
  getOrdersList: () => {},
  getDropList: () => {},
  setItemPicked: () => {},
  getSimilarItemList: () => {},
});

export const PickerContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [dropList, setDropList] = useState([]);
  const [similarItems, setSimilarItems] = useState([]);
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
  const getSimilarItemList = async (id) => {
    try {
      const list = await getSimilarItems(id);
      setSimilarItems(list.data);
    } catch (e) {
      console.log(e);
    }
  };
  const value = {
    orders,
    dropList,
    similarItems,
    getOrdersList,
    getDropList,
    setItemPicked,
    getSimilarItemList,
  };
  return (
    <PickerContext.Provider value={value}>{children}</PickerContext.Provider>
  );
};

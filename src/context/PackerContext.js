import React, { createContext, useEffect, useState } from 'react';
import {
  getAssignBinListPack,
  getOrdersListPack,
  setOrderReady,
  setPackedItemAsMarked,
  postRePick,
  postAssignBin,
} from '../api';
// import { Storage } from '../utils';

export const PackerContext = createContext({
  orderList: [],
  assignBinList: [],
  getPackerOrderList: async () => {},
  getAssignBinList: async () => {},
  setOrderReady: async () => {},
  setPackedItemAsMarked: async () => {},
  postAssignBin: async () => {},
  postRePick: async () => {},
});

export const PackerContextProvider = ({ children }) => {
  const [orderList, setOrderList] = useState([]);
  const [assignBinList, setAssignBinList] = useState([]);
  useEffect(() => {}, []);

  const getPackerOrderList = async () => {
    const list = await getOrdersListPack();
    setOrderList(list);
  };

  const getAssignBinList = async () => {
    const list = await getAssignBinListPack();
    setAssignBinList(list);
  };

  const value = {
    orderList,
    assignBinList,
    getPackerOrderList,
    getAssignBinList,
    setOrderReady,
    setPackedItemAsMarked,
    postRePick,
    postAssignBin,
  };
  return (
    <PackerContext.Provider value={value}>{children}</PackerContext.Provider>
  );
};

import React, { createContext, useEffect, useState } from 'react';
import {
  getAssignBinListPack,
  getOrdersListPack,
  setOrderReady,
  setPackedItemAsMarked,
  postRePick,
  postAssignBin,
  getNotifications,
} from '../api';
import packerOrders from '../mock/packerOrders.json';
import packerBinAssign from '../mock/packerBinAssign.json';

export const PackerContext = createContext({
  orderList: [],
  assignBinList: [],
  notifications: [],
  getPackerOrderList: async () => {},
  getAssignBinList: async () => {},
  setOrderReady: async () => {},
  setPackedItemAsMarked: async () => {},
  postAssignBin: async () => {},
  postRePick: async () => {},
  getAllNotifications: async () => {},
});

export const PackerContextProvider = ({ children }) => {
  const [orderList, setOrderList] = useState([]);
  const [assignBinList, setAssignBinList] = useState([]);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {}, []);

  const getPackerOrderList = async () => {
    try {
      const list = packerOrders.data; //mock
      // const list = await getOrdersListPack();
      setOrderList(list);
    } catch (e) {}
  };

  const getAssignBinList = async () => {
    try {
      const list = packerBinAssign.data; //mock
      // const list = await getAssignBinListPack();
      setAssignBinList(list);
    } catch (e) {}
  };

  const getAllNotifications = async () => {
    try {
      const list = await getNotifications();
      const temp = list.filter((item) => item.role === 'packer');
      setNotifications(temp);
    } catch (e) {}
  };

  const value = {
    orderList,
    assignBinList,
    notifications,
    getPackerOrderList,
    getAssignBinList,
    setOrderReady,
    setPackedItemAsMarked,
    postRePick,
    postAssignBin,
    getAllNotifications,
  };
  return (
    <PackerContext.Provider value={value}>{children}</PackerContext.Provider>
  );
};

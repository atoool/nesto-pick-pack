import React, { createContext, useContext, useState } from 'react';
import {
  getAssignBinListPack,
  getOrdersListPack,
  setOrderReady,
  setPackedItemAsMarked,
  postRePick,
  postAssignBin,
  getNotifications,
} from '../api';
import { AppContext } from './AppContext';

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

/**
 * Packer App Context Wrapper holds the shared state for packer role
 */
export const PackerContextProvider = ({ children }) => {
  const [orderList, setOrderList] = useState([]);
  const [assignBinList, setAssignBinList] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const getPackerOrderList = async () => {
    try {
      const list = await getOrdersListPack(locale);
      setOrderList(list);
    } catch (e) {}
  };

  const getAssignBinList = async () => {
    try {
      const list = await getAssignBinListPack(locale);
      setAssignBinList(list);
    } catch (e) {}
  };

  const getAllNotifications = async () => {
    try {
      const list = await getNotifications(locale);
      const temp = list.filter((item) => item.role === 'packer');
      setNotifications(temp?.reverse());
    } catch (e) {}
  };

  const value = {
    orderList,
    assignBinList,
    notifications,
    getPackerOrderList,
    getAssignBinList,
    setOrderReady: async (id) => await setOrderReady(id, locale),
    setPackedItemAsMarked: async (id, item_type, manualCount, barcodeCount) =>
      await setPackedItemAsMarked(
        id,
        item_type,
        manualCount,
        barcodeCount,
        locale,
      ),
    postRePick: async (PAYLOAD, id) => await postRePick(PAYLOAD, id, locale),
    postAssignBin: async (PAYLOAD, id) =>
      await postAssignBin(PAYLOAD, id, locale),
    getAllNotifications,
  };
  return (
    <PackerContext.Provider value={value}>{children}</PackerContext.Provider>
  );
};

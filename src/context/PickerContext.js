import React, { createContext, useState, useContext } from 'react';
import {
  getOrdersListPick,
  getOrdersDropList,
  setItemPicked,
  setItemDrop,
  getSimilarItems,
  getPickerSuggestions,
  getSubstitutedList,
  postSubstitutes,
  postSuggestedSubstitutes,
  getNotifications,
  getAllItems,
} from '../api';
import { AppContext } from './AppContext';

export const PickerContext = createContext({
  orders: [],
  dropList: [],
  similarItems: [],
  substitutedList: [],
  pickerSuggestions: [],
  notifications: [],
  getOrdersList: async () => {},
  getDropList: async () => {},
  setItemPicked: async () => {},
  getSimilarItemList: async () => {},
  setItemDrop: async () => {},
  getPickerSuggestedItems: async () => {},
  getSubstitutedItems: async () => {},
  postSubstitutes: async () => {},
  postSuggestedSubstitutes: async () => {},
  getAllNotifications: async () => {},
  getAllItemList: async () => {},
  AddToSimilarList: () => {},
  setSimilarItems: () => {},
});

/**
 * Picker App Context Wrapper holds the shared state for picker role
 */
export const PickerContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [dropList, setDropList] = useState([]);
  const [similarItems, setSimilarItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [pickerSuggestions, setPickerSuggestions] = useState([]);
  const [substitutedList, setSubstitutedList] = useState({});
  const [notifications, setNotifications] = useState([]);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const getOrdersList = async () => {
    try {
      const res = await getOrdersListPick(locale);
      setOrders(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getDropList = async () => {
    try {
      const res = await getOrdersDropList(locale);
      setDropList(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getSimilarItemList = async (id, item_type) => {
    try {
      const list = await getSimilarItems(id, item_type, locale);
      setSimilarItems(list);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllItemList = async (id) => {
    try {
      const list = await getAllItems(id, locale);
      setAllItems(list);
    } catch (e) {
      console.log(e);
    }
  };

  const AddToSimilarList = (list) => {
    Array.isArray(similarItems)
      ? setSimilarItems([...list, ...similarItems])
      : setSimilarItems(list);
  };

  const getSubstitutedItems = async (id) => {
    try {
      const list = await getSubstitutedList(id, locale);
      setSubstitutedList(list);
    } catch (e) {
      console.log(e);
    }
  };

  const getPickerSuggestedItems = async (id) => {
    try {
      const list = await getPickerSuggestions(id, locale);
      setPickerSuggestions(list);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllNotifications = async () => {
    try {
      const list = await getNotifications(locale);
      const temp = list.filter((item) => item.role === 'picker');
      setNotifications(temp?.reverse());
    } catch (e) {}
  };

  const value = {
    orders,
    dropList,
    similarItems,
    substitutedList,
    pickerSuggestions,
    notifications,
    allItems,
    getOrdersList,
    getDropList,
    setItemPicked: async (
      id,
      item_type,
      critical_qty,
      manualCount,
      barcodeCount,
    ) =>
      await setItemPicked(
        id,
        item_type,
        critical_qty,
        manualCount,
        barcodeCount,
        locale,
      ),
    setItemDrop: async (id) => await setItemDrop(id, locale),
    getSimilarItemList,
    getAllItemList,
    getSubstitutedItems,
    getPickerSuggestedItems,
    postSubstitutes: async (PAYLOAD) => await postSubstitutes(PAYLOAD, locale),
    postSuggestedSubstitutes: async (PAYLOAD) =>
      await postSuggestedSubstitutes(PAYLOAD, locale),
    getAllNotifications,
    AddToSimilarList,
    setSimilarItems,
  };
  return (
    <PickerContext.Provider value={value}>{children}</PickerContext.Provider>
  );
};

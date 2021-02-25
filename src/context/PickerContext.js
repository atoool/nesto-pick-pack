import React, { createContext, useState, useEffect, useContext } from 'react';
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
} from '../api';
import pickerOrders from '../mock/pickerOrders.json';
import pickerDropList from '../mock/pickerDropList.json';
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
});

export const PickerContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [dropList, setDropList] = useState([]);
  const [similarItems, setSimilarItems] = useState([]);
  const [pickerSuggestions, setPickerSuggestions] = useState([]);
  const [substitutedList, setSubstitutedList] = useState({});
  const [notifications, setNotifications] = useState([]);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const getOrdersList = async () => {
    try {
      // const res = pickerOrders.data; //mock
      const res = await getOrdersListPick(locale);
      setOrders(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getDropList = async () => {
    try {
      // const res = pickerDropList.data; //mock
      const res = await getOrdersDropList(locale);
      setDropList(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getSimilarItemList = async (id) => {
    try {
      const list = await getSimilarItems(id, locale);
      setSimilarItems(list);
    } catch (e) {
      console.log(e);
    }
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
      setNotifications(temp);
    } catch (e) {}
  };

  const value = {
    orders,
    dropList,
    similarItems,
    substitutedList,
    pickerSuggestions,
    notifications,
    getOrdersList, //
    getDropList, //
    setItemPicked: async (id, item_type, critical_qty) =>
      await setItemPicked(id, item_type, critical_qty, locale),
    setItemDrop: async (id) => await setItemDrop(id, locale),
    getSimilarItemList, //
    getSubstitutedItems, //
    getPickerSuggestedItems, //
    postSubstitutes: async (PAYLOAD) => await postSubstitutes(PAYLOAD, locale),
    postSuggestedSubstitutes: async (PAYLOAD) =>
      await postSuggestedSubstitutes(PAYLOAD, locale),
    getAllNotifications, //
  };
  return (
    <PickerContext.Provider value={value}>{children}</PickerContext.Provider>
  );
};

import React, { createContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    // getOrdersList();
  }, []);

  const getOrdersList = async () => {
    try {
      // const res = pickerOrders.data; //mock
      const res = await getOrdersListPick();
      setOrders(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getDropList = async () => {
    try {
      // const res = pickerDropList.data; //mock
      const res = await getOrdersDropList();
      setDropList(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getSimilarItemList = async (id) => {
    try {
      const list = await getSimilarItems(id);
      setSimilarItems(list);
    } catch (e) {
      console.log(e);
    }
  };

  const getSubstitutedItems = async (id) => {
    try {
      const list = await getSubstitutedList(id);
      setSubstitutedList(list);
    } catch (e) {
      console.log(e);
    }
  };

  const getPickerSuggestedItems = async (id) => {
    try {
      const list = await getPickerSuggestions(id);
      setPickerSuggestions(list);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllNotifications = async () => {
    try {
      const list = await getNotifications();
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
    getOrdersList,
    getDropList,
    setItemPicked,
    setItemDrop,
    getSimilarItemList,
    getSubstitutedItems,
    getPickerSuggestedItems,
    postSubstitutes,
    postSuggestedSubstitutes,
    getAllNotifications,
  };
  return (
    <PickerContext.Provider value={value}>{children}</PickerContext.Provider>
  );
};

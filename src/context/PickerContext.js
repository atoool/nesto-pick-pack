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
} from '../api';
// import { Storage } from '../utils';

export const PickerContext = createContext({
  orders: [],
  dropList: [],
  similarItems: [],
  getOrdersList: async () => {},
  getDropList: async () => {},
  setItemPicked: async () => {},
  getSimilarItemList: async () => {},
  setItemDrop: async () => {},
  getPickerSuggestions: async () => {},
  getSubstitutedList: async () => {},
  postSubstitutes: async () => {},
  postSuggestedSubstitutes: async () => {},
});

export const PickerContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [dropList, setDropList] = useState([]);
  const [similarItems, setSimilarItems] = useState([]);
  const [pickerSuggestions, setPickerSuggestions] = useState([]);
  const [substitutedList, setSubstitutedList] = useState([]);

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

  const value = {
    orders,
    dropList,
    similarItems,
    substitutedList,
    pickerSuggestions,
    getOrdersList,
    getDropList,
    setItemPicked,
    setItemDrop,
    getSimilarItemList,
    getSubstitutedItems,
    getPickerSuggestedItems,
    postSubstitutes,
    postSuggestedSubstitutes,
  };
  return (
    <PickerContext.Provider value={value}>{children}</PickerContext.Provider>
  );
};

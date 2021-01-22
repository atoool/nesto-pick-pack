import React, { createContext, useState } from 'react';
import en from '../locale/en.json';

const LOCALES = [{ language: 'English', $: en, isRTL: false }];
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const value = {
    locale: LOCALES[0],
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

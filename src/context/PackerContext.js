import React, { createContext, useEffect } from 'react';
import { Storage } from '../utils';

export const PackerContext = createContext({});

export const PackerContextProvider = ({ children }) => {
  useEffect(() => {}, []);

  const changeLocale = async (lan, prevLan) => {};

  const value = {
    changeLocale,
  };
  return (
    <PackerContext.Provider value={value}>{children}</PackerContext.Provider>
  );
};

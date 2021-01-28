import React, { createContext, useState } from 'react';
import en from '../locale/en.json';

const LOCALES = [{ language: 'English', $: en, isRTL: false }];
export const AppContext = createContext({
  locale: LOCALES[0],
  bins: '1',
  binPos: [],
  onChangeBins: () => { },
  onBinAssign: () => { }
});

export const AppContextProvider = ({ children }) => {
  const [bins, setBins] = useState('1')
  const [binPos, setBinPos] = useState([]);

  const onChangeBins = (num) => {
    setBins(num)
  }
  const onBinAssign = (txt, indx) => {
    binPos[indx] = txt
    setBinPos([...binPos])
  }

  const value = {
    locale: LOCALES[0],
    bins,
    binPos,
    onChangeBins,
    onBinAssign
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

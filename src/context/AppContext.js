import React, { createContext, useState,useEffect } from 'react';
import {I18nManager} from 'react-native'
import RNRestart from 'react-native-restart';
import { useSubscribeTopic, useUnSubscribeTopic } from '../hooks/useFirebase';
import en from '../locale/en.json';
import {Storage} from '../utils';

const LOCALES = [{ lan: 'English', locale: en, isRTL: false }];

export const AppContext = createContext({
  locale: LOCALES[0],
  bins: '1',
  binPos: [],
  onChangeBins: () => { },
  onBinAssign: () => { }
});

export const AppContextProvider = ({ children }) => {
  //locale
  const [languages, setLanguages] = useState();
  const [locale, setLocale] = useState(LOCALES[0]);
//bin assign
  const [bins, setBins] = useState('1')
  const [binPos, setBinPos] = useState([]);

  const loadLocale = async () => {
    try {
      let localeFromStorage = await Storage.getLocale();
      let _locale = LOCALES.find(
        (item) => item?.lan === localeFromStorage?.lan,
      );
      useSubscribeTopic(_locale.lan)
      setLocale(_locale ?? _locale);
    } catch (e) {
      setLocale(LOCALES[0]);
    }
  };

  const languageRestart = async (rtl) => {
    if (rtl) {
      if (!I18nManager.isRTL) {
        I18nManager.forceRTL(true);
      }
    } else {
      if (I18nManager.isRTL) {
        I18nManager.forceRTL(false);
      }
    }
    RNRestart.Restart();
  };

  const onChangeBins = (num) => {
    setBins(num)
  }
  const onBinAssign = (txt, indx) => {
    binPos[indx] = txt
    setBinPos([...binPos])
  }

  useEffect(() => {
    let _languages = LOCALES.map((item) => {
      let { lan, rtl } = item;
      return { lan, rtl };
    });
    setLanguages(_languages);
    loadLocale();
  }, []);

  const changeLocale = async (lan,prevLan) => {
    let _locale = LOCALES.find((item) => item?.lan === lan);
    await Storage.setLocale({ lan: _locale?.lan, rtl: _locale?.rtl });
    useUnSubscribeTopic(prevLan)
    useSubscribeTopic(lan)
    setLocale(_locale);
    languageRestart(_locale?.rtl ?? LOCALES[0].rtl);
  };

  const value = {
    locale,
    languages,
    changeLocale,
    bins,
    binPos,
    onChangeBins,
    onBinAssign
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

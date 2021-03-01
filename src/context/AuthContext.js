import React, { createContext, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
//TODO: API
import Storage from '../utils/Storage';
import { login, updateFCMToken } from '../api';

const initialAuthState = {
  authStateLoading: true,
  access_token: '',
  userType: '',
  access_token_timestamp: '',
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [val, setVal] = useState(initialAuthState);
  const emailLogin = async (email, password, locale) => {
    try {
      console.log('email login');
      const {
        accessToken,
        // access_token_timestamp,
        userRole,
      } = await login({ email, password }, locale).then(async () => {
        const fcm_token = await Storage.getItem('fcm_token');
        updateFCMToken({ fcm_token }, locale);
        console.warn(fcm_token);
      });

      logInUser(accessToken, '', userRole, email);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  const logInUser = (access_token, access_token_timestamp, userType, email) => {
    console.log(
      'Login with: ' + access_token,
      // access_token_timestamp,
      userType,
    );
    Storage.setUserAccessToken(access_token);
    // Storage.setUserAccessTokenTimeStamp(access_token_timestamp);
    Storage.setUserType(userType);
    Storage.setEmail(email);
    console.log('Login state');
    setVal({
      ...initialAuthState,
      access_token,
      // access_token_timestamp,
      userType,
      authStateLoading: false,
      email,
    });
  };

  const logOutUser = async () => {
    await Storage.logOutUser();
    setVal({ ...initialAuthState, authStateLoading: false });
    await messaging().deleteToken();
  };

  const updateAuthStateContext = async (
    access_token,
    // access_token_timestamp,
    userType,
    email,
  ) => {
    console.log('update: AuthStateContext');
    console.log(access_token, userType, email);
    setVal({
      ...initialAuthState,
      access_token,
      // access_token_timestamp,
      userType,
      authStateLoading: false,
      email,
    });
  };
  const checkAuthState = async () => {
    try {
      const access_token = await Storage.getUserAccessToken();
      // const access_token_timestamp = await Storage.getUserAccessTokenTimeStamp();
      const userType = await Storage.getUserType();
      const email = await Storage.getEmail();
      updateAuthStateContext(access_token, userType, email);
    } catch (e) {
      console.log(e);
      console.log('USER NOT AUTHORIZED');
      logOutUser();
    }
  };
  const value = {
    ...val,
    emailLogin,
    checkAuthState,
    logOutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

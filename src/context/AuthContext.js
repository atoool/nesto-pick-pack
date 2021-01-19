import React, { createContext, useState } from 'react';
//TODO: API
import Storage from '../utils/Storage';
import { mockEmailLogin } from '../utils/mockLogin';

const initialAuthState = {
  authStateLoading: true,
  access_token: '',
  userType: '',
  access_token_timestamp: '',
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [val, setVal] = useState(initialAuthState);
  const emailLogin = async (email, password) => {
    try {
      console.log('email login');
      const {
        access_token,
        access_token_timestamp,
        userType,
      } = await mockEmailLogin(email, password);

      logInUser(access_token, access_token_timestamp, userType);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  const logInUser = (access_token, access_token_timestamp, userType) => {
    console.log(
      'Login with: ' + access_token,
      access_token_timestamp,
      userType,
    );
    Storage.setUserAccessToken(access_token);
    Storage.setUserAccessTokenTimeStamp(access_token_timestamp);
    Storage.setUserType(userType);
    console.log('Login state');
    setVal({
      ...initialAuthState,
      access_token,
      access_token_timestamp,
      userType,
      authStateLoading: false,
    });
  };

  const logOutUser = async () => {
    await Storage.logOutUser();
    setVal({ ...initialAuthState, authStateLoading: false });
  };

  const updateAuthStateContext = async (
    access_token,
    access_token_timestamp,
    userType,
  ) => {
    console.log('update: AuthStateContext');
    console.log(access_token, access_token_timestamp, userType);
    setVal({
      ...initialAuthState,
      access_token,
      access_token_timestamp,
      userType,
      authStateLoading: false,
    });
  };
  const checkAuthState = async () => {
    try {
      const access_token = await Storage.getUserAccessToken();
      const access_token_timestamp = await Storage.getUserAccessTokenTimeStamp();
      const userType = await Storage.getUserType();
      updateAuthStateContext(access_token, access_token_timestamp, userType);
    } catch (e) {
      console.log(e);
      console.log('USER NOT AUTHORISED');
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

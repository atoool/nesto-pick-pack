import React, { createContext, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import Storage from '../utils/Storage';
import { login } from '../api';

const initialAuthState = {
  authStateLoading: true,
  access_token: '',
  userType: '',
  access_token_timestamp: '',
};

export const AuthContext = createContext();

/**
 * Authentication Context Wrapper
 */
export const AuthContextProvider = ({ children }) => {
  const [val, setVal] = useState(initialAuthState);
  const emailLogin = async (email, password, locale) => {
    try {
      console.log('email login');
      const {
        accessToken,

        userRole,
      } = await login({ email, password }, locale);

      logInUser(accessToken, userRole, email);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const logInUser = (access_token, userType, email) => {
    console.log('Login with: ' + access_token, userType);
    Storage.setUserAccessToken(access_token);

    Storage.setUserType(userType);
    Storage.setEmail(email);
    console.log('Login state');
    setVal({
      ...initialAuthState,
      access_token,
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

  const updateAuthStateContext = async (access_token, userType, email) => {
    console.log('update: AuthStateContext');
    console.log(access_token, userType, email);
    setVal({
      ...initialAuthState,
      access_token,
      userType,
      authStateLoading: false,
      email,
    });
  };
  const checkAuthState = async () => {
    try {
      const access_token = await Storage.getUserAccessToken();
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

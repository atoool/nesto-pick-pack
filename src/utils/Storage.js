import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      throw `No Value for "${key}" in Storage 💾`;
    }
    return value;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

//Core Functions
const getUserAccessToken = async () => getItem('access_token');
const setUserAccessToken = async (access_token) =>
  setItem('access_token', access_token);
const getUserAccessTokenTimeStamp = async () =>
  getItem('access_token_timestamp');
const setUserAccessTokenTimeStamp = async (access_token_timestamp) =>
  setItem('access_token_timestamp', access_token_timestamp);

const getUserType = async () => getItem('userType');
const setUserType = async (userType) => setItem('userType', userType);

const getEmail = async () => getItem('email');
const setEmail = async (userType) => setItem('email', userType);

const logOutUser = async () => {
  await removeItem('access_token');
  await removeItem('access_token_timestamp');
  await removeItem('userType');
  await removeItem('email');
};

const getLocale = async () => {
  let jsonValue = await getItem('locale');
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};
const setLocale = async (locale) => {
  const jsonValue = JSON.stringify(locale);
  await setItem('locale', jsonValue);
};

export default {
  setItem,
  getItem,
  getEmail,
  setEmail,
  removeItem,
  getUserAccessToken,
  setUserAccessToken,
  getUserAccessTokenTimeStamp,
  setUserAccessTokenTimeStamp,
  getUserType,
  setUserType,
  logOutUser,
  getLocale,
  setLocale,
};

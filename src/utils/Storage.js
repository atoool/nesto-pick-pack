import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Adds Items to application's local storage
 * @param {string} key Key to access the value to be stored in application's local storage
 * @param {string} value Value to be stored in application's local storage
 */
const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

/**
 * Gets Items stored in application's local storage
 * @param {string} key Key to value stored in application's local storage
 */
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

/**
 * Removes Items stored in application's local storage
 * @param {string} key Key to value stored in application's local storage
 */
const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

/**
 * Gets current user's access token stored in application's local storage
 */
const getUserAccessToken = async () => getItem('access_token');

/**
 * Stores the current user's access token to application's local storage
 * @param {string} access_token current user's access token
 */
const setUserAccessToken = async (access_token) =>
  setItem('access_token', access_token);

/**
 * Gets current user's access token timestamp stored in application's local storage
 */
const getUserAccessTokenTimeStamp = async () =>
  getItem('access_token_timestamp');

/**
 * Stores the current user's access token timestamp to application's local storage
 * @param {string} access_token_timestamp current user's access token timestamp
 */
const setUserAccessTokenTimeStamp = async (access_token_timestamp) =>
  setItem('access_token_timestamp', access_token_timestamp);

/**
 * Gets current user's Type stored in application's local storage
 */
const getUserType = async () => getItem('userType');

/**
 * Stores the current user's type to application's local storage
 * @param {string} userType current user's type
 */
const setUserType = async (userType) => setItem('userType', userType);

/**
 * Gets current user's email stored in application's local storage
 */
const getEmail = async () => getItem('email');

/**
 * Stores the current user's type to application's local storage
 * @param {string} userType current user's type
 */
const setEmail = async (userType) => setItem('email', userType);

/**
 * Logs out the current user
 */
const logOutUser = async () => {
  await removeItem('access_token');
  await removeItem('access_token_timestamp');
  await removeItem('userType');
  await removeItem('email');
};

/**
 * Gets the current language from application's local storage
 */
const getLocale = async () => {
  let jsonValue = await getItem('locale');
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

/**
 * Sets the current language from application's local storage
 * @param {string} locale language
 */
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

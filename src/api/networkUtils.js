import axios from 'axios';
import ExtraPayload from '../utils/ExtraPayload';
import Storage from '../utils/Storage';
import { env } from '../config/env';
const API_URL = env.apiUrl;

const DEFAULT_CONFIG = {
  headers: {
    'content-type': 'application/json',
  },
};

const axiosInstance = axios.create({
  baseURL: API_URL,
});

/**
 * Function for handling network errors
 * @param {object} e error
 * @param {string} URL URL
 * @param {object} PAYLOAD PAYLOAD
 */
const networkErrorLogger = (e, URL, PAYLOAD) => {
  console.error(
    `\nREQUEST TO URL: \n${API_URL}${URL} \nwith PAYLOAD: \n${JSON.stringify(
      PAYLOAD,
    )} \nfailed!\n`,
  );
  console.error(JSON.stringify(e));
  if (e.message === 'Network Error') {
    console.log('Network Error');
    throw 'Network Error. Ensure you are connected to internet.';
  } else {
    let { error_code, message } = e.response.data;

    if (error_code === 400) {
      throw message;
    } else {
      console.log('Server Error');
    }
    if (typeof error_code === 'string') {
      console.error(error_code);
      throw error_code;
    } else {
      throw 'Fatal Error. Contact Admin.';
    }
  }
};

/**
 * Function for adding request headers
 * @param {boolean} isAuthenticated Is request authenticated
 * @returns Request headers
 */
const setUpConfig = async (isAuthenticated) => {
  if (isAuthenticated) {
    try {
      const access_token = await Storage.getUserAccessToken();
      const CONFIG = {
        headers: {
          'content-type': 'application/json',
          'access-token': access_token,
        },
      };
      return CONFIG;
    } catch (e) {
      console.log('Error Setting Config');
    }
  } else {
    return DEFAULT_CONFIG;
  }
};

/**
 * Function for sending GET requests
 * @param {string} URL
 * @param {boolean}} isAuthenticated
 * @param {boolean} getFullResult
 * @param {object} extraParams
 * @returns Result
 */
const get = async (
  URL,
  isAuthenticated = true,
  getFullResult = false,
  extraParams = '',
) => {
  try {
    let {
      appname,
      version,
      buildNumber,
      country,
      lang = 'en',
      network,
      loadcount,
      devtype,
      os,
      osVersion,
    } = await ExtraPayload();
    let PARAMS = `?appname=${appname}&version=${version}&buildNumber=${buildNumber}&country=${country}&lang=${lang}&network=${network}&loadcount=${loadcount}&devtype=${devtype}&os=${os}&osVersion=${osVersion}${extraParams}`;
    const CONFIG = await setUpConfig(isAuthenticated);
    console.log(CONFIG);
    const result = await axiosInstance.get(URL + PARAMS, CONFIG);
    if (getFullResult) {
      return result.data;
    } else {
      return result.data.data;
    }
  } catch (e) {
    networkErrorLogger(e, URL, 'nil');
  }
};

/**
 * Function for sending post requests
 * @param {string} URL
 * @param {object} PAYLOAD
 * @param {boolean} isAuthenticated
 * @returns Result
 */
const post = async (URL, PAYLOAD = {}, isAuthenticated = true) => {
  try {
    let {
      appname,
      version,
      buildNumber,
      country,
      lang = 'en',
      network,
      loadcount,
      devtype,
      os,
      osVersion,
    } = await ExtraPayload();
    let PARAMS = `?appname=${appname}&version=${version}&buildNumber=${buildNumber}&country=${country}&lang=${lang}&network=${network}&loadcount=${loadcount}&devtype=${devtype}&os=${os}&osVersion=${osVersion}`;

    const CONFIG = await setUpConfig(isAuthenticated);
    const result = await axiosInstance.post(URL + PARAMS, PAYLOAD, CONFIG);
    return result.data.data;
  } catch (e) {
    networkErrorLogger(e, URL, PAYLOAD);
  }
};

/**
 * Function for sending put requests
 * @param {string} URL
 * @param {object} PAYLOAD
 * @param {boolean} isAuthenticated
 * @returns Result
 */
const put = async (URL, PAYLOAD = {}, isAuthenticated = true) => {
  try {
    const CONFIG = await setUpConfig(isAuthenticated);
    const result = await axiosInstance.put(URL, PAYLOAD, CONFIG);
    return result.data.data;
  } catch (e) {
    networkErrorLogger(e, URL, PAYLOAD);
  }
};

export { put, post, get };

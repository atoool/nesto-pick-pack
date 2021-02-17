import axios from 'axios';
import ExtraPayload from '../utils/ExtraPayload';
import Storage from '../utils/Storage';
import { API_URL } from './config';

const reqInterceptor = (x) => {
  const headers = {
    ...x.headers.common,
    ...x.headers[x.method],
    ...x.headers,
  };

  ['common', 'get', 'post', 'head', 'put', 'patch', 'delete'].forEach(
    (header) => {
      delete headers[header];
    },
  );

  const printable = `${new Date()} | Request: ${x.method.toUpperCase()} | ${
    x.url
  } | ${JSON.stringify(x.data)} | ${JSON.stringify(headers)}`;
  console.log('============================');
  console.log(printable);
  console.log('============================');

  return x;
};
const resInterceptor = (x) => {
  const printable = `${new Date()} | Response: ${x.status} | ${JSON.stringify(
    x.data,
  )}`;
  console.log('============================');
  console.log(printable);
  console.log('============================');

  return x;
};

// axios.interceptors.request.use(reqInterceptor);
// axios.interceptors.response.use(resInterceptor);
const axiosInstance = axios.create({
  baseURL: API_URL,
});
const networkErrorLogger = (e, URL, PAYLOAD, CONFIG) => {
  console.info(
    `REQUEST TO: ${URL} with PAYLOAD: ${JSON.stringify(
      PAYLOAD,
    )} and CONFIG: ${JSON.stringify(CONFIG)} failed!`,
  );
  console.info(JSON.stringify(e));
  if (e.message === 'Network Error') {
    console.log('Network Error');
    // Flash.showError('Network Error');
    throw 'Network Error. Ensure you are connected to internet.';
  } else {
    let { error, status } = e.response.data;
    if (status === 401) {
      //TODO: Logout
    } else {
      console.log('Server Error');
      // Flash.showError('Server Error! Please Try again after sometime.');
    }
    if (typeof error === 'string') {
      console.info(error);
      throw error;
    } else {
      throw 'Fatal Error. Contact Admin.';
    }
  }
};
const setUpConfig = async () => {
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
};

const get = async (URL, isAuthenticated = true, getFullResult = false) => {
  let CONFIG = 'nil';
  try {
    let {
      appname,
      version,
      buildNumber,
      country,
      lang,
      network,
      loadcount,
      devtype,
      os,
      osVersion,
    } = await ExtraPayload();
    let PARAMS = `?appname=${appname}&version=${version}&buildNumber=${buildNumber}&country=${country}&lang=${lang}&network=${network}&loadcount=${loadcount}&devtype=${devtype}&os=${os}&osVersion=${osVersion}`;

    let result;
    if (isAuthenticated) {
      CONFIG = await setUpConfig();
      console.log(CONFIG);
      result = await axiosInstance.get(URL + PARAMS, CONFIG);
    } else {
      result = await axiosInstance.get(URL + PARAMS);
    }
    // console.info(`GET TO: ${URL} and CONFIG: ${JSON.stringify(CONFIG)}`);
    // console.log(`Returned: ${JSON.stringify(result.data.data)}`);
    if (getFullResult) {
      return result.data;
    } else {
      return result.data.data;
    }
  } catch (e) {
    // console.warn(e);
    networkErrorLogger(e, URL, 'nil', CONFIG);
  }
};

const post = async (URL, PAYLOAD = {}, isAuthenticated = true) => {
  let CONFIG = 'nil';
  try {
    let result;
    let {
      appname,
      version,
      buildNumber,
      country,
      lang,
      network,
      loadcount,
      devtype,
      os,
      osVersion,
    } = await ExtraPayload();
    let PARAMS = `?appname=${appname}&version=${version}&buildNumber=${buildNumber}&country=${country}&lang=${lang}&network=${network}&loadcount=${loadcount}&devtype=${devtype}&os=${os}&osVersion=${osVersion}`;

    if (isAuthenticated) {
      CONFIG = await setUpConfig();
      result = await axiosInstance.post(URL + PARAMS, PAYLOAD, CONFIG);
    } else {
      result = await axiosInstance.post(URL, PARAMS);
    }
    // console.info(
    //   `POST TO: ${URL} with PAYLOAD: ${JSON.stringify(
    //     PAYLOAD,
    //   )} and CONFIG: ${JSON.stringify(CONFIG)}`,
    // );
    // console.log(`Returned: ${JSON.stringify(result.data.data)}`);
    return result.data.data;
  } catch (e) {
    networkErrorLogger(e, URL, PAYLOAD, CONFIG);
  }
};

const put = async (URL, PAYLOAD = {}, isAuthenticated = true) => {
  let CONFIG = 'nil';
  try {
    let result;
    if (isAuthenticated) {
      CONFIG = await setUpConfig();
      result = await axiosInstance.put(URL, PAYLOAD, CONFIG);
    } else {
      result = await axiosInstance.put(URL, PAYLOAD);
    }
    // console.info(
    //   `PUT TO: ${URL} with PAYLOAD: ${JSON.stringify(
    //     PAYLOAD,
    //   )} and CONFIG: ${JSON.stringify(CONFIG)}`,
    // );
    // console.log(`Returned: ${JSON.stringify(result.data.data)}`);
    return result.data.data;
  } catch (e) {
    networkErrorLogger(e, URL, PAYLOAD, CONFIG);
  }
};

const _del = async (URL, PAYLOAD = {}, isAuthenticated = true) => {
  let CONFIG = 'nil';
  try {
    let result;
    if (isAuthenticated) {
      CONFIG = await setUpConfig();
      const delConfig = { data: PAYLOAD, headers: CONFIG.headers };
      result = await axiosInstance.delete(URL, delConfig);
    } else {
      const delConfig = { data: PAYLOAD };
      result = await axiosInstance.delete(URL, delConfig);
    }
    return result.data.data;
  } catch (e) {
    networkErrorLogger(e, URL, PAYLOAD, CONFIG);
  }
};

export { put, post, get, _del };

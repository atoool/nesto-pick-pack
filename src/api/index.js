import { ToastAndroid } from 'react-native';
import { post, get } from './networkUtils';

// Endpoints that Doesn't Require Authentication

/**
 * Login API
 * @param {object} PAYLOAD
 * @returns {object} authentication tokens
 */
export const login = async (PAYLOAD) => {
  const URL = '/basic/login';
  return post(URL, PAYLOAD, false).catch((e) => {
    console.log(e);
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};

/**
 * Notification API
 * @param {*} locale
 * @returns {object} notifications
 */
export const getNotifications = async (locale) => {
  const URL = '/picker-packer/notifications';
  return get(URL).catch((e) => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};

/**
 * Order details API
 * @param {*} locale
 * @param {string} id order id
 */
export const getOrderDetails = async (locale, id) => {
  const URL = `/picker-packer/order-details/${id}`;
  return get(URL).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
    throw e;
  });
};

/**
 * API for getting order list for packer
 * @param {*} locale
 */
export const getOrdersListPack = async (locale) => {
  const URL = '/packer/order-list-packitem';
  return get(URL, true, false).catch((e) => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};

/**
 * API for getting order list of orders with bins assigned
 * @param {*} locale
 */
export const getAssignBinListPack = async (locale) => {
  const URL = '/packer/order-list-binassign';
  return get(URL, true, false).catch((e) => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};

/**
 * API for marking an item as packing verified
 * @param {string} id order id
 * @param {string} item_type
 * @param {number} manualCount Count of quantities of an item that are manually verified
 * @param {number} barcodeCount Count of quantities of an item that are barcode scanned
 * @param {*} locale
 */
export const setPackedItemAsMarked = async (
  id,
  item_type,
  manualCount,
  barcodeCount,
  locale,
) => {
  const URL = `/packer/item/pack/${id}`;
  const extraParams = `&item_type=${item_type}&manual=${manualCount}&barcode=${barcodeCount}`;
  return get(URL, true, true, extraParams).catch((e) => {
    console.log(e);
    ToastAndroid.show(e, ToastAndroid.SHORT);
    throw e;
  });
};

/**
 * API for marking an order as packing completed
 * @param {string} id order id
 * @param {*} locale
 */
export const setOrderReady = async (id, locale) => {
  const URL = `/packer/order/ready/${id}`;
  return get(URL, true, true).catch((e) => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};

/**
 * API for assigning bins to an order
 * @param {object} PAYLOAD
 * @param {string} id order id
 * @param {*} locale
 */
export const postAssignBin = async (PAYLOAD, id, locale) => {
  const URL = `/packer/order/assign-bin/${id}`;
  return post(URL, PAYLOAD, true).catch((e) => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};

/**
 * API for initiating repick
 * @param {object} PAYLOAD
 * @param {string} id order id
 * @param {*} locale
 */
export const postRePick = async (PAYLOAD, id, locale) => {
  const URL = `/packer/perform/repick/${id}`;
  return post(URL, PAYLOAD, true).catch((e) => {
    console.log(e);
    throw e;
  });
};

//picker
/**
 * API for fetching order list of picker
 * @param {*} locale
 */
export const getOrdersListPick = async (locale) => {
  const URL = '/picker/order-list-pick';
  return get(URL, true, false).catch((e) => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};

/**
 * API for getting order list that are ready for dropping
 * @param {*} locale
 */
export const getOrdersDropList = async (locale) => {
  const URL = '/picker/order-list-drop';
  return get(URL, true, false).catch((e) => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};

/**
 * API for marking an item as picked
 * @param {string} id order id
 * @param {string} item_type
 * @param {number} critical_qty
 * @param {number} manualCount Count of quantities of an item that are manually verified
 * @param {number} barcodeCount Count of quantities of an item that are scanned and verified
 * @param {*} locale
 */
export const setItemPicked = async (
  id,
  item_type,
  critical_qty,
  manualCount,
  barcodeCount,
  locale,
) => {
  const URL = `/picker/item/pick/${id}`;
  const extraParams = `${
    critical_qty ? '&critical_qty=' + critical_qty : ''
  }&item_type=${item_type}&manual=${manualCount}&barcode=${barcodeCount}`;
  return get(URL, true, true, extraParams).catch((e) => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
    throw e;
  });
};

/**
 * API for marking an order as dropped
 * @param {string} id order id
 * @param {*} locale
 */
export const setItemDrop = async (id, locale) => {
  const URL = `/picker/order/drop/${id}`;
  return get(URL, true).catch((e) => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};

/**
 * API for getting similar items for a substituting item
 * @param {string} id item id of substituting item
 * @param {string} item_type
 * @param {*} locale
 */
export const getSimilarItems = async (id, item_type, locale) => {
  const URL = `/picker/item/similar-items/${id}`;
  const extraParams = `&item_type=${item_type}`;
  return get(URL, true, false, extraParams).catch((e) => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};

/**
 * API for searching items
 * @param {string} id search term
 * @param {*} locale
 */
export const getAllItems = async (id, locale) => {
  const URL = `/crm/search-product/${id}`;
  const extraParams = '&source=emp';
  return get(URL, true, false, extraParams).catch((e) => {
    console.log(e);
  });
};

/**
 * API for getting item suggestions
 * @param {string} id item id
 * @param {*} locale
 */
export const getPickerSuggestions = async (id, locale) => {
  const URL = `/picker/item/suggests/${id}`;
  return get(URL, true).catch((e) => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};

export const getSubstitutedList = async (id, locale) => {
  const URL = `/picker/item/substitute/${id}`;
  return get(URL, true).catch((e) => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};
export const postSubstitutes = async (PAYLOAD, locale) => {
  const URL = '/picker/item/perform-substitution';
  return post(URL, PAYLOAD, true).catch((e) => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};

/**
 * API for initiating substitution with suggestions
 * @param {object} PAYLOAD
 * @param {*} locale
 * @returns
 */
export const postSuggestedSubstitutes = async (PAYLOAD, locale) => {
  const URL = '/picker/item/substitutes';
  return post(URL, PAYLOAD, true).catch((e) => {
    console.log(e);
    throw e;
  });
};

export const getStatistics = async () => {
  const URL = '/statistics';
  return get(URL, true).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};

export const getRole = async (role) => {
  const URL = `/change-role/:${role}`;
  return get(URL, true).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};

export const getUserProfile = async () => {
  const URL = '/profile';
  return get(URL, true).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};

/**
 * Updates the Firebase Cloud Messaging Token to the backend
 */
export const updateFCMToken = async (PAYLOAD, locale) => {
  const URL = '/basic/add-fcm-token';
  return post(URL, PAYLOAD).catch((e) => {
    console.error('Error Updating FCM Token');
  });
};

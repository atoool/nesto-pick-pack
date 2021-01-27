import { put, post, get, _del } from './networkUtils';

// Endpoints that Doesn't Require Authentication
export const login = async (PAYLOAD) => {
  const URL = '/signin';
  return post(URL, PAYLOAD, false);
};

export const getOrdersList = async () => {
  const URL = '/orders';
  return get(URL, true);
};

export const getHistoryList = async () => {
  const URL = '/history';
  return get(URL, true);
};

export const getStatistics = async () => {
  const URL = '/notifications';
  return get(URL, true);
};

export const getNotifications = async () => {
  const URL = '/notifications';
  return get(URL, true);
};

export const getRole = async (role) => {
  const URL = `/change-role/:${role}`;
  return get(URL, true);
};

export const getUserProfile = async () => {
  const URL = '/profile';
  return get(URL, true);
};

export const updateProfile = async (PAYLOAD) => {
  const URL = '/profile';
  return put(URL, PAYLOAD, true);
};

//packer
export const itemRepick = async (id, PAYLOAD) => {
  const URL = `/packer/item/repick/:${id}`;
  return post(URL, PAYLOAD, true);
};

export const assignBin = async (id, PAYLOAD) => {
  const URL = `/packer/order/assign-bin/:${id}`;
  return post(URL, PAYLOAD, true);
};

export const getItemPacked = async (id) => {
  const URL = `/packer/item/pack/:${id}`;
  return get(URL, true);
};

export const getOrderReady = async (orderId) => {
  const URL = `/packer/order/ready/:${orderId}`;
  return get(URL, true);
};

//picker
export const pickerDropToBin = async (orderId) => {
  const URL = `/picker/order/drop/:${orderId}`;
  return get(URL, true);
};

export const getSimiliarItems = async (orderId) => {
  const URL = `/picker/item/similar-items/:${orderId}`;
  return get(URL, true);
};

export const getPickerSuggestedList = async (orderId) => {
  const URL = `/picker/item/suggests/:${orderId}`;
  return get(URL, true);
};

export const getItemAndSubstitute = async (orderId) => {
  const URL = `/picker/item/substitute/:${orderId}`;
  return get(URL, true);
};

export const getItemPicked = async (orderId) => {
  const URL = `/picker/item/pick/:${orderId}`;
  return get(URL, true);
};

export const performSubstitute = async (PAYLOAD) => {
  const URL = '/picker/item/substitutes';
  return put(URL, PAYLOAD, true);
};

export const pickerSuggestSubstitute = async (PAYLOAD) => {
  const URL = '/picker/item/substitutes';
  return put(URL, PAYLOAD, true);
};

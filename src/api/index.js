import { put, post, get, _del } from './networkUtils';

// Endpoints that Doesn't Require Authentication
export const login = async (PAYLOAD) => {
  const URL = '/signin';
  return post(URL, PAYLOAD, false);
};

//packer
export const getOrdersListPack = async () => {
  const URL = '/packer/order-list-pack';
  return get(URL, false, true);
};

//picker
export const getOrdersListPick = async () => {
  const URL = '/picker/order-list-pick';
  return get(URL, false, true);
};
export const getOrdersDropList = async () => {
  const URL = '/picker/order-list-drop';
  return get(URL, false, true);
};
export const setItemPicked = async (id) => {
  const URL = `/picker/item/pick/:${id}`;
  return get(URL, true);
};
export const getItemSubstitute = async (id) => {
  const URL = `picker/item/substitute/:${id}`;
  return get(URL, true);
};
export const setItemDrop = async (id) => {
  const URL = `/picker/order/drop/:${id}`;
  return get(URL, true);
};
export const getSimilarItems = async (id) => {
  const URL = `/picker/item/similar-items/:${id}`;
  return get(URL, true);
};
export const getPickerSuggestions = async (id) => {
  const URL = `/picker/item/suggests/:${id}`;
  return get(URL, true);
};
export const getSubstitutedList = async (id) => {
  const URL = `/picker/item/substitute/:${id}`;
  return get(URL, true);
};
export const postSubstitutes = async (PAYLOAD) => {
  const URL = '/picker/item/perform-substitution';
  return post(URL, PAYLOAD, true);
};
export const postSuggestedSubstitutes = async (PAYLOAD) => {
  const URL = '/picker/item/substitutes';
  return post(URL, PAYLOAD, true);
};

export const getStatistics = async () => {
  const URL = '/statistics';
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

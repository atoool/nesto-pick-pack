import { put, post, get, _del } from './networkUtils';

// Endpoints that Doesn't Require Authentication
export const login = async (PAYLOAD) => {
  const URL = '/basic/login';
  return post(URL, PAYLOAD, false);
};

export const getNotifications = async () => {
  const URL = '/picker-packer/notifications';
  return get(URL, false);
};

//packer
export const getOrdersListPack = async () => {
  const URL = '/packer/order-list-packitem';
  return get(URL, false, false);
};
export const getAssignBinListPack = async () => {
  const URL = '/packer/order-list-binassign';
  return get(URL, false, false);
};
export const setPackedItemAsMarked = async (id) => {
  const URL = `/packer/item/pack/${id}`;
  return get(URL, false, true);
};
export const setOrderReady = async (id) => {
  const URL = `/packer/order/ready/${id}`;
  return get(URL, false, true);
};
export const postAssignBin = async (PAYLOAD, id) => {
  const URL = `/packer/order/assign-bin/${id}`;
  return post(URL, PAYLOAD, true);
};
export const postRePick = async (PAYLOAD, id) => {
  const URL = `/packer/item/repick/${id}`;
  return post(URL, PAYLOAD, true);
};

//picker
export const getOrdersListPick = async () => {
  const URL = '/picker/order-list-pick';
  return get(URL, true, false);
};
export const getOrdersDropList = async () => {
  const URL = '/picker/order-list-drop';
  return get(URL, false, false);
};
export const setItemPicked = async (id) => {
  const URL = `/picker/item/pick/${id}`;
  return get(URL, true);
};
export const setItemDrop = async (id) => {
  const URL = `/picker/order/drop/${id}`;
  return get(URL, true);
};
export const getSimilarItems = async (id) => {
  const URL = `/picker/item/similar-items/${id}`;
  return get(URL, true);
};
export const getPickerSuggestions = async (id) => {
  const URL = `/picker/item/suggests/${id}`;
  return get(URL, true);
};
export const getSubstitutedList = async (id) => {
  const URL = `/picker/item/substitute/${id}`;
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

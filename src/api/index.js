import { ToastAndroid } from 'react-native';
import { put, post, get, _del } from './networkUtils';

// Endpoints that Doesn't Require Authentication
export const login = async (PAYLOAD) => {
  const URL = '/basic/login';
  return post(URL, PAYLOAD, false).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};

export const getNotifications = async () => {
  const URL = '/picker-packer/notifications';
  return get(URL, false).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};

//packer
export const getOrdersListPack = async () => {
  const URL = '/packer/order-list-packitem';
  return get(URL, true, false).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};
export const getAssignBinListPack = async () => {
  const URL = '/packer/order-list-binassign';
  return get(URL, true, false).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};
export const setPackedItemAsMarked = async (id) => {
  const URL = `/packer/item/pack/${id}`;
  return get(URL, false, true).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};
export const setOrderReady = async (id) => {
  const URL = `/packer/order/ready/${id}`;
  return get(URL, false, true).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};
export const postAssignBin = async (PAYLOAD, id) => {
  const URL = `/packer/order/assign-bin/${id}`;
  return post(URL, PAYLOAD, true).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};
export const postRePick = async (PAYLOAD, id) => {
  const URL = `/packer/item/repick/${id}`;
  return post(URL, PAYLOAD, true).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};

//picker
export const getOrdersListPick = async () => {
  const URL = '/picker/order-list-pick';
  return get(URL, true, false).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};
export const getOrdersDropList = async () => {
  const URL = '/picker/order-list-drop';
  return get(URL, true, false).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};
export const setItemPicked = async (id) => {
  const URL = `/picker/item/pick/${id}`;
  return get(URL, true).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};
export const setItemDrop = async (id) => {
  const URL = `/picker/order/drop/${id}`;
  return get(URL, true).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};
export const getSimilarItems = async (id) => {
  const URL = `/picker/item/similar-items/${id}`;
  return get(URL, true).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};
export const getPickerSuggestions = async (id) => {
  const URL = `/picker/item/suggests/${id}`;
  return get(URL, true).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};
export const getSubstitutedList = async (id) => {
  const URL = `/picker/item/substitute/${id}`;
  return get(URL, true).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};
export const postSubstitutes = async (PAYLOAD) => {
  const URL = '/picker/item/perform-substitution';
  return post(URL, PAYLOAD, true).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};
export const postSuggestedSubstitutes = async (PAYLOAD) => {
  const URL = '/picker/item/substitutes';
  return post(URL, PAYLOAD, true).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
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

export const updateProfile = async (PAYLOAD) => {
  const URL = '/profile';
  return put(URL, PAYLOAD, true).catch((e) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};

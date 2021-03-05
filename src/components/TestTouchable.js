import React, { useState, useEffect } from 'react';
import { ToastAndroid, TouchableOpacity } from 'react-native';
import { env } from '../config/env';
import ExtraPayload from '../utils/ExtraPayload';
const API_URL = env.apiUrl;

const TestTouchable = ({ children }) => {
  const [data, setData] = useState({ version: '', build: '', baseURL: '' });
  useEffect(() => {
    const onMount = async () => {
      const dt = await ExtraPayload();
      setData({
        version: dt.version,
        build: dt.buildNumber,
        baseURL: API_URL,
      });
    };
    onMount();
  }, []);
  const onLongPress = () => {
    ToastAndroid.show(
      `${data.baseURL}\nversion : ${data.version}\nbuild : ${data.build}`,
      ToastAndroid.SHORT,
    );
  };
  return (
    <TouchableOpacity activeOpacity={1} onLongPress={onLongPress}>
      {children}
    </TouchableOpacity>
  );
};

export default TestTouchable;

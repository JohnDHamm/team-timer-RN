import {AsyncStorage} from 'react-native';

const StoreUtils = {
  getStore: async (storeKey) => {
    try {
      return JSON.parse(await AsyncStorage.getItem(storeKey));
    } catch (error) {
      console.log("err with StoreUtils.getStore:", storeKey, error.message);
    }
  },
  setStore: async (storeKey, value) => {
    try {
      return await AsyncStorage.setItem(storeKey, JSON.stringify(value));
    } catch (error) {
      console.log("err with StoreUtils.setStore:", storeKey, error.message);
    }
  },
  mergeStore: async (storeKey, value) => {
    try {
      return await AsyncStorage.mergeItem(storeKey, JSON.stringify(value));
    } catch (error) {
      console.log("err with StoreUtils.mergeStore:", storeKey, error.message);
    }
  },
  removeStore: async (storeKey) => {
    try {
      return await AsyncStorage.removeItem(storeKey);
    } catch (error) {
      console.log("err with StoreUtils.removeStore:", storeKey, error.message);
    }
  }
};

export default StoreUtils;

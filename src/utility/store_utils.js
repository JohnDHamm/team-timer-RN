import {AsyncStorage} from 'react-native';

const StoreUtils = {
  getStore: async (storeKey) => {
    try {
      return JSON.parse(await AsyncStorage.getItem(storeKey));
    } catch (error) {
      console.log(error.message);
    }
  },


};

export default StoreUtils;
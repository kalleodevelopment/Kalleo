import { AsyncStorage } from 'react-native';
import to from 'await-to-js';

async function getAsyncStorageItem(key) {
  const [error, value] = await to(AsyncStorage.getItem(key));

  if (!error) {
    return value;
  }

  throw error;
}

async function setAsyncStorageItem(key, value) {
  const [error, item] = await to(AsyncStorage.setItem(key, value));

  if (!error) {
    return item;
  }

  throw error;
}

async function removeAsyncStorageItem(key) {
  const [error] = await to(AsyncStorage.removeItem(key));

  if (error) {
    throw error;
  }
}

export {
  getAsyncStorageItem,
  setAsyncStorageItem,
  removeAsyncStorageItem,
};

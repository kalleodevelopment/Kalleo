import Config from 'react-native-config';
import to from 'await-to-js';
import { getAsyncStorageItem } from './getSetAsyncStorage';

export default async () => {
  const { AUTH_ID_TOKEN } = Config;

  const [error, authToken] = await to(getAsyncStorageItem(AUTH_ID_TOKEN));

  if (!error) {
    return authToken;
  }

  throw error;
};

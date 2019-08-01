import { createNetworkInterface } from 'react-apollo';
import Config from 'react-native-config';
import { getAsyncStorageItem } from '../helpers/getSetAsyncStorage';

const { AUTH_ID_TOKEN, GRAPHQL_ENDPOINT } = Config;

const setHeadersMiddleware = {
  async applyMiddleware(req, next) {
    const token = await getAsyncStorageItem(AUTH_ID_TOKEN);

    if (!req.options.headers) {
      req.options.headers = {};
    }

    if (token) {
      req.options.headers.authorization = `JWT ${token}`;
    }

    next();
  },
};

const networkInterface = createNetworkInterface({ uri: GRAPHQL_ENDPOINT });

networkInterface.use([setHeadersMiddleware]);

export default networkInterface;

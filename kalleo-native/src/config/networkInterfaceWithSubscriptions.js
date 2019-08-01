import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import Config from 'react-native-config';
import networkInterface from './networkInterface';
import { getAsyncStorageItem } from '../helpers/getSetAsyncStorage';

const { AUTH_ID_TOKEN, SUBSCRIPTION_WEBSOCKET_URL } = Config;

const websocketClient = new SubscriptionClient(SUBSCRIPTION_WEBSOCKET_URL, {
  reconnect: true,
  lazy: true,
});


const setAuthTokenMiddleware = {
  async applyMiddleware(req, next) {
    req.authToken = await getAsyncStorageItem(AUTH_ID_TOKEN);

    next();
  },
};

websocketClient.use([setAuthTokenMiddleware]);

export default addGraphQLSubscriptions(networkInterface, websocketClient);


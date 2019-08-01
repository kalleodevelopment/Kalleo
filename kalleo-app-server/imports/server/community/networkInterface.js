import { createNetworkInterface } from 'apollo-client';
import { KALLEO_COMMUNITY_URI, KALLEO_MASTER_API_KEY } from '../config';

const networkInterface = createNetworkInterface({
  uri: KALLEO_COMMUNITY_URI,
});

networkInterface.use([{
  applyMiddleware(request, next) {
    request.options.headers = {
      ...request.options.headers,
      authorization: `Basic ${KALLEO_MASTER_API_KEY}`,
    };

    next();
  },
}]);

export default networkInterface;

import { createNetworkInterface } from 'react-apollo';
import { KALLEO_COMMUNITY_URI } from '../config';

const networkInterface = createNetworkInterface({
  uri: KALLEO_COMMUNITY_URI,
});

networkInterface.use([{
  applyMiddleware(request, next) {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      request.options.headers = {
        ...request.options.headers,
        authorization: `JWT ${authToken}`,
      };
    }

    next();
  },
}]);

export default networkInterface;

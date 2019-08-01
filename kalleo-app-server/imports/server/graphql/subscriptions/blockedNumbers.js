import createSubscription from '../helpers/createSubscription';
import filterSubscription from '../helpers/filterSubscription';
import getSubscriberIdFromPayload from '../helpers/getSubscriberIdFromPayload';
import subscriptionNames from '../constants/subscriptionNames';

export default createSubscription(
  subscriptionNames.BLOCKED_NUMBERS,
  ({ payload }, { authToken }) => {
    const subscriberId = getSubscriberIdFromPayload(payload);

    return filterSubscription(subscriberId, authToken);
  },
);

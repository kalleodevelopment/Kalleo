import createSubscription from '../helpers/createSubscription';
import filterSubscription from '../helpers/filterSubscription';
import subscriptionNames from '../constants/subscriptionNames';

export default createSubscription(
  subscriptionNames.SUBSCRIBER_UPDATED,
  ({ _id }, { authToken }) => (
    filterSubscription(_id.toString(), authToken)
  ),
);

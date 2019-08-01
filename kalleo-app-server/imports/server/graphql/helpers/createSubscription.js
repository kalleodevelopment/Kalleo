import { withFilter } from 'graphql-subscriptions';
import pubsub from '../publications/pubsub';

const createSubscription = (subscriptionName, filter) => ({
  subscribe: withFilter(
    () => pubsub.asyncIterator(subscriptionName),
    filter,
  ),
  resolve: payload => payload,
});

export default createSubscription;

import pubsub from './pubsub';
import subscriptionNames from '../constants/subscriptionNames';

export default (updatedSubscriber) => {
  pubsub.publish(subscriptionNames.SUBSCRIBER_UPDATED, updatedSubscriber);
};

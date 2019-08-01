import pubsub from './pubsub';
import mutationTypes from '../constants/mutationTypes';
import subscriptionNames from '../constants/subscriptionNames';

export default (removedBlockedNumber) => {
  pubsub.publish(subscriptionNames.BLOCKED_NUMBERS, {
    mutation: mutationTypes.REMOVED,
    payload: removedBlockedNumber,
  });
};

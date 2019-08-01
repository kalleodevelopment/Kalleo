import pubsub from './pubsub';
import mutationTypes from '../constants/mutationTypes';
import subscriptionNames from '../constants/subscriptionNames';

export default (insertedBlockedNumber) => {
  pubsub.publish(subscriptionNames.BLOCKED_NUMBERS, {
    mutation: mutationTypes.INSERTED,
    payload: insertedBlockedNumber,
  });
};

import pubsub from './pubsub';
import mutationTypes from '../constants/mutationTypes';
import subscriptionNames from '../constants/subscriptionNames';

export default (updatedCalls) => {
  pubsub.publish(subscriptionNames.CALLS, {
    mutation: mutationTypes.UPDATED,
    payload: updatedCalls,
  });
};

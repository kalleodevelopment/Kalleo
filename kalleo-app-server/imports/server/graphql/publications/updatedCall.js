import pubsub from './pubsub';
import mutationTypes from '../constants/mutationTypes';
import subscriptionNames from '../constants/subscriptionNames';

export default (updatedCall) => {
  pubsub.publish(subscriptionNames.CALLS, {
    mutation: mutationTypes.UPDATED,
    payload: [updatedCall],
  });
};

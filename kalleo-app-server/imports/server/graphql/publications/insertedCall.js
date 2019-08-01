import pubsub from './pubsub';
import mutationTypes from '../constants/mutationTypes';
import subscriptionNames from '../constants/subscriptionNames';

export default (insertedCall) => {
  pubsub.publish(subscriptionNames.CALLS, {
    mutation: mutationTypes.INSERTED,
    payload: [insertedCall],
  });
};

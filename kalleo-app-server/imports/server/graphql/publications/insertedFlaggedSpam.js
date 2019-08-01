import pubsub from './pubsub';
import mutationTypes from '../constants/mutationTypes';
import subscriptionNames from '../constants/subscriptionNames';

export default (insertedFlaggedSpam) => {
  pubsub.publish(subscriptionNames.FLAGGED_SPAM, {
    mutation: mutationTypes.INSERTED,
    payload: insertedFlaggedSpam,
  });
};

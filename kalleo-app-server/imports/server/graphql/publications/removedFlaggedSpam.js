import pubsub from './pubsub';
import mutationTypes from '../constants/mutationTypes';
import subscriptionNames from '../constants/subscriptionNames';

export default (removedFlaggedSpam) => {
  pubsub.publish(subscriptionNames.FLAGGED_SPAM, {
    mutation: mutationTypes.REMOVED,
    payload: removedFlaggedSpam,
  });
};

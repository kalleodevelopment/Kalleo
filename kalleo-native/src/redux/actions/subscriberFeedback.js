import actions from './types';

const resetSubscriberFeedback = () => ({
  type: actions.RESET_SUBSCRIBER_FEEDBACK,
});

const updateSubscriberFeedback = subscriberFeedback => ({
  subscriberFeedback,
  type: actions.UPDATE_SUBSCRIBER_FEEDBACK,
});

export {
  resetSubscriberFeedback,
  updateSubscriberFeedback,
};

import actions from '../actions/types';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_SUBSCRIBER_FEEDBACK:
      return action.subscriberFeedback;
    case actions.RESET_SUBSCRIBER_FEEDBACK:
      return initialState;
    default:
      return state;
  }
};

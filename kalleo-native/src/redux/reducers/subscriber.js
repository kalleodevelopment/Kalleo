import actions from '../actions/types';

const initialState = {};

const subscriber = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_SUBSCRIBER:
      return { ...state, ...action.subscriber };
    default:
      return state;
  }
};

export default subscriber;

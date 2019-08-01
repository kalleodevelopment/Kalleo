import actions from '../actions/types';

const initialState = {};

const activeRoute = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_ACTIVE_ROUTE:
      return action.activeRoute;
    default:
      return state;
  }
};

export default activeRoute;

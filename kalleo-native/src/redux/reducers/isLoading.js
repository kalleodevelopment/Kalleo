import actions from '../actions/types';

const initialState = false;

const isLoading = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_IS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
};

export default isLoading;

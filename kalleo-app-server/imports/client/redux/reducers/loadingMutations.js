import actionTypes from '../constants/actionTypes';

const loadingMutations = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.APOLLO_MUTATION_INIT:
      return {
        ...state,
        [action.operationName]: true,
      };
    case actionTypes.APOLLO_MUTATION_RESULT:
      return {
        ...state,
        [action.operationName]: false,
      };
    case actionTypes.APOLLO_MUTATION_ERROR:
      return {};
    default:
      return state;
  }
};

export default loadingMutations;

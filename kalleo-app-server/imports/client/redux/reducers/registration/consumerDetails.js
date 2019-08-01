import actionTypes from '../../constants/actionTypes';

const initialState = {
  firstName: '',
  lastName: '',
};

const consumerDetails = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_REGISTRATION_SESSION:
      return {
        ...state,
        ...action.listing.consumerDetails,
      };
    case actionTypes.SET_REGISTRATION_CONSUMER_FIRST_NAME:
      return {
        ...state,
        firstName: action.firstName,
      };
    case actionTypes.SET_REGISTRATION_CONSUMER_LAST_NAME:
      return {
        ...state,
        lastName: action.lastName,
      };
    default:
      return state;
  }
};

export default consumerDetails;

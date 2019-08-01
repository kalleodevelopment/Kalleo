import actionTypes from '../../constants/actionTypes';

const initialState = {
  name: '',
};

const businessDetails = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_REGISTRATION_SESSION:
      return {
        ...state,
        ...action.listing.businessDetails,
      };
    case actionTypes.SET_REGISTRATION_BUSINESS_NAME:
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
};

export default businessDetails;

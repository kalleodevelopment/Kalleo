import actionTypes from '../../constants/actionTypes';
import listingTypes from '../../constants/listingTypes';

const listingType = (state = listingTypes.CONSUMER, action) => {
  switch (action.type) {
    case actionTypes.SET_REGISTRATION_LISTING_TYPE:
      return action.listingType;
    default:
      return state;
  }
};

export default listingType;

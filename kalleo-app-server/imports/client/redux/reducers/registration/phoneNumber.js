import actionTypes from '../../constants/actionTypes';

const phoneNumber = (state = '', action) => {
  switch (action.type) {
    case actionTypes.SET_REGISTRATION_PHONE_NUMBER:
      return action.phoneNumber;
    default:
      return state;
  }
};

export default phoneNumber;

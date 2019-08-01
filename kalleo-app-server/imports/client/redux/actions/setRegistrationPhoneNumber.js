import actionTypes from '../constants/actionTypes';

export default phoneNumber => ({
  phoneNumber,
  type: actionTypes.SET_REGISTRATION_PHONE_NUMBER,
});

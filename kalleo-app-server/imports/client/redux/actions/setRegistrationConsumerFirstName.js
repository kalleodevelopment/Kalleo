import actionTypes from '../constants/actionTypes';

export default firstName => ({
  firstName,
  type: actionTypes.SET_REGISTRATION_CONSUMER_FIRST_NAME,
});

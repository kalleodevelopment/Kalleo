import actionTypes from '../constants/actionTypes';

export default ({ digit, index }) => ({
  digit,
  index,
  type: actionTypes.SET_AUTH_CODE_DIGIT,
});

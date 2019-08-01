import actionTypes from '../constants/actionTypes';
import { AUTH_CODE_LENGTH } from '../../config';

const initialState = [...Array(AUTH_CODE_LENGTH)].map(() => null);

const authCodeDigits = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH_CODE_DIGIT: {
      const nextAuthCodeDigits = state.slice();
      const digit = action.digit === '' ? null : action.digit;

      nextAuthCodeDigits.splice(action.index, 1, digit);

      return nextAuthCodeDigits;
    }
    default:
      return state;
  }
};

export default authCodeDigits;

import { times } from 'lodash';
import actions from '../actions/types';
import { getFormattedPhoneNumberAsYouType } from '../../helpers/phone-numbers';

const VERIFICATION_CODE_LENGTH = 4;
const initialVerificationCode = times(VERIFICATION_CODE_LENGTH, () => null);

const initialState = {
  isAuthenticated: false,
  phoneNumber: '',
  smsSent: false,
  verificationCode: initialVerificationCode,
  verifiedAuthentication: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_AUTH_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case actions.UPDATE_AUTH_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: getFormattedPhoneNumberAsYouType({
          phoneNumber: action.phoneNumber,
        }),
      };
    case actions.UPDATE_AUTH_SMS_SENT:
      return {
        ...state,
        smsSent: action.smsSent,
      };
    case actions.UPDATE_AUTH_VERIFICATION_CODE: {
      const verificationCode = state.verificationCode.slice();
      const { index } = action;

      const digit = action.digit === '' ? null : action.digit;

      verificationCode.splice(index, 1, digit);

      return {
        ...state,
        verificationCode,
      };
    }
    case actions.UPDATE_AUTH_VERIFIED_AUTHENTICATION:
      return {
        ...state,
        verifiedAuthentication: action.verifiedAuthentication,
      };
    case actions.UPDATE_AUTH_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    case actions.RESET_AUTH_VERIFICATION_CODE:
      return {
        ...state,
        verificationCode: initialVerificationCode,
      };
    case actions.RESET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: '',
      };
    case actions.RESET_AUTH:
      return {
        ...state,
        phoneNumber: initialState.phoneNumber,
        verificationCode: initialVerificationCode,
      };
    default:
      return state;
  }
};

export default users;

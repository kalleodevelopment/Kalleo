import actions from '../actions/types';
import { getFormattedPhoneNumberAsYouType } from '../../helpers/phone-numbers';

const initialState = {
  outgoingCallPhoneNumber: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_DIGIT_TO_OUTGOING_CALL_PHONE_NUMBER: {
      const outgoingCallPhoneNumber = getFormattedPhoneNumberAsYouType({
        phoneNumber: state.outgoingCallPhoneNumber,
        digitToAdd: action.digit,
      });

      return { ...state, outgoingCallPhoneNumber };
    }
    case actions.REMOVE_LAST_DIGIT_ON_ONGOING_CALL_PHONE_NUMBER: {
      const outgoingCallPhoneNumber = getFormattedPhoneNumberAsYouType({
        removeLastDigit: true,
        phoneNumber: state.outgoingCallPhoneNumber,
      });

      return { ...state, outgoingCallPhoneNumber };
    }
    case actions.RESET_OUTGOING_CALL_PHONE_NUMBER:
      return { ...state, outgoingCallPhoneNumber: initialState.outgoingCallPhoneNumber };
    default:
      return state;
  }
};

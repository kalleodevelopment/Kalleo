import actions from './types';

const addDigitToOutgoingCallPhoneNumber = digit => ({
  digit,
  type: actions.ADD_DIGIT_TO_OUTGOING_CALL_PHONE_NUMBER,
});

const removeLastDigitOnOutgoingCallPhoneNumber = () => ({
  type: actions.REMOVE_LAST_DIGIT_ON_ONGOING_CALL_PHONE_NUMBER,
});

const resetOutgoingCallPhoneNumber = () => ({
  type: actions.RESET_OUTGOING_CALL_PHONE_NUMBER,
});

export {
  addDigitToOutgoingCallPhoneNumber,
  removeLastDigitOnOutgoingCallPhoneNumber,
  resetOutgoingCallPhoneNumber,
};

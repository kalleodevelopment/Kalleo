import { addDigitToOutgoingCallPhoneNumber } from '../../../redux/actions/dialer';

export default dispatch => ({
  addDigitToOutgoingCallPhoneNumber: phoneNumber => (
    dispatch(addDigitToOutgoingCallPhoneNumber(phoneNumber))
  ),
});

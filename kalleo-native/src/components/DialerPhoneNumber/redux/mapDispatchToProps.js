import {
  removeLastDigitOnOutgoingCallPhoneNumber,
  resetOutgoingCallPhoneNumber,
  updateOutgoingCallPhoneNumber,
} from '../../../redux/actions/dialer';

export default dispatch => ({
  removeLastDigitOnOutgoingCallPhoneNumber: () => (
    dispatch(removeLastDigitOnOutgoingCallPhoneNumber())
  ),

  resetOutgoingCallPhoneNumber: () => dispatch(resetOutgoingCallPhoneNumber()),

  updateOutgoingCallPhoneNumber: phoneNumber => (
    dispatch(updateOutgoingCallPhoneNumber(phoneNumber))
  ),
});

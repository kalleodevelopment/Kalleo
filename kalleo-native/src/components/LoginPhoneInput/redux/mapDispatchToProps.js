import { updateAuthPhoneNumber } from '../../../redux/actions/auth';

export default dispatch => ({
  onPhoneNumberChange: phoneNumber => dispatch(updateAuthPhoneNumber(phoneNumber)),
});

import { updateVerificationCode } from '../../../redux/actions/auth';

export default dispatch => ({
  updateVerificationCode: (digit, index) => dispatch(updateVerificationCode(digit, index)),
});

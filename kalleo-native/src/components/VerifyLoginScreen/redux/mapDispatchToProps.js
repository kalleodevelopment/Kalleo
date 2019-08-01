import { resetAuth } from '../../../redux/actions/auth';
import { verifySMSCode } from '../../../redux/thunks/auth';

export default dispatch => ({
  resetAuth: () => dispatch(resetAuth()),
  verifySMSCode: props => dispatch(verifySMSCode(props)),
});

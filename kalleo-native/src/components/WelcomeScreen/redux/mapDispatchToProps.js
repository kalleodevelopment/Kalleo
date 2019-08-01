import { updateSMSSent } from '../../../redux/thunks/auth';
import updateIsLoading from '../../../redux/actions/isLoading';

export default dispatch => ({
  updateIsLoading: isLoading => dispatch(updateIsLoading(isLoading)),

  updateSMSSent: props => dispatch(updateSMSSent(props)),
});

import { updateAuthIsAuthenticated } from '../../../redux/actions/auth';
import updateActiveRoute from '../../../redux/actions/activeRoute';
import {
  checkActivationStatus,
  checkDeactivationStatus,
  updateSubscriber,
} from '../../../redux/thunks/subscriber';

export default dispatch => ({
  checkActivationStatus: updatedSubscriber => dispatch(checkActivationStatus(updatedSubscriber)),
  checkDeactivationStatus: updatedSubscriber => (
    dispatch(checkDeactivationStatus(updatedSubscriber))
  ),
  updateAuthIsAuthenticated: isAuthenticated => (
    dispatch(updateAuthIsAuthenticated(isAuthenticated))
  ),
  updateActiveRoute: activeRoute => dispatch(updateActiveRoute(activeRoute)),
  updateSubscriber: subscriber => dispatch(updateSubscriber(subscriber)),
});


import { deactivationStatuses } from '../../../constants/statuses';
import {
  updateDeactivationFailed,
  updateShowVerificationOverlay,
} from '../../actions/verification';

export default ({ deactivationStatus: updatedDeactivationStatus }) => (
  async (dispatch, getState) => {
    const { subscriber: { deactivationStatus } } = getState();

    if (deactivationStatus === deactivationStatuses.VERIFICATION_INITIATED) {
      switch (updatedDeactivationStatus) {
        case deactivationStatuses.VERIFIED:
          dispatch(updateShowVerificationOverlay(false));
          break;
        case deactivationStatuses.FAILED:
          dispatch(updateDeactivationFailed());
          break;
        default:
          break;
      }
    }
  }
);

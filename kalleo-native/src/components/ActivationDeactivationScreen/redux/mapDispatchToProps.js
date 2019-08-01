import { updateShowVerificationOverlay, updateVerificationFailed } from '../../../redux/actions/verification';

export default dispatch => ({
  updateShowVerificationOverlay: showVerificationOverlay => (
    dispatch(updateShowVerificationOverlay(showVerificationOverlay))
  ),
  updateVerificationFailed: verificationFailed => (
    dispatch(updateVerificationFailed(verificationFailed))
  ),
});

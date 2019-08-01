import actions from './types';

const updateShowVerificationOverlay = showVerificationOverlay => ({
  showVerificationOverlay,
  type: actions.UPDATE_SHOW_VERIFICATION_OVERLAY,
});

const updateDeactivationFailed = () => ({
  type: actions.UPDATE_DEACTIVATION_FAILED,
});

const updateVerificationFailed = verificationFailed => ({
  verificationFailed,
  type: actions.UPDATE_VERIFICATION_FAILED,
});

const updateVerificationResults = (verificationFailed, verificationSuccessful) => ({
  verificationFailed,
  verificationSuccessful,
  type: actions.UPDATE_VERIFICATION_RESULTS,
});

export {
  updateDeactivationFailed,
  updateShowVerificationOverlay,
  updateVerificationFailed,
  updateVerificationResults,
};

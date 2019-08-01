import actions from '../actions/types';

const initialState = {
  showVerificationOverlay: false,
  verificationFailed: false,
  verificationSuccessful: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_VERIFICATION_FAILED:
      return { ...state, verificationFailed: action.verificationFailed };
    case actions.UPDATE_SHOW_VERIFICATION_OVERLAY:
      return { ...state, showVerificationOverlay: action.showVerificationOverlay };
    case actions.UPDATE_DEACTIVATION_FAILED:
      return { ...state, showVerificationOverlay: false, verificationFailed: true };
    case actions.UPDATE_VERIFICATION_RESULTS:
      return {
        ...state,
        verificationFailed: action.verificationFailed,
        verificationSuccessful: action.verificationSuccessful,
      };
    default:
      return state;
  }
};

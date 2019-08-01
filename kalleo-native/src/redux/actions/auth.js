import actions from './types';

const updateAuthPhoneNumber = phoneNumber => ({
  phoneNumber,
  type: actions.UPDATE_AUTH_PHONE_NUMBER,
});

const updateAuthSMSSent = smsSent => ({
  smsSent,
  type: actions.UPDATE_AUTH_SMS_SENT,
});

const updateVerificationCode = (digit, index) => ({
  index,
  digit,
  type: actions.UPDATE_AUTH_VERIFICATION_CODE,
});

const updateAuthVerifiedAuthentication = verifiedAuthentication => ({
  verifiedAuthentication,
  type: actions.UPDATE_AUTH_VERIFIED_AUTHENTICATION,
});

const updateAuthIsAuthenticated = isAuthenticated => ({
  isAuthenticated,
  type: actions.UPDATE_AUTH_IS_AUTHENTICATED,
});

const resetAuthVerificationCode = () => ({
  type: actions.RESET_AUTH_VERIFICATION_CODE,
});

const resetPhoneNumber = () => ({
  type: actions.RESET_PHONE_NUMBER,
});

const resetAuth = () => ({
  type: actions.RESET_AUTH,
});

export {
  resetAuth,
  resetAuthVerificationCode,
  resetPhoneNumber,
  updateAuthIsAuthenticated,
  updateAuthPhoneNumber,
  updateAuthSMSSent,
  updateAuthVerifiedAuthentication,
  updateVerificationCode,
};

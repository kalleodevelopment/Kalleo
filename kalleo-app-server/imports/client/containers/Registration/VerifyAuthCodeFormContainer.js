import { connect } from 'react-redux';
import VerifyAuthCodeForm from '../../components/Registration/VerifyAuthCodeForm';
import { operationNames } from '../../apollo';
import { AUTH_CODE_LENGTH } from '../../config';
import {
  lineTypes,
  restartRegistration,
  startRegistrationSession,
} from '../../redux';

const mapStateToProps = ({ authCodeDigits, loadingMutations, registration }) => {
  const { lineType, phoneNumber } = registration;

  const instructions = lineType === lineTypes.MOBILE
    ? `Enter the ${AUTH_CODE_LENGTH}-digit verification code sent via SMS text`
    : `We are calling your line now with a ${AUTH_CODE_LENGTH}-digit verification code`;

  const isSendingAuthCode = loadingMutations[operationNames.sendAuthCode] || false;
  const isVerifyingAuthCode = loadingMutations[operationNames.verifyAuthCode] || false;
  const isMissingDigits = authCodeDigits.some(digit => !digit);

  return {
    authCodeDigits,
    instructions,
    isSendingAuthCode,
    isVerifyingAuthCode,
    lineType,
    phoneNumber,
    isSubmitDisabled: isVerifyingAuthCode || isMissingDigits,
  };
};

const mapDispatchToProps = dispatch => ({
  onClickBack: () => dispatch(restartRegistration()),

  onVerifyAuthCode: listing => dispatch(startRegistrationSession(listing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAuthCodeForm);

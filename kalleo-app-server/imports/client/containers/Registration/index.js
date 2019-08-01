import React from 'react';
import { connect } from 'react-redux';
import SendAuthCodeFormContainer from './SendAuthCodeFormContainer';
import VerifyAuthCodeFormContainer from './VerifyAuthCodeFormContainer';
import CallerIdFormContainer from './CallerIdFormContainer';
import CompletedMessage from '../../components/Registration/CompletedMessage';
import Registration from '../../components/Registration';
import { registrationSteps } from '../../redux';

const stepComponents = {
  [registrationSteps.SEND_AUTH_CODE]: SendAuthCodeFormContainer,
  [registrationSteps.VERIFY_AUTH_CODE]: VerifyAuthCodeFormContainer,
  [registrationSteps.UPDATE_CALLER_ID]: CallerIdFormContainer,
  [registrationSteps.COMPLETED]: CompletedMessage,
};

const mapStateToProps = ({ registration }) => {
  const Step = stepComponents[registration.step];

  return {
    children: Step ? <Step /> : null,
  };
};

export default connect(mapStateToProps)(Registration);

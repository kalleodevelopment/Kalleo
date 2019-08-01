import to from 'await-to-js';
import { bind } from 'decko';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import SendAuthCodeButton from './SendAuthCodeButton';
import AuthCodeInputContainer from '../../containers/Registration/AuthCodeInputContainer';
import { verifyAuthCode } from '../../apollo';
import { handleError } from '../../helpers';

@graphql(verifyAuthCode)
class VerifyAuthCodeForm extends Component {
  static propTypes = {
    authCodeDigits: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructions: PropTypes.string.isRequired,
    isSendingAuthCode: PropTypes.bool.isRequired,
    isVerifyingAuthCode: PropTypes.bool.isRequired,
    isSubmitDisabled: PropTypes.bool.isRequired,
    lineType: PropTypes.string.isRequired,
    onClickBack: PropTypes.func.isRequired,
    onVerifyAuthCode: PropTypes.func.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }

  @bind
  async verifyAuthCode(e) {
    e.preventDefault();

    const {
      authCodeDigits,
      mutate,
      onVerifyAuthCode,
      phoneNumber,
    } = this.props;

    const [error, result] = await to(mutate({
      variables: {
        authCode: authCodeDigits.join(''),
        phoneNumber,
      },
    }));

    if (error) {
      handleError(error);
    } else {
      const { authToken, listing } = result.data.verifyAuthCode;

      localStorage.setItem('authToken', authToken);

      onVerifyAuthCode(listing);
    }
  }

  render() {
    const {
      instructions,
      isSendingAuthCode,
      isVerifyingAuthCode,
      isSubmitDisabled,
      lineType,
      onClickBack,
      phoneNumber,
    } = this.props;

    return (
      <div className="common__vertical-center">
        <form
          className="registration__step-container verify-auth-code__container"
          onSubmit={this.verifyAuthCode}
        >
          <p className="verify-auth-code__instructions">
            {instructions}
          </p>
          <AuthCodeInputContainer />
          <div className="verify-auth-code__code-sent">
            Code sent to <span className="verify-auth-code__phone-number">{phoneNumber}</span>
          </div>
          <SendAuthCodeButton
            className="verify-auth-code__send-new-code-btn"
            disabled={isSendingAuthCode}
            lineType={lineType}
            phoneNumber={phoneNumber}
            text={isSendingAuthCode ? 'Sending new code...' : 'Send new code'}
          />
          <div className="verify-auth-code__wrong-number">
            <span>Wrong number? </span>
            <button
              className="verify-auth-code__go-back-btn"
              onClick={onClickBack}
              type="button"
            >
              Go back.
            </button>
          </div>
          <button
            className="common__action-btn"
            disabled={isSubmitDisabled}
            type="submit"
          >
            {isVerifyingAuthCode ? 'Please wait...' : 'Continue'}
          </button>
        </form>
      </div>
    );
  }
}

export default VerifyAuthCodeForm;

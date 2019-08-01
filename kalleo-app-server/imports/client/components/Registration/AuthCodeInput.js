import { bind } from 'decko';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class AuthCodeInput extends Component {
  static propTypes = {
    authCodeDigits: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChangeDigit: PropTypes.func.isRequired,
  }

  static getRefKey(index) {
    return `authCodeDigit${index}`;
  }

  @bind
  onChangeDigit(digit, index) {
    const { onChangeDigit } = this.props;

    onChangeDigit({ digit, index });

    const currentInput = this[AuthCodeInput.getRefKey(index)];
    const nextInput = this[AuthCodeInput.getRefKey(index + 1)];

    if (digit.length) {
      if (nextInput) {
        nextInput.focus();
      } else {
        currentInput.blur();
      }
    }
  }

  render() {
    const { authCodeDigits } = this.props;

    return (
      <div className="auth-code-input__container">
        {authCodeDigits.map((digit, index) => (
          <input
            className="common__text-field auth-code-input__digit"
            key={AuthCodeInput.getRefKey(index)}
            maxLength="1"
            onChange={e => this.onChangeDigit(e.target.value, index)}
            onFocus={e => e.target.select()}
            pattern="\d*"
            ref={(ref) => {
              this[AuthCodeInput.getRefKey(index)] = ref;
            }}
            type="text"
          />
        ))}
      </div>
    );
  }
}

export default AuthCodeInput;

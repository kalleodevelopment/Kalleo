import { bind } from 'decko';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { sendAuthCode } from '../../apollo';
import { handleError } from '../../helpers';

@graphql(sendAuthCode)
class SendAuthCodeButton extends Component {
  static propTypes = {
    lineType: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    disabled: false,
    onClick: () => {},
    type: 'button',
  }

  @bind
  async onClick() {
    const { lineType, mutate, onClick, phoneNumber } = this.props;

    try {
      if (!phoneNumber) {
        throw new Error('Please input your phone number');
      }

      await mutate({
        variables: {
          lineType,
          phoneNumber,
        },
      });

      onClick();
    } catch (error) {
      handleError(error);
    }
  }

  render() {
    const { className, disabled, text, type } = this.props;

    return (
      <button
        className={className}
        disabled={disabled}
        onClick={this.onClick}
        type={type}
      >
        {text}
      </button>
    );
  }
}

export default SendAuthCodeButton;

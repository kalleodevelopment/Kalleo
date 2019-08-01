import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import KalleoTextTouchable from '../KalleoTextTouchable';
import styles from './styles';
import { getFormattedPhoneNumber } from '../../helpers/phone-numbers';
import { handleError, to } from '../../helpers/handleError';
import { sendAuthCodeMutation } from '../../graphql/mutations';

@graphql(sendAuthCodeMutation)
class RequestNewSMSCode extends Component {
  static propTypes = {
    phoneNumber: PropTypes.string.isRequired,
    resetCode: PropTypes.func.isRequired,
    mutate: PropTypes.func.isRequired,
  }

  onRequestPress = async () => {
    const { mutate, phoneNumber, resetCode } = this.props;

    resetCode();

    const [error] = await to(mutate({
      variables: {
        phoneNumber: getFormattedPhoneNumber({ value: phoneNumber }),
      },
    }));

    if (error) {
      handleError(error);
    }
  }

  render = () => (
    <KalleoTextTouchable
      onPress={this.onRequestPress}
      containerStyles={styles.container}
      textStyles={styles.text}
      text="Send new code"
    />
  )
}

export default RequestNewSMSCode;

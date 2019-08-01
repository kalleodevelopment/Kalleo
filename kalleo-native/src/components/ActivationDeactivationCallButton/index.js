import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

import ActionButton from '../ActionButton';
import withNativePermission from '../withNativePermission';

import { requiredPermissions } from '../../constants/native-permissions';
import getStyles from './styles';

class ActivationDeactivationCallButton extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    permissionsGranted: PropTypes.bool.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    requestPermissions: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['ACTIVATION', 'DEACTIVATION']).isRequired,
  }


  onPress = () => {
    const { onPress } = this.props;

    onPress();
    this.dialPhoneCall();
  }

  getButtonTitle = () => {
    const { type } = this.props;

    return type === 'ACTIVATION' ? 'Activate' : 'Deactivate';
  }

  dialPhoneCall = () => {
    const { phoneNumber, permissionsGranted, requestPermissions } = this.props;

    if (!permissionsGranted) {
      requestPermissions();
    } else {
      const numberToCall = Platform.OS === 'ios'
        ? encodeURIComponent(phoneNumber)
        : phoneNumber;

      RNImmediatePhoneCall.immediatePhoneCall(numberToCall);
    }
  }

  render = () => {
    const styles = getStyles(this.props);

    return (
      <ActionButton
        buttonContainerStyles={styles.container}
        buttonTextStyles={styles.text}
        onPress={this.onPress}
        title={this.getButtonTitle()}
      />
    );
  }
}

export default withNativePermission(
  ActivationDeactivationCallButton,
  requiredPermissions.CALL_PHONE,
);

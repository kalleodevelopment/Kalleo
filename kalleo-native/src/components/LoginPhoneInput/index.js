import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import KalleoTextInput from '../KalleoTextInput';
import { mapStateToProps, mapDispatchToProps } from './redux';
import styles from './styles';

@connect(mapStateToProps, mapDispatchToProps)
class LoginPhoneInput extends Component {
  static propTypes = {
    onPhoneNumberChange: PropTypes.func.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }

  render = () => {
    const { phoneNumber, onPhoneNumberChange } = this.props;

    return (
      <View style={styles.container}>
        <KalleoTextInput
          keyboardType="phone-pad"
          maxLength={14}
          onChangeText={onPhoneNumberChange}
          placeholder="Phone Number"
          styles={styles.input}
          value={phoneNumber}
        />
      </View>
    );
  }
}

export default LoginPhoneInput;

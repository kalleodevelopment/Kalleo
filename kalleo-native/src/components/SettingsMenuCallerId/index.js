import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import KalleoText from '../KalleoText';
import { getFormattedPhoneNumber } from '../../helpers/phone-numbers';
import phoneNumberFormats from '../../constants/phoneNumberFormats';
import mapStateToProps from './redux';
import styles from './styles';

@connect(mapStateToProps)
class SettingsMenuCallerId extends Component {
  static propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
  }

  static defaultProps = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
  }

  render = () => {
    const { firstName, lastName, phoneNumber } = this.props;

    return (
      <View style={styles.container}>
        <KalleoText styles={styles.title} text="Your Caller ID" />
        <KalleoText styles={styles.callerIdName} text={`${firstName} ${lastName}`} />
        <KalleoText
          styles={styles.phoneNumber}
          text={getFormattedPhoneNumber({
            value: phoneNumber,
            format: phoneNumberFormats.NATIONAL,
          })}
        />
      </View>
    );
  }
}

export default SettingsMenuCallerId;

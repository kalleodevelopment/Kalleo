import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import KalleoText from '../KalleoText';
import DialerPhoneNumberActionButton from '../DialerPhoneNumberActionButton';
import { mapStateToProps, mapDispatchToProps } from './redux';
import styles from './styles';

const deleteIcon = require('../../images/close.png');
const addIcon = require('../../images/add.png');

@connect(mapStateToProps, mapDispatchToProps)
class DialerPhoneNumber extends Component {
  static propTypes = {
    removeLastDigitOnOutgoingCallPhoneNumber: PropTypes.func.isRequired,
    outgoingCallPhoneNumber: PropTypes.string,
  }

  static defaultProps = {
    outgoingCallPhoneNumber: '',
  }

  render() {
    const { outgoingCallPhoneNumber, removeLastDigitOnOutgoingCallPhoneNumber } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <DialerPhoneNumberActionButton
            isHidden
            icon={addIcon}
            onPress={() => console.log('Add Contact')}
          />
        </View>
        <View style={styles.phoneNumberContainer}>
          <KalleoText styles={styles.phoneNumber} text={outgoingCallPhoneNumber} />
        </View>
        <View style={styles.iconContainer}>
          <DialerPhoneNumberActionButton
            icon={deleteIcon}
            isHidden={!outgoingCallPhoneNumber}
            onPress={removeLastDigitOnOutgoingCallPhoneNumber}
          />
        </View>
      </View>

    );
  }
}

export default DialerPhoneNumber;

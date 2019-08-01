import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import KalleoHeader from '../KalleoHeader';
import DialerPhoneNumber from '../DialerPhoneNumber';
import DialerDigit from '../DialerDigit';
import ActionButton from '../ActionButton';
import placeOutgoingCall from '../../helpers/placeOutgoingCall';
import dialerDigits from '../../constants/dialerDigits';
import { mapStateToProps, mapDispatchToProps } from './redux';
import { createOutgoingCallMutation } from '../../graphql/mutations';
import styles from './styles';

@graphql(createOutgoingCallMutation)
@connect(mapStateToProps, mapDispatchToProps)
class DialerScreen extends Component {
  static propTypes = {
    addDigitToOutgoingCallPhoneNumber: PropTypes.func.isRequired,
    outgoingCallPhoneNumber: PropTypes.string,
  }

  static defaultProps = {
    outgoingCallPhoneNumber: '',
  }

  onPress = async () => (
    placeOutgoingCall({ phoneNumber: this.props.outgoingCallPhoneNumber, ...this.props })
  )

  render = () => {
    const { addDigitToOutgoingCallPhoneNumber, outgoingCallPhoneNumber } = this.props;

    return (
      <View style={styles.container}>
        <KalleoHeader />
        <View style={styles.dialerContainer}>
          <DialerPhoneNumber />
          <View style={styles.digitsContainer}>
            {dialerDigits.map(d => (
              <DialerDigit
                alphabet={d.alphabet}
                digit={d.digit}
                key={d.key}
                onPress={() => addDigitToOutgoingCallPhoneNumber(d.digit)}
              />
            ))}
          </View>
          <View style={styles.callButtonContainer}>
            <ActionButton
              isDisabled={!outgoingCallPhoneNumber}
              onPress={this.onPress}
              title="Call"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default DialerScreen;

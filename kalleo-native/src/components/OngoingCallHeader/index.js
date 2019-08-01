import React, { Component } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import formatChronometerDisplay from '../../helpers/formatChronometerDisplay';
import KalleoText from '../KalleoText';
import styles from './styles';

const kalleoOnGoingCallLogo = require('../../images/kalleo-logo-ongoingcall.png');

class OngoingCallHeader extends Component {
  static propTypes = {
    callerId: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    updateCallChronometer: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { updateCallChronometer } = this.props;

    this.timer = setInterval(updateCallChronometer, 1000);
  }

  componentWillUnmount() {
    const { updateCallChronometer } = this.props;

    clearInterval(this.timer);

    updateCallChronometer(0);
  }

  render() {
    const { callerId, time } = this.props;

    return (
      <View style={styles.container}>
        <Image source={kalleoOnGoingCallLogo} />
        <KalleoText
          styles={styles.subheader}
          text="kalleo Caller ID"
        />
        <KalleoText
          styles={styles.header}
          text={callerId}
        />
        <KalleoText
          styles={styles.chronometer}
          text={formatChronometerDisplay(time)}
        />
      </View>
    );
  }
}

export default OngoingCallHeader;

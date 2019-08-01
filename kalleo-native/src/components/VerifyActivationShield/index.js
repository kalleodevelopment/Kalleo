import React, { Component } from 'react';
import { Animated, Easing, View } from 'react-native';
import Config from 'react-native-config';
import KalleoText from '../KalleoText';
import containerStyles from '../../styles/container';
import { getFormattedPhoneNumber } from '../../helpers/phone-numbers';
import styles from './styles';

const verifyShieldImage = require('../../images/verify-color.png');

class VerifyActivationShield extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount = () => this.animate()

  animate = () => {
    this.animatedValue.setValue(0);

    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 2400,
      easing: Easing.bounce,
      delay: 350,
    }).start(() => this.animate());
  }

  render = () => {
    const inputRange = [0, 0.5, 1];

    const height = this.animatedValue.interpolate({
      inputRange,
      outputRange: [114, 131, 114],
    });

    const width = this.animatedValue.interpolate({
      inputRange,
      outputRange: [94, 108, 94],
    });

    const { VERIFICATION_PHONE_NUMBER } = Config;

    const formattedPhoneNumber = getFormattedPhoneNumber({
      value: VERIFICATION_PHONE_NUMBER,
      format: 'national',
    });
    return (
      <View style={[containerStyles.flexCenterColumn, styles.container]}>
        <KalleoText
          styles={styles.header}
          text="Verifying…"
        />
        <KalleoText
          styles={styles.subheader}
          text={`Decline the incoming call from ${formattedPhoneNumber} so that kalleo can verify call forwarding is configured correctly.`}
        />
        <View style={styles.shieldContainer}>
          <Animated.Image
            source={verifyShieldImage}
            style={{ width, height }}
          />
        </View>
      </View>
    );
  }
}

export default VerifyActivationShield;

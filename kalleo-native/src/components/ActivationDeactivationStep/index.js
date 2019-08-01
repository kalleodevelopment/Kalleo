import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import KalleoText from '../KalleoText';
import styles from './styles';

const ActivationDeactivationStep = ({ instructions, subscriberIsDeactivated, step }) => (
  <View style={styles.container}>
    <View style={subscriberIsDeactivated
      ? styles.activationStepContainer
      : styles.deactivationStepContainer}
    >
      <KalleoText styles={styles.step} text={`${step}`} />
    </View>
    <KalleoText
      numberOfLines={2}
      styles={styles.text}
      text={instructions}
    />
  </View>
);

ActivationDeactivationStep.propTypes = {
  instructions: PropTypes.string.isRequired,
  subscriberIsDeactivated: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
};

export default ActivationDeactivationStep;

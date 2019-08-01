import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ActivationDeactivationStep from '../ActivationDeactivationStep';
import { activationDeactivationSteps } from '../../constants';
import styles from './styles';

const ActivationDeactivationSteps = ({ subscriberIsDeactivated }) => {
  const steps = activationDeactivationSteps(subscriberIsDeactivated);

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <ActivationDeactivationStep
          key={step}
          instructions={step}
          subscriberIsDeactivated={subscriberIsDeactivated}
          step={index + 1}
        />
      ))}
    </View>
  );
};

ActivationDeactivationSteps.propTypes = {
  subscriberIsDeactivated: PropTypes.bool.isRequired,
};

export default ActivationDeactivationSteps;

import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KalleoText from '../KalleoText';
import mapStateToProps from './redux';
import styles from './styles';

const ValuePropsHeader = ({ currentStep, valueProps }) => (
  <View style={styles.container}>
    <KalleoText
      styles={styles.text}
      text={valueProps[currentStep].text}
    />
  </View>
);

ValuePropsHeader.propTypes = {
  currentStep: PropTypes.number.isRequired,
  valueProps: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(ValuePropsHeader);

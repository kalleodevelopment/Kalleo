import React from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapStateToProps from './redux';
import styles from './styles';

const ValuePropsVisual = ({ currentStep, valueProps }) => (
  <View style={styles.container}>
    <Image
      source={valueProps[currentStep].visual}
      style={styles.image}
    />
  </View>
);

ValuePropsVisual.propTypes = {
  currentStep: PropTypes.number.isRequired,
  valueProps: PropTypes.arrayOf(PropTypes.shape({
    visual: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(ValuePropsVisual);

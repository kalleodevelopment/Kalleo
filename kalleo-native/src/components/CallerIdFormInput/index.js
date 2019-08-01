import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import KalleoText from '../KalleoText';
import KalleoTextInput from '../KalleoTextInput';
import styles from './styles';

const CallerIdFormInput = ({ label, ...rest }) => (
  <View style={styles.container}>
    <KalleoText styles={styles.label} text={label} />
    <KalleoTextInput {...rest} styles={styles.input} />
  </View>
);

CallerIdFormInput.propTypes = {
  label: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  placeholder: PropTypes.string,
  returnKeyType: PropTypes.string,
};

CallerIdFormInput.defaultProps = {
  keyboardType: 'default',
  placeholder: '',
  returnKeyType: 'done',
};

export default CallerIdFormInput;

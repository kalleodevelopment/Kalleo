import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import defaultStyles from './styles';

const KalleoTextInput = ({
  autoCapitalize,
  keyboardType,
  maxLength,
  multiline,
  onChangeText,
  placeholder,
  returnKeyType,
  styles,
  value,
}) => (
  <TextInput
    multiline={multiline}
    autoCapitalize={autoCapitalize}
    keyboardType={keyboardType}
    maxLength={maxLength}
    onChangeText={onChangeText}
    placeholder={placeholder}
    returnKeyType={returnKeyType}
    style={[defaultStyles.input, styles]}
    underlineColorAndroid="transparent"
    value={value}
  />
);

KalleoTextInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  autoCapitalize: PropTypes.string,
  keyboardType: PropTypes.string,
  maxLength: PropTypes.number,
  multiline: PropTypes.bool,
  placeholder: PropTypes.string,
  styles: PropTypes.node,
  returnKeyType: PropTypes.string,
  value: PropTypes.string,
};

KalleoTextInput.defaultProps = {
  autoCapitalize: 'sentences',
  keyboardType: 'default',
  maxLength: null,
  multiline: false,
  placeholder: '',
  returnKeyType: 'done',
  styles: null,
  value: '',
};
export default KalleoTextInput;

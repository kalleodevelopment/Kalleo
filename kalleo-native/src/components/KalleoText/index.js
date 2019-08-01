import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import defaultStyles from './styles';

const KalleoText = ({ styles, text, ...props }) => (
  <Text
    {...props}
    style={[defaultStyles.text, styles]}
  >
    {text}
  </Text>
);

KalleoText.propTypes = {
  text: PropTypes.string,
  styles: PropTypes.node,
};

KalleoText.defaultProps = {
  styles: null,
  text: '',
};

export default KalleoText;
